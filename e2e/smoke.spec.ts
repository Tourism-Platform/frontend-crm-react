import { type ConsoleMessage, type Page, expect, test } from "@playwright/test";

import {
	AGENCY,
	type IMockUser,
	OPERATOR,
	clickSection,
	collectSections,
	isExternalResource,
	openSection,
	signIn
} from "./support";

const ERROR_FALLBACKS = ["Ошибка рендеринга", "Unexpected Application Error!"];

/**
 * Ожидаемые сообщения консоли: браузер логирует ответы 4xx моков
 * (например, 401 /auth/me до входа). 501 сюда не входит — это незамоканный эндпоинт
 */
const EXPECTED_CONSOLE = [
	/Failed to load resource: the server responded with a status of 4\d\d/
];

/**
 * Картинки из моков лежат на внешних хостах (picsum, unsplash…): их недоступность —
 * сеть машины, а не ошибка приложения. Сбои нашего API и dev-сервера остаются ошибками
 */
const isExternalResourceFailure = (message: ConsoleMessage) =>
	message.text().startsWith("Failed to load resource") &&
	isExternalResource(message.location().url);

const collectErrors = (page: Page) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
	page.on("console", (message) => {
		if (message.type() !== "error") return;
		if (isExternalResourceFailure(message)) return;
		const text = message.text();
		if (!EXPECTED_CONSOLE.some((pattern) => pattern.test(text))) {
			errors.push(`console: ${text} (${message.location().url})`);
		}
	});
	return errors;
};

const expectNoErrorFallback = async (page: Page) => {
	for (const text of ERROR_FALLBACKS) {
		await expect(page.getByText(text)).toBeHidden();
	}
};

const ROLES: Array<{ name: string; user: IMockUser }> = [
	{ name: "operator", user: OPERATOR },
	{ name: "agency", user: AGENCY }
];

for (const { name, user } of ROLES) {
	test.describe(`smoke of lazy routes — ${name}`, () => {
		test("every menu section opens without a blank screen or errors", async ({
			page
		}) => {
			// Обходит все разделы подряд: каждый ленивый чанк компилируется dev-сервером
			test.slow();
			const errors = collectErrors(page);
			await signIn(page, user);

			// collectSections сам проверяет, что каждое подменю раскрылось и дало пункты
			const sections = await collectSections(page);

			for (const section of sections) {
				await test.step(section.href, async () => {
					// Через меню, без перезагрузки: проверяется навигация внутри SPA
					await openSection(page, section);
					await expectNoErrorFallback(page);
				});
			}

			expect(errors).toEqual([]);
		});
	});
}

// Ошибка ленивой загрузки страницы ловится ErrorBoundary layout'а,
// а не стандартной страницей React Router
test("a failed lazy chunk shows the project fallback, not the router error page", async ({
	page
}) => {
	// С перехватом в context Playwright отключает HTTP-кеш — модули грузятся заново
	test.slow();
	await signIn(page, OPERATOR);
	// Через context: модули страницы идут через Service Worker MSW, page.route их не видит
	await page
		.context()
		.route("**/src/pages/finance/invoices-page/**", (route) =>
			route.abort()
		);

	const invoices = (await collectSections(page)).find(
		({ href }) => href === "/finance/invoices"
	);
	expect(invoices, "invoices section in the operator menu").toBeDefined();
	await clickSection(page, invoices!);

	await expect(page.getByText("Ошибка рендеринга")).toBeVisible();
	await expect(page.getByText("Unexpected Application Error!")).toBeHidden();
	await expect(page.getByRole("button", { name: /Обновить/ })).toBeVisible();
});

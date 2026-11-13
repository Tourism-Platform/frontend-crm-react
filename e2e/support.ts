import {
	type Locator,
	type Page,
	type Request,
	expect
} from "@playwright/test";

/** Фиктивные хосты из playwright.config.ts — настоящего бэкенда за ними нет */
export const MOCK_API = "http://api.test";
export const MOCK_DOCUMENT_API = "http://document.test";

/** Сколько ждать отрисовки раздела: холодный Vite компилирует ленивые чанки на лету */
const SECTION_TIMEOUT = 60_000;

export interface IMockUser {
	email: string;
	password: string;
	/** Куда ProtectedRoute уводит роль после входа */
	home: string;
}

/** Учётные данные мокового бэкенда: src/entities/auth/mock/auth.mock.ts */
export const OPERATOR: IMockUser = {
	email: "damirk355@gmail.com",
	password: "String1!",
	home: "/tours"
};

export const AGENCY: IMockUser = {
	email: "damirk366@gmail.com",
	password: "String1!",
	home: "/tours/catalog"
};

/** Ресурс не с dev-сервера и не с мокового API — например, картинка из моков */
export const isExternalResource = (url: string) => {
	if (!url) return false;
	const { hostname } = new URL(url);
	return ![
		"127.0.0.1",
		"localhost",
		new URL(MOCK_API).hostname,
		new URL(MOCK_DOCUMENT_API).hostname
	].includes(hostname);
};

/**
 * Сколько «своих» запросов должно не быть, чтобы считать страницу догруженной.
 * Между загрузкой модулей страницы и запросом её переводов React рендерит
 * (в dev — до ~0.5 с без запросов), поэтому окно больше этой паузы
 */
const IDLE_MS = 1_000;

const pendingRequests = new WeakMap<Page, Set<Request>>();

/**
 * Начинает учёт «своих» запросов страницы: модули dev-сервера, переводы,
 * моковый API. Внешние картинки из моков не учитываются — они могут висеть.
 * Вызывать до первой навигации
 */
export const trackPageRequests = (page: Page) => {
	const pending = new Set<Request>();
	pendingRequests.set(page, pending);
	page.on("request", (request) => {
		if (!isExternalResource(request.url())) pending.add(request);
	});
	page.on("requestfinished", (request) => pending.delete(request));
	page.on("requestfailed", (request) => pending.delete(request));
};

/**
 * Ждёт, пока страница догрузится: своих запросов нет IDLE_MS подряд.
 * Видимая шапка этого не гарантирует: переход идёт в startTransition, и пока новая
 * страница грузит модуль и переводы (Suspense), на экране остаётся старая страница
 * со своей шапкой — действие с меню попадёт в неё и потеряется при замене.
 * networkidle для переходов внутри SPA не работает
 */
export const waitForPageIdle = async (page: Page) => {
	const pending = pendingRequests.get(page);
	if (!pending) throw new Error("trackPageRequests(page) was not called");

	let quietSince = Date.now();
	await expect
		.poll(
			() => {
				if (pending.size > 0) quietSince = Date.now();
				return Date.now() - quietSince >= IDLE_MS;
			},
			{ timeout: SECTION_TIMEOUT, intervals: [100] }
		)
		.toBe(true);
};

/**
 * Поля — по плейсхолдерам: у CustomField подпись ссылается на formItemId,
 * а input получает свой id из конфига формы, поэтому getByLabel их не находит
 */
export const fillSignIn = async (page: Page, user: IMockUser) => {
	await page.getByPlaceholder("Enter email address").fill(user.email);
	await page.getByPlaceholder("Enter password").fill(user.password);
	await page.getByRole("button", { name: "Sign In" }).click();
};

export const signIn = async (page: Page, user: IMockUser) => {
	trackPageRequests(page);
	await page.goto("/login", { waitUntil: "domcontentloaded" });
	await fillSignIn(page, user);
	await expect(page).toHaveURL(user.home);
};

/** Верхнее меню роли (Radix NavigationMenu): десктопное, мобильное скрыто */
export const getMainNav = (page: Page): Locator =>
	page.getByRole("navigation", { name: "Main" });

export interface ISection {
	href: string;
	/** Индекс триггера подменю, в котором лежит ссылка; null — пункт верхнего уровня */
	trigger: number | null;
}

const getTriggers = (page: Page) =>
	getMainNav(page).locator("button[aria-expanded]");

/**
 * Подменю открываем наведением — так же, как пользователь: Radix NavigationMenu
 * открывает его по hover (клик по триггеру после наведения закрыл бы его).
 * Повторяется только раскрытие: пока новая страница догружается (переход идёт
 * в startTransition), на экране ещё старая шапка, и затем она заменяется вместе
 * с открытым подменю. Клик по ссылке дальше — обычный, с проверками Playwright
 */
const openSubmenu = async (page: Page, index: number) => {
	await expect(async () => {
		const trigger = getTriggers(page).nth(index);
		// Новый вход указателя: под неподвижным курсором Radix подменю не откроет
		await page.mouse.move(0, 0);
		await trigger.hover({ timeout: 2_000 });
		await expect(trigger).toHaveAttribute("aria-expanded", "true", {
			timeout: 2_000
		});
	}).toPass({ timeout: 15_000 });
};

const readLinks = (page: Page) =>
	getMainNav(page)
		.locator('a[href^="/"]')
		.evaluateAll((links) =>
			links.map((link) => link.getAttribute("href") ?? "")
		);

/**
 * Разделы верхнего меню. Подменю рендерятся только открытыми, поэтому
 * раскрываем каждый триггер по очереди и запоминаем, где лежит ссылка
 * (наведение на следующий триггер закрывает предыдущее подменю)
 */
export const collectSections = async (page: Page): Promise<ISection[]> => {
	// URL меняется раньше, чем ленивая страница с шапкой загрузится
	await expect(getMainNav(page)).toBeVisible({ timeout: SECTION_TIMEOUT });
	await waitForPageIdle(page);

	const topLevel = await readLinks(page);
	const sections = new Map<string, number | null>(
		topLevel.map((href) => [href, null])
	);

	const triggersCount = await getTriggers(page).count();
	for (let index = 0; index < triggersCount; index++) {
		await openSubmenu(page, index);
		const links = await readLinks(page);
		// Подменю раскрылось и добавило ссылки к верхнему уровню — иначе обход
		// молча свёлся бы к пунктам верхнего уровня
		expect(links.length, `submenu #${index} has links`).toBeGreaterThan(
			topLevel.length
		);
		for (const href of links) {
			if (!sections.has(href)) sections.set(href, index);
		}
	}

	return [...sections]
		.filter(([href]) => href)
		.map(([href, trigger]) => ({ href, trigger }));
};

/**
 * Клик по пункту меню (при необходимости — через подменю) обычным click:
 * Playwright проверяет, что ссылка видима и ничем не перекрыта, а Link
 * выполняет навигацию внутри SPA
 */
export const clickSection = async (page: Page, { href, trigger }: ISection) => {
	if (trigger !== null) await openSubmenu(page, trigger);
	await getMainNav(page).locator(`a[href="${href}"]`).first().click();
};

/**
 * Переход в раздел без перезагрузки страницы. Шапка с меню — часть ленивой
 * страницы: пока чанк не загружен, на экране SuspenseLoader
 */
export const openSection = async (page: Page, section: ISection) => {
	await clickSection(page, section);
	await expect(page).toHaveURL((url) => url.pathname === section.href);
	await expect(getMainNav(page)).toBeVisible({ timeout: SECTION_TIMEOUT });
	await waitForPageIdle(page);
};

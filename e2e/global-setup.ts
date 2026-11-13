import { type FullConfig, type Page, chromium } from "@playwright/test";

import {
	AGENCY,
	type IMockUser,
	OPERATOR,
	collectSections,
	fillSignIn,
	getMainNav,
	trackPageRequests
} from "./support";

/** Повторов прохода, если Vite всё ещё находит новые зависимости */
const MAX_WARM_UP_PASSES = 3;

/**
 * Один проход по приложению ролью: вход и все разделы меню. Возвращает true,
 * если Vite за проход не перезагружал страницу — зависимости уже оптимизированы
 */
const warmUpPass = async (page: Page, user: IMockUser) => {
	let viteConnections = 0;
	let ownLoads = 0;
	const onConsole = (message: { text: () => string }) => {
		if (message.text().includes("[vite] connected")) viteConnections += 1;
	};
	page.on("console", onConsole);
	// collectSections ждёт, пока страница догрузится, — учёт запросов с первой навигации
	trackPageRequests(page);
	try {
		ownLoads += 1;
		await page.goto("/login", {
			waitUntil: "domcontentloaded",
			timeout: 300_000
		});
		await page
			.getByRole("button", { name: "Sign In" })
			.waitFor({ timeout: 300_000 });
		await fillSignIn(page, user);
		await page.waitForURL(user.home, { timeout: 300_000 });
		// URL меняется раньше, чем холодный Vite скомпилирует layout с меню
		await getMainNav(page).waitFor({ timeout: 300_000 });

		// Каждый ленивый раздел: его модули и зависимости попадают в кеш Vite
		for (const { href } of await collectSections(page)) {
			ownLoads += 1;
			// Без ожидания картинок: картинки из моков лежат на внешних хостах
			await page.goto(href, {
				waitUntil: "domcontentloaded",
				timeout: 300_000
			});
			await getMainNav(page).waitFor({ timeout: 300_000 });
		}
	} finally {
		page.off("console", onConsole);
	}
	// Каждая своя загрузка даёт одно подключение клиента Vite; лишние — его перезагрузки
	return viteConnections <= ownLoads;
};

/**
 * Холодный Vite-сервер (в CI — всегда) трансформирует модули и оптимизирует
 * зависимости по мере первых заходов. Найдя новую зависимость, Vite
 * перезагружает все открытые страницы — в том числе страницы идущих тестов.
 * Поэтому до тестов проходим приложение обеими ролями, пока проход не станет «тихим»
 */
const globalSetup = async (config: FullConfig) => {
	const { baseURL, locale } = config.projects[0]?.use ?? {};
	if (!baseURL) throw new Error("baseURL is not configured");

	const browser = await chromium.launch();
	try {
		for (let pass = 1; pass <= MAX_WARM_UP_PASSES; pass++) {
			let isStable = true;
			for (const user of [OPERATOR, AGENCY]) {
				// Новый контекст: без сессии с прошлого прохода
				const context = await browser.newContext({ baseURL, locale });
				isStable =
					(await warmUpPass(await context.newPage(), user)) &&
					isStable;
				await context.close();
			}
			if (isStable) return;
		}
		throw new Error(
			`Vite kept re-optimizing dependencies after ${MAX_WARM_UP_PASSES} warm-up passes`
		);
	} finally {
		await browser.close();
	}
};

export default globalSetup;

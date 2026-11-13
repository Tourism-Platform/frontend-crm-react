import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/** Тесты чистой логики могут идти в `@vitest-environment node` — без DOM */
const hasDom = typeof window !== "undefined";

/** i18n без HttpBackend и детектора языка — переводы из public/locales/en */
vi.mock("@/shared/config/i18n/i18n.init", async () => ({
	default: (await import("./i18n")).testI18n
}));

/** jsdom не реализует matchMedia (нужен sonner): ни один медиазапрос не совпадает */
if (hasDom) {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: (query: string): MediaQueryList => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: () => {},
			removeEventListener: () => {},
			addListener: () => {},
			removeListener: () => {},
			dispatchEvent: () => false
		})
	});
}

/** jsdom не реализует ResizeObserver (нужен Radix: Checkbox, ScrollArea) */
if (hasDom && typeof window.ResizeObserver === "undefined") {
	window.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
}

/** jsdom не реализует IntersectionObserver (нужен вкладкам и спискам SmartTable) */
if (hasDom && typeof window.IntersectionObserver === "undefined") {
	window.IntersectionObserver = class implements IntersectionObserver {
		readonly root = null;
		readonly rootMargin = "";
		readonly scrollMargin = "";
		readonly thresholds = [];
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords() {
			return [];
		}
	};
}

/**
 * MSW здесь не поднимается: граф моков тяжёлый, файл подключает его сам
 * через setupMswServer (см. app/mws/setup-msw-server.ts)
 */
afterEach(() => {
	if (!hasDom) return;

	cleanup();
	localStorage.clear();
	// ThemeProvider вешает класс темы на <html> — тема не переходит в следующий тест
	document.documentElement.classList.remove("light", "dark");
});

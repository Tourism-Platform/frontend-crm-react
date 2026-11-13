import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/shared/config/i18n/i18n.init";
import { getRootErrorHandlers } from "@/shared/lib";
// Должен выполниться до импорта @/app: роутер создаётся при импорте App и оборачивается
// адаптером, выбранным здесь. Порядок держит importOrder в .prettierrc (@/shared раньше @/app);
// если импорт App окажется выше — трейсинг навигации тихо пропадёт, без ошибки
import "@/shared/lib/monitoring/monitoring.init";
import "@/shared/styles/global.css";

import { initMsw } from "@/app/mws/init";

import App from "@/app";

/**
 * После деплоя старые чанки удаляются: открытая со старой версией вкладка не
 * может загрузить ленивую страницу. Перезагружаем её на новую версию — но не
 * чаще раза в 10 секунд, иначе при реально битом чанке будет бесконечный цикл
 */
const RELOAD_KEY = "chunk-reload-at";
window.addEventListener("vite:preloadError", (event) => {
	try {
		const last = Number(sessionStorage.getItem(RELOAD_KEY));
		if (Date.now() - last < 10_000) return;
		sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
	} catch {
		return;
	}
	event.preventDefault();
	window.location.reload();
});

const container = document.getElementById("root");

if (container) {
	const root = createRoot(container, getRootErrorHandlers());

	initMsw().then(() => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		);
	});
}

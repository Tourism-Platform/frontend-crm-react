import { ENV } from "@/shared/config";

/** Только dev-сервер: в production-сборке условие и моки вырезаются целиком */
export const initMsw = async () => {
	if (import.meta.env.DEV && ENV.VITE_ENABLE_MSW === "true") {
		console.log("MSW enabled");
		const { worker } = await import("@/app/mws/browser");
		await worker.start({
			// Незамоканные запросы к API ловит catch-all (501) — сюда попадают только сторонние
			onUnhandledRequest: "bypass"
		});
	}
};

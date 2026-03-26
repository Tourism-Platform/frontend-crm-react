import { ENV } from "@/shared/config";

export const initMsw = async () => {
	if (ENV.VITE_APP_ENV === "dev" && ENV.VITE_ENABLE_MSW === "true") {
		const { worker } = await import("@/shared/api/msw/browser");
		return worker.start({
			onUnhandledRequest: "bypass"
		});
	}
	return Promise.resolve();
};

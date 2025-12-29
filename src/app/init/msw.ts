export const initMsw = async () => {
	if (import.meta.env.DEV) {
		const { worker } = await import("@/shared/api/msw/browser");
		return worker.start({
			onUnhandledRequest: "bypass"
		});
	}
	return Promise.resolve();
};

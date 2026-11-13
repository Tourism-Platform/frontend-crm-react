import { HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import { AUTH_PATHS, createMockHandler } from "@/shared/api";
import { monitoring } from "@/shared/lib";

import { AuthService } from "@/entities/auth";

import { setupMswServer } from "@/app/mws/setup-msw-server";

import { setupStore } from "./store";

const server = setupMswServer();

/** Запрос аккаунта через настоящий store: middleware видит реальный rejected-экшен */
const requestAccount = async (response: () => Response) => {
	server.use(createMockHandler(AUTH_PATHS.getMyAccount, response));
	const captureError = vi.spyOn(monitoring, "captureError");
	const store = setupStore();

	await store.dispatch(AuthService.endpoints.getAuthAccount.initiate());

	return captureError;
};

describe("apiErrorMonitoringMiddleware", () => {
	it("reports a 5xx with endpoint tags and a stable fingerprint", async () => {
		const captureError = await requestAccount(() =>
			HttpResponse.json({ detail: "db is down" }, { status: 500 })
		);

		expect(captureError).toHaveBeenCalledTimes(1);
		const [error, context] = captureError.mock.calls[0]!;
		expect(error).toEqual(new Error("API 500: getAuthAccount"));
		expect(context).toEqual({
			tags: { endpoint: "getAuthAccount", status: "500" },
			extra: { detail: "db is down" },
			fingerprint: ["api", "getAuthAccount", "500"]
		});
	});

	it("reports a network failure as FETCH_ERROR", async () => {
		const captureError = await requestAccount(() => HttpResponse.error());

		expect(captureError).toHaveBeenCalledWith(
			new Error("API FETCH_ERROR: getAuthAccount"),
			expect.objectContaining({
				tags: { endpoint: "getAuthAccount", status: "FETCH_ERROR" }
			})
		);
	});

	it.each([400, 401, 403, 404, 422])(
		"does not report business error %i",
		async (status) => {
			const captureError = await requestAccount(() =>
				HttpResponse.json({ detail: "nope" }, { status })
			);

			expect(captureError).not.toHaveBeenCalled();
		}
	);

	it("does not report a network failure while the user is offline", async () => {
		vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);

		const captureError = await requestAccount(() => HttpResponse.error());

		expect(captureError).not.toHaveBeenCalled();
	});

	it("does not report a non-JSON body on a 4xx (nginx page on 413)", async () => {
		const captureError = await requestAccount(() =>
			HttpResponse.html("<html>Request Entity Too Large</html>", {
				status: 413
			})
		);

		expect(captureError).not.toHaveBeenCalled();
	});

	it.each([
		["a 5xx HTML page", 502],
		["broken JSON on a success status", 200]
	])("reports PARSING_ERROR for %s", async (_, status) => {
		const captureError = await requestAccount(() =>
			HttpResponse.html("<html>not json</html>", { status })
		);

		expect(captureError).toHaveBeenCalledWith(
			new Error("API PARSING_ERROR: getAuthAccount"),
			expect.objectContaining({
				tags: { endpoint: "getAuthAccount", status: "PARSING_ERROR" }
			})
		);
	});
});

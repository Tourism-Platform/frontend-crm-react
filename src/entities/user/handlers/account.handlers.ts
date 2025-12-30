import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { ACCOUNT_MOCK } from "../mock";
import type { IAccountBackend, IChangePasswordBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const accountHandlers = [
	http.get(`${BASE_URL}/user/account`, async () => {
		await delay(500);
		return HttpResponse.json(ACCOUNT_MOCK, { status: 200 });
	}),

	http.patch(`${BASE_URL}/user/account`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<IAccountBackend>;
		return HttpResponse.json({ ...ACCOUNT_MOCK, ...body }, { status: 200 });
	}),
	http.post(`${BASE_URL}/user/change-password`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<IChangePasswordBackend>;
		if (body.current_password !== "client") {
			return HttpResponse.json(
				{ message: "Current password is incorrect" },
				{ status: 400 }
			);
		}
		return HttpResponse.json(
			{ message: "Password changed successfully" },
			{ status: 200 }
		);
	})
];

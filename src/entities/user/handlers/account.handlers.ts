import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { mockUser } from "../mock";
import type { IAccountBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const accountHandlers = [
	http.get(`${BASE_URL}/user/account`, async () => {
		await delay(800);
		return HttpResponse.json(mockUser, { status: 200 });
	}),

	http.patch(`${BASE_URL}/user/account`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<IAccountBackend>;
		return HttpResponse.json({ ...mockUser, ...body }, { status: 200 });
	})
];

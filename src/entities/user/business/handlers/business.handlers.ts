import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { BUSINESS_MOCK } from "../mock";
import type { IBusinessInfoBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const businessHandlers = [
	http.get(`${BASE_URL}/user/business-info`, async () => {
		await delay(500);
		return HttpResponse.json(BUSINESS_MOCK, { status: 200 });
	}),
	http.patch(`${BASE_URL}/user/business-info`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as Partial<IBusinessInfoBackend>;
		return HttpResponse.json(
			{ ...BUSINESS_MOCK, ...body },
			{ status: 200 }
		);
	})
];

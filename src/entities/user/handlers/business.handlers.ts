import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { mockBusiness } from "../mock";
import type { IBusinessInfoBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const businessHandlers = [
	http.get(`${BASE_URL}/user/business-info`, async () => {
		await delay(800);
		return HttpResponse.json(mockBusiness, { status: 200 });
	}),
	http.patch(`${BASE_URL}/user/business-info`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<IBusinessInfoBackend>;
		return HttpResponse.json({ ...mockBusiness, ...body }, { status: 200 });
	})
];

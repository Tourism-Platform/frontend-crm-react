import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { AGENCY_BUSINESS_MOCK } from "../mock";
import type { IAgencyBusinessInfoBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const agencyBusinessHandlers = [
	http.get(`${BASE_URL}/user/business-info`, async () => {
		await delay(500);
		return HttpResponse.json(AGENCY_BUSINESS_MOCK, { status: 200 });
	}),
	http.patch(`${BASE_URL}/user/business-info`, async ({ request }) => {
		await delay(500);
		const body =
			(await request.json()) as Partial<IAgencyBusinessInfoBackend>;
		return HttpResponse.json(
			{ ...AGENCY_BUSINESS_MOCK, ...body },
			{ status: 200 }
		);
	})
];

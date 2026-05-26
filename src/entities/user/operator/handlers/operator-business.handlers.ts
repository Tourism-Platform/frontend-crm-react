import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { OPERATOR_BUSINESS_MOCK } from "../mock";
import type { IOperatorBusinessInfoBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const operatorBusinessHandlers = [
	http.get(`${BASE_URL}/user/business-info`, async () => {
		await delay(500);
		return HttpResponse.json(OPERATOR_BUSINESS_MOCK, { status: 200 });
	}),
	http.patch(`${BASE_URL}/user/business-info`, async ({ request }) => {
		await delay(500);
		const body =
			(await request.json()) as Partial<IOperatorBusinessInfoBackend>;
		return HttpResponse.json(
			{ ...OPERATOR_BUSINESS_MOCK, ...body },
			{ status: 200 }
		);
	})
];

import { HttpResponse, delay, http } from "msw";

import { AGENCY_PATHS, createMockHandler } from "@/shared/api";
import { ENV } from "@/shared/config";

import { MOCK_AGENCY_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";
import { AGENCY_BUSINESS_MOCK } from "../mock/agency-business.mock";

const BASE_URL = ENV.VITE_API_URL || "";

export const agencyHandlers = [
	http.post(
		`${BASE_URL}${AGENCY_PATHS.createAgency.url}`,
		async ({ request }) => {
			await delay(500);
			const body = (await request.json()) as { name: string };
			return HttpResponse.json(
				{
					id: crypto.randomUUID(),
					name: body.name
				},
				{ status: 201 }
			);
		}
	),
	createMockHandler(
		{
			url: "/agency/:agencyId/info",
			method: "GET"
		},
		async ({ params }) => {
			if (String(params.agencyId) !== MOCK_AGENCY_ID) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(AGENCY_BUSINESS_MOCK);
		}
	)
];

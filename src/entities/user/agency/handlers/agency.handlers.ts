import { HttpResponse, delay, http } from "msw";

import { AGENCY_PATHS, createMockHandler } from "@/shared/api";
import { ENV } from "@/shared/config";

import { MOCK_AGENCY_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";

import { AGENCY_BUSINESS_MOCK } from "../mock/agency-business.mock";
import { AGENCY_LIST_MOCK } from "../mock/agency-list.mock";

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
	http.get(
		`${BASE_URL}${AGENCY_PATHS.listAgencies.url}`,
		async ({ request }) => {
			await delay(300);
			const url = new URL(request.url);
			const q = (url.searchParams.get("q") || "").trim().toLowerCase();
			const skip = Number(url.searchParams.get("skip") || 0);
			const limit = Number(url.searchParams.get("limit") || 20);

			const filtered = q
				? AGENCY_LIST_MOCK.filter((item) => {
						const haystack = [
							item.name,
							item.business_name,
							item.legal_name,
							item.city,
							item.country
						]
							.filter(Boolean)
							.join(" ")
							.toLowerCase();
						return haystack.includes(q);
					})
				: AGENCY_LIST_MOCK;

			return HttpResponse.json({
				total_count: filtered.length,
				data: filtered.slice(skip, skip + limit)
			});
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

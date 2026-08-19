import { HttpResponse } from "msw";

import { OPERATOR_AGENCIES_PATHS, createMockHandler } from "@/shared/api";

import { MOCK_AGENCY_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";
import { AGENCY_BUSINESS_MOCK } from "@/entities/user/agency/mock/agency-business.mock";

import { OPERATOR_AGENCY_LIST_MOCK } from "../mock/operator-agencies.mock";

const paginate = (url: URL) => {
	const q = url.searchParams.get("q")?.toLowerCase() ?? "";
	const skip = Number(url.searchParams.get("skip")) || 0;
	const limit = Number(url.searchParams.get("limit")) || 20;

	const filtered = q
		? OPERATOR_AGENCY_LIST_MOCK.filter(
				(item) =>
					item.name.toLowerCase().includes(q) ||
					(item.business_name ?? "").toLowerCase().includes(q)
			)
		: OPERATOR_AGENCY_LIST_MOCK;

	return {
		total_count: filtered.length,
		data: filtered.slice(skip, skip + limit)
	};
};

export const operatorAgenciesHandlers = [
	createMockHandler(
		OPERATOR_AGENCIES_PATHS.listAgencies,
		async ({ request }) => HttpResponse.json(paginate(new URL(request.url)))
	),
	createMockHandler(OPERATOR_AGENCIES_PATHS.listPartneredAgencies, async () =>
		HttpResponse.json({ total_count: 0, data: [] })
	),
	createMockHandler(
		{
			url: "/operator/agencies/:agencyId/info",
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

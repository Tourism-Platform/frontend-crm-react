import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { RECONCILIATIONS_MOCK, RECONCILIATION_DETAILS_MAP } from "../mock";
import { ENUM_RECONCILIATION_STATUS } from "../types";
import type {
	IReconciliationPaginatedResponseBackend,
	TReconciliationStatusCounts
} from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const financeReconciliationHandler = [
	http.get(
		`${BASE_URL}/finance/reconciliations`,
		async ({
			request
		}): Promise<HttpResponse<IReconciliationPaginatedResponseBackend>> => {
			await delay(500);
			const url = new URL(request.url);
			const page = Number(url.searchParams.get("page")) || 1;
			const limit = Number(url.searchParams.get("limit")) || 10;
			const search = url.searchParams.get("search");
			const status = url.searchParams
				.get("status")
				?.split(",")
				.filter(Boolean);

			const statusCounts = RECONCILIATIONS_MOCK.reduce(
				(acc: Record<string, number>, current) => {
					acc[current.status] = (acc[current.status] || 0) + 1;
					return acc;
				},
				Object.values(ENUM_RECONCILIATION_STATUS).reduce(
					(acc: Record<string, number>, status) => {
						acc[status] = 0;
						return acc;
					},
					{} as Record<string, number>
				)
			) as TReconciliationStatusCounts;

			let filteredReconciliations = [...RECONCILIATIONS_MOCK];

			if (search) {
				const query = search.toLowerCase();
				filteredReconciliations = filteredReconciliations.filter(
					(r) =>
						r.id.toLowerCase().includes(query) ||
						r.order_id.toLowerCase().includes(query) ||
						r.client.toLowerCase().includes(query)
				);
			}

			if (status && status.length > 0) {
				filteredReconciliations = filteredReconciliations.filter(
					(r) => status && status.includes(r.status)
				);
			}

			const start = (page - 1) * limit;
			const end = start + limit;
			const pagedData = filteredReconciliations.slice(start, end);

			return HttpResponse.json(
				{
					data: pagedData,
					total: filteredReconciliations.length,
					status_counts: statusCounts
				},
				{ status: 200 }
			);
		}
	),

	http.get(`${BASE_URL}/finance/reconciliations/:id`, async ({ params }) => {
		await delay(500);
		const { id } = params;
		const reconciliation = RECONCILIATION_DETAILS_MAP[id as string];

		if (reconciliation) {
			return HttpResponse.json(reconciliation, { status: 200 });
		}

		return new HttpResponse(null, { status: 404 });
	})
];

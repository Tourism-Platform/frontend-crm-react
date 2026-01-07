import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { TOUR_ORDERS_MOCK_DATA } from "../mock";

const BASE_URL = ENV.VITE_API_URL || "";

export const tourOrderHandlers = [
	http.get(`${BASE_URL}/tours/orders`, async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const tourId = url.searchParams.get("tour_id");
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 10;
		const search = url.searchParams.get("search");
		const status = url.searchParams.get("status")?.split(",");

		if (!tourId) {
			return HttpResponse.json({ data: [], total: 0 }, { status: 200 });
		}

		let filteredOrders = TOUR_ORDERS_MOCK_DATA;

		if (status && status.length > 0) {
			filteredOrders = filteredOrders.filter((order) =>
				status.includes(order.status)
			);
		}

		if (search) {
			const query = search.toLowerCase();
			filteredOrders = filteredOrders.filter(
				(order) =>
					order.order_id.toLowerCase().includes(query) ||
					order.client.toLowerCase().includes(query)
			);
		}

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = filteredOrders.slice(start, end);

		return HttpResponse.json(
			{
				data: pagedData,
				total: filteredOrders.length
			},
			{ status: 200 }
		);
	})
];

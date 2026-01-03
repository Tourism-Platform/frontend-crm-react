import { HttpResponse, http } from "msw";

import { ENV } from "@/shared/config";

import { mapBookingOrderToBackend } from "../converters";
import { BOOKING_ORDERS_MOCK } from "../mock";

export const bookingOrderHandlers = [
	http.get(`${ENV.VITE_API_URL}/booking/orders`, ({ request }) => {
		const url = new URL(request.url);
		const status = url.searchParams.get("status");
		const search = url.searchParams.get("search");

		let filteredOrders = [...BOOKING_ORDERS_MOCK];

		if (status) {
			const statuses = status.split(",");
			filteredOrders = filteredOrders.filter((order) =>
				statuses.includes(order.status)
			);
		}

		if (search) {
			filteredOrders = filteredOrders.filter(
				(order) =>
					order.orderId
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					order.client.toLowerCase().includes(search.toLowerCase()) ||
					order.tourName.toLowerCase().includes(search.toLowerCase())
			);
		}

		return HttpResponse.json({
			data: filteredOrders.map(mapBookingOrderToBackend),
			total: filteredOrders.length
		});
	})
];

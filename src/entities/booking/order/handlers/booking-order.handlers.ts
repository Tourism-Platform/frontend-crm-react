import { HttpResponse, http } from "msw";

import { ENV } from "@/shared/config";

import { mapBookingOrderToBackend } from "../converters";
import { BOOKING_ORDERS_MOCK } from "../mock";
import {
	type IApplyReviewItemBackend,
	type IBookingOrderBackend,
	type ITourReviewItem
} from "../types";

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
			data: filteredOrders.map((order) => {
				const full = mapBookingOrderToBackend(order);
				const brief: IBookingOrderBackend = {
					order_id: full.order_id!,
					order_type: full.order_type!,
					date_created: full.date_created!,
					client: full.client!,
					client_type: full.client_type!,
					pax: full.pax!,
					dates: full.dates!,
					tour_name: full.tour_name!,
					manager: full.manager!,
					invoice_status: full.invoice_status!,
					status: full.status!
				};
				return brief;
			}),
			total: filteredOrders.length
		});
	}),

	http.get(`${ENV.VITE_API_URL}/booking/orders/:id`, ({ params }) => {
		const { id } = params;
		const order = BOOKING_ORDERS_MOCK.find((o) => o.orderId === id);

		if (!order) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json(mapBookingOrderToBackend(order));
	}),

	http.post(
		`${ENV.VITE_API_URL}/booking/orders/apply-review`,
		async ({ request }) => {
			const { id, parent_id: parentId } =
				(await request.json()) as IApplyReviewItemBackend;

			BOOKING_ORDERS_MOCK.forEach((order) => {
				const findAndApply = (items: ITourReviewItem[]): boolean => {
					for (const item of items) {
						// Если есть parentId и мы нашли этого родителя
						if (parentId && item.id === parentId) {
							if (item.subRows) {
								item.subRows.forEach((child) => {
									child.isApplied = child.id === id;
								});
								return true;
							}
						}

						// Если parentId нет (или это корневой элемент) и мы нашли нужный id
						if (!parentId && item.id === id) {
							item.isApplied = true;
							return true;
						}

						// Рекурсивный поиск
						if (item.subRows && findAndApply(item.subRows)) {
							return true;
						}
					}
					return false;
				};

				if (order.tourReview) {
					findAndApply(order.tourReview);
				}
			});

			return HttpResponse.json({ success: true });
		}
	)
];

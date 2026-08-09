import { HttpResponse } from "msw";

import { BOOKING_ORDER_OPERATOR_PATHS } from "@/shared/api/generated/paths/booking-order-operator.paths";
import { BOOKING_RECONCILIATION_PATHS } from "@/shared/api/generated/paths/booking-reconciliation.paths";
import { createMockHandler } from "@/shared/api/msw/utils";

import {
	getReconciliationFinancials,
	getReconciliationVariance,
	listReconciliationsFromUrl
} from "../mock";

export const financeReconciliationHandler = [
	createMockHandler(
		BOOKING_RECONCILIATION_PATHS.listBookingReconciliation,
		async ({ request }) =>
			HttpResponse.json(listReconciliationsFromUrl(new URL(request.url)))
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderFinancials(":bookingId"),
		async ({ params }) => {
			const financials = getReconciliationFinancials(
				String(params.bookingId)
			);

			if (!financials) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(financials);
		}
	),

	createMockHandler(
		BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderVariance(":bookingId"),
		async ({ params }) => {
			const variance = getReconciliationVariance(
				String(params.bookingId)
			);

			if (!variance) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(variance);
		}
	)
];

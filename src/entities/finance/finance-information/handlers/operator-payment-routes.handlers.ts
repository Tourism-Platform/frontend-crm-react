import { HttpResponse } from "msw";

import {
	Currency,
	OPERATOR_PAYMENT_ROUTES_PATHS,
	type PaymentRouteCreate,
	type PaymentRouteUpdate,
	createMockHandler
} from "@/shared/api";

import {
	MOCK_OPERATOR_ID,
	createPaymentRouteInStore,
	deletePaymentRouteFromStore,
	findPaymentRouteInStore,
	listPaymentRoutesFromStore,
	updatePaymentRouteInStore
} from "../mock";
import type { TOperatorPaymentRouteBackend } from "../types";

const createRouteFromBody = (
	body: PaymentRouteCreate
): TOperatorPaymentRouteBackend => ({
	id: crypto.randomUUID(),
	operator_id: MOCK_OPERATOR_ID,
	internal_label: body.internal_label,
	currency: body.currency ?? Currency.USD,
	note: body.note ?? null,
	details: body.details
});

export const operatorPaymentRoutesHandlers = [
	createMockHandler(OPERATOR_PAYMENT_ROUTES_PATHS.listPaymentRoutes, () =>
		HttpResponse.json(listPaymentRoutesFromStore())
	),
	createMockHandler(
		OPERATOR_PAYMENT_ROUTES_PATHS.createPaymentRoute,
		({ body }) => {
			const created = createPaymentRouteInStore(
				createRouteFromBody(body as PaymentRouteCreate)
			);
			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		{
			url: "/operator/payment-routes/:routeId",
			method: "PATCH"
		},
		({ params, body }) => {
			const patch = body as PaymentRouteUpdate;
			const routeId = String(params.routeId);
			const existing = findPaymentRouteInStore(routeId);

			if (!existing) {
				return new HttpResponse(null, { status: 404 });
			}

			const updated = updatePaymentRouteInStore(routeId, {
				internal_label: patch.internal_label ?? existing.internal_label,
				currency: patch.currency ?? existing.currency,
				note: patch.note !== undefined ? patch.note : existing.note,
				details: patch.details ?? existing.details
			});

			return HttpResponse.json(updated);
		}
	),
	createMockHandler(
		{
			url: "/operator/payment-routes/:routeId",
			method: "DELETE"
		},
		({ params }) => {
			const deleted = deletePaymentRouteFromStore(String(params.routeId));

			if (!deleted) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(null, { status: 204 });
		}
	)
];

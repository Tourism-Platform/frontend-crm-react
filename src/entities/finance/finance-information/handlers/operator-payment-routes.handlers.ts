import { HttpResponse } from "msw";

import { OPERATOR_PAYMENT_ROUTES_PATHS, createMockHandler } from "@/shared/api";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import {
	MOCK_OPERATOR_ID,
	createPaymentRouteInStore,
	deletePaymentRouteFromStore,
	findPaymentRouteInStore,
	listPaymentRoutesFromStore,
	updatePaymentRouteInStore
} from "../mock";
import type {
	TOperatorPaymentRouteBackend,
	TOperatorPaymentRouteCreateBackend,
	TOperatorPaymentRouteUpdateBackend
} from "../types";

const createRouteFromBody = (
	body: TOperatorPaymentRouteCreateBackend
): TOperatorPaymentRouteBackend => ({
	id: crypto.randomUUID(),
	operator_id: MOCK_OPERATOR_ID,
	internal_label: body.internal_label,
	currency: body.currency ?? ENUM_CURRENCY_BACKEND.USD,
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
				createRouteFromBody(body as TOperatorPaymentRouteCreateBackend)
			);
			return HttpResponse.json(created, { status: 201 });
		}
	),
	createMockHandler(
		OPERATOR_PAYMENT_ROUTES_PATHS.getPaymentRoute(":routeId"),
		({ params }) => {
			const route = findPaymentRouteInStore(String(params.routeId));

			if (!route) {
				return new HttpResponse(null, { status: 404 });
			}

			return HttpResponse.json(route);
		}
	),
	createMockHandler(
		OPERATOR_PAYMENT_ROUTES_PATHS.updatePaymentRoute(":routeId"),
		({ params, body }) => {
			const patch = body as TOperatorPaymentRouteUpdateBackend;
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
		OPERATOR_PAYMENT_ROUTES_PATHS.deletePaymentRoute(":routeId"),
		({ params }) => {
			const deleted = deletePaymentRouteFromStore(String(params.routeId));

			if (!deleted) {
				return new HttpResponse(null, { status: 404 });
			}

			return new HttpResponse(null, { status: 204 });
		}
	)
];

import type {
	OperatorPaymentRouteModel,
	PaymentRouteCreate,
	PaymentRouteUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_PAYMENT_ROUTES_PATHS = {
	listPaymentRoutes: {
		url: "/operator/payment-routes",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number };
			response: OperatorPaymentRouteModel[];
		}
	} as const,
	createPaymentRoute: {
		url: "/operator/payment-routes",
		method: "POST",
		_types: {} as {
			body: PaymentRouteCreate;
			query: void;
			response: OperatorPaymentRouteModel;
		}
	} as const,
	getPaymentRoute: (routeId: string) =>
		({
			url: `/operator/payment-routes/${routeId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorPaymentRouteModel;
			}
		}) as const,
	updatePaymentRoute: (routeId: string) =>
		({
			url: `/operator/payment-routes/${routeId}`,
			method: "PATCH",
			_types: {} as {
				body: PaymentRouteUpdate;
				query: void;
				response: OperatorPaymentRouteModel;
			}
		}) as const,
	deletePaymentRoute: (routeId: string) =>
		({
			url: `/operator/payment-routes/${routeId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;

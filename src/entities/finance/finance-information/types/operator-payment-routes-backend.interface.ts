import type {
	OPERATOR_PAYMENT_ROUTES_PATHS,
	OperatorPaymentRouteModel,
	PaymentRouteCreate,
	PaymentRouteUpdate
} from "@/shared/api";

export type TOperatorPaymentRouteBackend = OperatorPaymentRouteModel;
export type TOperatorPaymentRouteCreateBackend = PaymentRouteCreate;
export type TOperatorPaymentRouteUpdateBackend = PaymentRouteUpdate;

export type TOperatorPaymentRoutesBackendQuery =
	typeof OPERATOR_PAYMENT_ROUTES_PATHS.listPaymentRoutes._types.query;

export type TOperatorPaymentRoutesBackendResponse =
	typeof OPERATOR_PAYMENT_ROUTES_PATHS.listPaymentRoutes._types.response;

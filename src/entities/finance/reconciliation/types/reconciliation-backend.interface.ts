import type { BOOKING_ORDER_OPERATOR_PATHS } from "@/shared/api/generated/paths/booking-order-operator.paths";
import type { BOOKING_RECONCILIATION_PATHS } from "@/shared/api/generated/paths/booking-reconciliation.paths";

export type TReconciliationListBackend =
	typeof BOOKING_RECONCILIATION_PATHS.listBookingReconciliation._types.response;

export type TReconciliationListQuery =
	typeof BOOKING_RECONCILIATION_PATHS.listBookingReconciliation._types.query;

export type TReconciliationRowBackend =
	TReconciliationListBackend["data"][number];

export type TReconciliationTotalsBackend = TReconciliationListBackend["totals"];

export type TBookingFinancialsBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderFinancials
>["_types"]["response"];

export type TBookingVarianceBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderVariance
>["_types"]["response"];

export type TEventVarianceLineBackend =
	TBookingVarianceBackend["events"][number];

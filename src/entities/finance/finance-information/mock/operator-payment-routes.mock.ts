import type { TOperatorPaymentRouteBackend } from "../types";

import { RECEIVING_PAYMENTS_SEED } from "./receiving-payments.seed";

export const MOCK_OPERATOR_ID = "a0000000-0000-4000-8000-000000000001";

export const OPERATOR_PAYMENT_ROUTES_MOCK: TOperatorPaymentRouteBackend[] =
	RECEIVING_PAYMENTS_SEED.map((item, index) => ({
		id: `b0000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
		operator_id: MOCK_OPERATOR_ID,
		...item,
		note: item.note ?? null
	}));

let paymentRoutesStore: TOperatorPaymentRouteBackend[] = [
	...OPERATOR_PAYMENT_ROUTES_MOCK
];

export const listPaymentRoutesFromStore =
	(): TOperatorPaymentRouteBackend[] => [...paymentRoutesStore];

export const findPaymentRouteInStore = (
	id: string
): TOperatorPaymentRouteBackend | undefined =>
	paymentRoutesStore.find((route) => route.id === id);

export const createPaymentRouteInStore = (
	route: TOperatorPaymentRouteBackend
): TOperatorPaymentRouteBackend => {
	paymentRoutesStore = [...paymentRoutesStore, route];
	return route;
};

export const updatePaymentRouteInStore = (
	id: string,
	patch: Partial<TOperatorPaymentRouteBackend>
): TOperatorPaymentRouteBackend | undefined => {
	const index = paymentRoutesStore.findIndex((route) => route.id === id);
	if (index === -1) return undefined;

	const updated = { ...paymentRoutesStore[index], ...patch };
	paymentRoutesStore = paymentRoutesStore.map((route, i) =>
		i === index ? updated : route
	);
	return updated;
};

export const deletePaymentRouteFromStore = (id: string): boolean => {
	const prevLength = paymentRoutesStore.length;
	paymentRoutesStore = paymentRoutesStore.filter((route) => route.id !== id);
	return paymentRoutesStore.length < prevLength;
};

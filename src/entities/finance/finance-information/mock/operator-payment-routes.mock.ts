import { Currency } from "@/shared/api";

import type { TOperatorPaymentRouteBackend } from "../types";

export const MOCK_OPERATOR_ID = "a0000000-0000-4000-8000-000000000001";

export const OPERATOR_PAYMENT_ROUTES_MOCK: TOperatorPaymentRouteBackend[] = [
	{
		id: "b0000000-0000-4000-8000-000000000001",
		operator_id: MOCK_OPERATOR_ID,
		internal_label: "Main EUR account",
		currency: Currency.EUR,
		note: "Primary SWIFT route for EU clients",
		details: {
			typ: "classic_swift",
			account_name_iban: "Tour Firm LLC / DE89 3704 0044 0532 0130 00",
			swift_bic: "COBADEFFXXX",
			bank_name: "Commerzbank AG",
			bank_address: "Kaiserplatz, 60311 Frankfurt am Main, Germany"
		}
	},
	{
		id: "b0000000-0000-4000-8000-000000000002",
		operator_id: MOCK_OPERATOR_ID,
		internal_label: "USD SWIFT",
		currency: Currency.USD,
		note: null,
		details: {
			typ: "classic_swift",
			account_name_iban: "Tour Firm Inc / US12 3456 7890 1234 5678 90",
			swift_bic: "CHASUS33",
			bank_name: "JPMorgan Chase Bank",
			bank_address: "383 Madison Avenue, New York, NY 10179, USA"
		}
	},
	{
		id: "b0000000-0000-4000-8000-000000000003",
		operator_id: MOCK_OPERATOR_ID,
		internal_label: "Wise payments",
		currency: Currency.USD,
		note: "Online payment link",
		details: {
			typ: "wise",
			account_id_email: "payments@tourfirm.example",
			payment_link: "https://wise.com/pay/me/tourfirm"
		}
	}
];

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

import { currencyConverter } from "@/entities/commission";

import type { TOperatorPayoutDetailsSchema } from "../schema";
import type {
	TOperatorPaymentRoute,
	TOperatorPaymentRouteBackend,
	TOperatorPaymentRouteCreateBackend,
	TOperatorPaymentRouteUpdateBackend
} from "../types";
import { ENUM_PAYMENT_ROUTE_METHODS } from "../types";

import { paymentRouteMethodConverter } from "./operator-payment-route-method.converters";

export const mapOperatorPaymentRouteToFrontend = (
	backend: TOperatorPaymentRouteBackend
): TOperatorPaymentRoute => {
	const methodType = paymentRouteMethodConverter.from(backend.details.typ)!;

	return {
		id: backend.id,
		operatorId: backend.operator_id,
		internalLabel: backend.internal_label,
		currency: currencyConverter.from(backend.currency)!,
		note: backend.note,
		methodType,
		details:
			backend.details.typ === "classic_swift"
				? {
						typ: ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT,
						accountNameIban: backend.details.account_name_iban,
						swiftBic: backend.details.swift_bic,
						bankName: backend.details.bank_name,
						bankAddress: backend.details.bank_address
					}
				: {
						typ: ENUM_PAYMENT_ROUTE_METHODS.WISE,
						accountIdEmail: backend.details.account_id_email,
						paymentLink: backend.details.payment_link
					}
	};
};

export const mapPaymentRoutesListToFrontend = (
	backendList: TOperatorPaymentRouteBackend[]
): TOperatorPaymentRoute[] =>
	backendList.map(mapOperatorPaymentRouteToFrontend);

export const mapFormToPaymentRouteCreateBackend = (
	frontend: TOperatorPayoutDetailsSchema
): TOperatorPaymentRouteCreateBackend => {
	if (frontend.method_type === ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT) {
		return {
			internal_label: frontend.internal_label,
			currency: currencyConverter.to(frontend.currency)!,
			note: frontend.note || null,
			details: {
				typ: "classic_swift",
				account_name_iban: frontend.account_name_iban,
				swift_bic: frontend.swift_bic,
				bank_name: frontend.bank_name,
				bank_address: frontend.bank_address
			}
		};
	}

	return {
		internal_label: frontend.internal_label,
		currency: currencyConverter.to(frontend.currency)!,
		note: frontend.note || null,
		details: {
			typ: "wise",
			account_id_email: frontend.account_id_email,
			payment_link: frontend.payment_link
		}
	};
};

export const mapFormToPaymentRouteUpdateBackend = (
	frontend: TOperatorPayoutDetailsSchema
): TOperatorPaymentRouteUpdateBackend => {
	if (frontend.method_type === ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT) {
		return {
			internal_label: frontend.internal_label,
			currency: currencyConverter.to(frontend.currency),
			note: frontend.note || null,
			details: {
				typ: "classic_swift",
				account_name_iban: frontend.account_name_iban,
				swift_bic: frontend.swift_bic,
				bank_name: frontend.bank_name,
				bank_address: frontend.bank_address
			}
		};
	}

	return {
		internal_label: frontend.internal_label,
		currency: currencyConverter.to(frontend.currency),
		note: frontend.note || null,
		details: {
			typ: "wise",
			account_id_email: frontend.account_id_email,
			payment_link: frontend.payment_link
		}
	};
};

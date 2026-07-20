import type { ClassicSwiftDetails, CustomDetails } from "@/shared/api";

import { currencyConverter } from "@/entities/commission";

import type { TOperatorPayoutDetailsSchema } from "../schema";
import type {
	TClassicSwiftDetails,
	TOperatorPaymentRoute,
	TOperatorPaymentRouteBackend,
	TOperatorPaymentRouteCreateBackend,
	TOperatorPaymentRouteUpdateBackend,
	TWiseDetails
} from "../types";
import { ENUM_PAYMENT_ROUTE_METHODS } from "../types";

import { paymentRouteMethodConverter } from "./operator-payment-route-method.converters";

const mapWiseDetailsToFrontend = (data: CustomDetails): TWiseDetails => {
	return {
		typ: ENUM_PAYMENT_ROUTE_METHODS.WISE,
		accountIdEmail:
			data?.items?.find((item) => item.key === "account_id_email")?.val ??
			"",
		paymentLink:
			data?.items?.find((item) => item.key === "payment_link")?.val ?? ""
	};
};

const mapClassicSwiftDetailsToFrontend = (
	data: ClassicSwiftDetails
): TClassicSwiftDetails => {
	return {
		typ: ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT,
		accountNameIban: data.account_name_iban,
		swiftBic: data.swift_bic,
		bankName: data.bank_name,
		bankAddress: data.bank_address
	};
};

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
				? mapClassicSwiftDetailsToFrontend(backend.details)
				: mapWiseDetailsToFrontend(backend.details)
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
			typ: "custom",
			items: [
				{ key: "account_id_email", val: frontend.account_id_email },
				{ key: "payment_link", val: frontend.payment_link }
			]
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
			typ: "custom",
			items: [
				{ key: "account_id_email", val: frontend.account_id_email },
				{ key: "payment_link", val: frontend.payment_link }
			]
		}
	};
};

import type {
	BusDetailSchemaOutput,
	FlightDetailsSchemaOutput,
	TrainDetailSchemaOutput
} from "@/shared/api";
import { Currency } from "@/shared/api";

import {
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE,
	type TFlightPricingSchema
} from "../../types";

type TTransportDetailsWithPricing =
	| FlightDetailsSchemaOutput
	| TrainDetailSchemaOutput
	| BusDetailSchemaOutput
	| null
	| undefined;

export const mapFlightPricingFromBackend = (
	details?: TTransportDetailsWithPricing
): TFlightPricingSchema => {
	const expenses = details?.expenses;

	if (!expenses) {
		return {
			invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			package_type: ""
		};
	}

	const feesVal = details?.fees?.cost?.val;

	if (expenses.typ === "fixed") {
		return {
			invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			...(!!expenses.cost?.val && { total_price: expenses.cost.val }),
			...(!!feesVal && { taxes: feesVal }),
			...(!!expenses.cost?.currency && {
				currency: expenses.cost.currency
			}),
			package_type: ""
		};
	}

	return {
		invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
		pricing_type: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
		...(!!expenses.cost_per_person?.val && {
			total_price: expenses.cost_per_person.val
		}),
		...(!!feesVal && { taxes: feesVal }),
		...(!!expenses.cost_per_person?.currency && {
			currency: expenses.cost_per_person.currency
		}),
		package_type: ""
	};
};

export const mapFlightPricingToBackend = (
	pricing?: TFlightPricingSchema
): {
	details?: Pick<FlightDetailsSchemaOutput, "expenses" | "fees">;
} => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL ||
		!pricing.total_price ||
		!pricing.taxes ||
		!pricing.currency
	) {
		return {};
	}

	const cost = {
		val: pricing.total_price,
		currency: pricing.currency as Currency
	};
	const fees = {
		typ: "fixed" as const,
		cost: { val: pricing.taxes, currency: pricing.currency as Currency }
	};

	if (pricing.pricing_type === ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE) {
		return {
			details: {
				expenses: { typ: "fixed", cost },
				fees
			}
		};
	}

	return {
		details: {
			expenses: { typ: "per_person", cost_per_person: cost },
			fees
		}
	};
};

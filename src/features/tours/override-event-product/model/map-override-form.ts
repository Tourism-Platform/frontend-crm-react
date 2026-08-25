import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";
import {
	ENUM_ACCOMMODATION_CHARGE,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE,
	type IHousingEventOverride,
	type ITrainEventOverride,
	type TEventOverride,
	getDefaultAccommodationPricing,
	getEmptyHotelPolicy,
	mapFlightPricingFromBackend
} from "@/entities/tour";

import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_CHARGE,
	type TOverrideProductFormValues
} from "./types";

export type TOverrideEventKind = "housing" | "train";

const emptyFormValues = (): TOverrideProductFormValues => ({
	[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
		ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
	[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]: ENUM_OVERRIDE_CHARGE.FIXED,
	[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]: null,
	[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: [],
	[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM]: "",
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL]: ""
});

export const mapOverrideToFormValues = (
	kind: TOverrideEventKind,
	override: TEventOverride | null | undefined
): TOverrideProductFormValues => {
	const defaults = emptyFormValues();

	if (!override) {
		return defaults;
	}

	if (kind === "housing" && override.typ === "housing") {
		const expenses = override.expenses;
		return {
			[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
				expenses?.pricing_type ===
				ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON
					? ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
					: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]:
				expenses?.[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP] ===
				ENUM_ACCOMMODATION_CHARGE.PER_DURATION
					? ENUM_OVERRIDE_CHARGE.PER_DURATION
					: ENUM_OVERRIDE_CHARGE.FIXED,
			[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]:
				expenses?.total_price ?? null,
			[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: expenses?.fees ?? [],
			[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]:
				expenses?.currency ?? DEFAULT_EVENT_CURRENCY,
			[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM]:
				override.policy?.checkInFrom ?? "",
			[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL]:
				override.policy?.checkOutUntil ?? ""
		};
	}

	if (kind === "train" && override.typ === "train") {
		const expenses = override.expenses;
		return {
			...defaults,
			[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
				expenses?.pricing_type === ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
					? ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
					: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]:
				expenses?.[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE] ?? null,
			[ENUM_FORM_OVERRIDE_PRODUCT.FEES]:
				expenses?.[ENUM_FLIGHT_PRICING_FIELD.FEES] ?? [],
			[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]:
				expenses?.[ENUM_FLIGHT_PRICING_FIELD.CURRENCY] ??
				DEFAULT_EVENT_CURRENCY
		};
	}

	return defaults;
};

export const mapFormValuesToOverride = (
	kind: TOverrideEventKind,
	values: TOverrideProductFormValues
): TEventOverride => {
	const currency = values[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY];
	const isPerPerson =
		values[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE] ===
		ENUM_FLIGHT_PRICING_TYPE.PER_PERSON;

	if (kind === "train") {
		const base = mapFlightPricingFromBackend(null);
		const expenses: NonNullable<ITrainEventOverride["expenses"]> = {
			...base,
			invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
			pricing_type: isPerPerson
				? ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
				: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]:
				values[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE],
			[ENUM_FLIGHT_PRICING_FIELD.FEES]:
				values[ENUM_FORM_OVERRIDE_PRODUCT.FEES],
			[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: currency
		};

		return { typ: "train", expenses };
	}

	const base = getDefaultAccommodationPricing();
	const expenses: NonNullable<IHousingEventOverride["expenses"]> = {
		...base,
		invoicing: ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
		pricing_type: isPerPerson
			? ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON
			: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
		[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
			values[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP] ===
			ENUM_OVERRIDE_CHARGE.PER_DURATION
				? ENUM_ACCOMMODATION_CHARGE.PER_DURATION
				: ENUM_ACCOMMODATION_CHARGE.FIXED,
		[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]:
			values[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE],
		[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]:
			values[ENUM_FORM_OVERRIDE_PRODUCT.FEES],
		[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: currency
	};

	const policy = getEmptyHotelPolicy();
	policy.checkInFrom =
		values[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM].trim() || null;
	policy.checkOutUntil =
		values[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL].trim() || null;

	return { typ: "housing", expenses, policy };
};

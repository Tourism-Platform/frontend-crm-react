import { Currency } from "@/shared/api";

import {
	DEFAULT_EVENT_CURRENCY,
	currencyConverter
} from "@/entities/commission";
import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_PRICING_TYPE,
	type IHousingEventOverride,
	type ITrainEventOverride,
	type TEventOverride,
	type TEventOverrideCharge,
	getEmptyHotelPolicy,
	mapFeesFromBackend,
	mapFeesToBackend
} from "@/entities/tour";

import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_CHARGE,
	type TOverrideProductFormValues
} from "./types";

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

/** Domain charge → form fields (pricing type / total / fees / currency). */
const chargeToFormValues = (
	charge: TEventOverrideCharge | null | undefined
): Partial<TOverrideProductFormValues> => {
	if (!charge) {
		return {};
	}

	if (charge.typ === "per_person") {
		return {
			[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
				ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
			[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]:
				charge.cost_per_person?.val ?? null,
			[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: mapFeesFromBackend(charge.fees),
			[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]:
				currencyConverter.from(charge.cost_per_person?.currency) ??
				DEFAULT_EVENT_CURRENCY
		};
	}

	if (charge.typ === "per_duration") {
		const rate = charge.rate;
		return {
			[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
				ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]:
				ENUM_OVERRIDE_CHARGE.PER_DURATION,
			[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]:
				rate.typ === "fixed" ? (rate.cost?.val ?? null) : null,
			[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: mapFeesFromBackend(charge.fees),
			[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]:
				currencyConverter.from(
					rate.typ === "fixed" ? rate.cost?.currency : undefined
				) ?? DEFAULT_EVENT_CURRENCY
		};
	}

	return {
		[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]:
			ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
		[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]: ENUM_OVERRIDE_CHARGE.FIXED,
		[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]: charge.cost?.val ?? null,
		[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: mapFeesFromBackend(charge.fees),
		[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]:
			currencyConverter.from(charge.cost?.currency) ??
			DEFAULT_EVENT_CURRENCY
	};
};

export const mapOverrideToFormValues = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	override: TEventOverride | null | undefined
): TOverrideProductFormValues => {
	const defaults = emptyFormValues();

	if (!override) {
		return defaults;
	}

	if (eventTyp === ENUM_EVENT_BACKEND.HOUSING && override.typ === "housing") {
		return {
			...defaults,
			...chargeToFormValues(override.rate?.base),
			[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM]:
				override.policy?.checkInFrom ?? "",
			[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL]:
				override.policy?.checkOutUntil ?? ""
		};
	}

	if (eventTyp !== ENUM_EVENT_BACKEND.HOUSING && override.typ === "train") {
		return {
			...defaults,
			...chargeToFormValues(override.charge)
		};
	}

	return defaults;
};

/** Form fields → domain charge (contract 3.1 charge union). */
const formValuesToCharge = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	values: TOverrideProductFormValues
): TEventOverrideCharge => {
	const total = values[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE];
	const currency =
		currencyConverter.to(values[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]) ??
		Currency.USD;
	const fees = mapFeesToBackend(values[ENUM_FORM_OVERRIDE_PRODUCT.FEES]);

	if (
		values[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE] ===
		ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: "per_person",
			cost_per_person: { val: total ?? 0, currency },
			fees,
			extra_costs: [],
			markup: null
		};
	}

	if (
		eventTyp === ENUM_EVENT_BACKEND.HOUSING &&
		values[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP] ===
			ENUM_OVERRIDE_CHARGE.PER_DURATION
	) {
		return {
			typ: "per_duration",
			rate: {
				typ: "fixed",
				cost: { val: total ?? 0, currency }
			},
			fees,
			extra_costs: [],
			markup: null
		};
	}

	return {
		typ: "fixed",
		cost: { val: total ?? 0, currency },
		fees,
		extra_costs: [],
		markup: null
	};
};

export const mapFormValuesToOverride = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	values: TOverrideProductFormValues
): TEventOverride => {
	const charge = formValuesToCharge(eventTyp, values);

	if (eventTyp !== ENUM_EVENT_BACKEND.HOUSING) {
		if (charge.typ === "per_duration") {
			throw new Error("Train override supports fixed/per_person charges");
		}
		const override: ITrainEventOverride = { typ: "train", charge };
		return override;
	}

	const policy = getEmptyHotelPolicy();
	policy.checkInFrom =
		values[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM].trim() || null;
	policy.checkOutUntil =
		values[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL].trim() || null;

	const override: IHousingEventOverride = {
		typ: "housing",
		rate: { base: charge, seasons: [] },
		policy
	};
	return override;
};

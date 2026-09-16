import {
	type ActivityOverrideInput,
	type BusOverrideInput,
	type DurationChargeInput,
	type FeeInput,
	type FixedChargeInput,
	type HotelOverrideInput,
	type MonetaryValueSchema,
	type PerPersonChargeInput,
	type RoomRateInput,
	type RouteOverrideInput,
	RouteOverrideInputTypEnum,
	type TransferOverrideInput
} from "@/shared/api";

import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE
} from "../../types/event-backend-enum.types";
import type { TEventOverrideInputBackend } from "../../types/event-override-backend.types";
import {
	ENUM_FORM_OVERRIDE_PRODUCT as ENUM_FORM,
	ENUM_OVERRIDE_CHARGE,
	ENUM_OVERRIDE_PRICING_ARM,
	type ENUM_OVERRIDE_PRICING_ARM_TYPE,
	ENUM_OVERRIDE_UNIT_CHARGE,
	type IOverrideUnitFormRow,
	type TOverrideProductFormValues
} from "../../types/event-override-form.types";
import { ENUM_FLIGHT_PRICING_TYPE } from "../../types/flight/pricing.types";

import { type IOverrideUnitOption } from "./event-override-units.helpers";
import { mapFeesFromBackend, mapFeesToBackend } from "./fees.converters";

/** Structural view over every charge shape the override arms carry. */
interface IChargeLike {
	typ: string;
	cost?: MonetaryValueSchema | null;
	cost_per_person?: MonetaryValueSchema | null;
	rate?: { typ?: string; cost?: MonetaryValueSchema | null } | null;
	fees?: FeeInput[] | null;
}

// ---------------------------------------------------------------------------
// Form values construction (Input -> form)
// ---------------------------------------------------------------------------

const emptyUnitRow = (unit: IOverrideUnitOption): IOverrideUnitFormRow => ({
	unit_id: unit.id,
	name: unit.label,
	charge_typ: ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
	total_price: null,
	currency: DEFAULT_EVENT_CURRENCY,
	fees: []
});

const emptyFormValues = (
	units: IOverrideUnitOption[]
): TOverrideProductFormValues => ({
	[ENUM_FORM.PRICING_TYPE]: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
	[ENUM_FORM.CHARGE_TYP]: ENUM_OVERRIDE_CHARGE.FIXED,
	[ENUM_FORM.TOTAL_PRICE]: null,
	[ENUM_FORM.FEES]: [],
	[ENUM_FORM.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM.CHECK_IN_FROM]: "",
	[ENUM_FORM.CHECK_OUT_UNTIL]: "",
	[ENUM_FORM.PRICING_ARM]: ENUM_OVERRIDE_PRICING_ARM.WHOLE,
	[ENUM_FORM.UNITS]: units.map(emptyUnitRow)
});

const readChargePrice = (charge: IChargeLike): number | null => {
	if (charge.typ === "per_person") {
		return charge.cost_per_person?.val ?? null;
	}
	if (charge.typ === "per_duration") {
		return charge.rate?.cost?.val ?? null;
	}
	return charge.cost?.val ?? null;
};

const readChargeCurrency = (
	charge: IChargeLike
): ENUM_CURRENCY_OPTIONS_TYPE => {
	const currency =
		charge.typ === "per_person"
			? charge.cost_per_person?.currency
			: charge.typ === "per_duration"
				? charge.rate?.cost?.currency
				: charge.cost?.currency;
	return currencyConverter.from(currency) ?? DEFAULT_EVENT_CURRENCY;
};

const chargeToUnitRow = (
	unit: IOverrideUnitOption,
	charge: IChargeLike
): IOverrideUnitFormRow => ({
	...emptyUnitRow(unit),
	charge_typ:
		charge.typ === "per_person"
			? ENUM_OVERRIDE_UNIT_CHARGE.PER_PERSON
			: charge.typ === "per_duration"
				? ENUM_OVERRIDE_UNIT_CHARGE.PER_DURATION
				: ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
	total_price: readChargePrice(charge),
	currency: readChargeCurrency(charge),
	fees: mapFeesFromBackend(charge.fees)
});

/**
 * Every spec unit becomes a row; units the override repriced carry their
 * charge, the rest stay empty (an empty row is NOT sent — the override
 * lists only repriced units).
 */
const mergeUnitRows = <TRow extends object>(
	units: IOverrideUnitOption[],
	rows: readonly TRow[],
	getId: (row: TRow) => string,
	getCharge: (row: TRow) => IChargeLike | undefined
): IOverrideUnitFormRow[] => {
	const byId = new Map(rows.map((row) => [getId(row), row]));
	return units.map((unit) => {
		const row = byId.get(unit.id);
		const charge = row ? getCharge(row) : undefined;
		return charge ? chargeToUnitRow(unit, charge) : emptyUnitRow(unit);
	});
};

const applyWholeCharge = (
	values: TOverrideProductFormValues,
	charge: IChargeLike | null | undefined
): void => {
	if (!charge) {
		return;
	}
	values[ENUM_FORM.PRICING_TYPE] =
		charge.typ === "per_person"
			? ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
			: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE;
	values[ENUM_FORM.CHARGE_TYP] =
		charge.typ === "per_duration"
			? ENUM_OVERRIDE_CHARGE.PER_DURATION
			: ENUM_OVERRIDE_CHARGE.FIXED;
	values[ENUM_FORM.TOTAL_PRICE] = readChargePrice(charge);
	values[ENUM_FORM.CURRENCY] = readChargeCurrency(charge);
	values[ENUM_FORM.FEES] = mapFeesFromBackend(charge.fees);
};

/**
 * Fills the override dialog values from the read-side Input (contract 6).
 * The arm follows `rates.pricing`; per-unit rows merge spec units with the
 * repriced ones by id.
 */
export const mapEventOverrideToForm = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	override: TEventOverrideInputBackend | null | undefined,
	units: IOverrideUnitOption[]
): TOverrideProductFormValues => {
	const values = emptyFormValues(units);
	if (!override) {
		return values;
	}

	switch (eventTyp) {
		case ENUM_EVENT_BACKEND.HOUSING: {
			if (override.typ !== "housing") {
				return values;
			}
			values[ENUM_FORM.CHECK_IN_FROM] =
				override.policy?.check_in_from ?? "";
			values[ENUM_FORM.CHECK_OUT_UNTIL] =
				override.policy?.check_out_until ?? "";
			const rates = override.rates;
			if (rates?.pricing === "per_room") {
				values[ENUM_FORM.PRICING_ARM] =
					ENUM_OVERRIDE_PRICING_ARM.PER_ROOM;
				values[ENUM_FORM.UNITS] = mergeUnitRows(
					units,
					rates.rooms,
					(row) => row.room_id,
					(row) => row.rate.base
				);
			} else if (rates?.pricing === "whole") {
				applyWholeCharge(values, rates.price?.base);
			}
			return values;
		}
		case ENUM_EVENT_BACKEND.TRAIN:
		case ENUM_EVENT_BACKEND.FLIGHT: {
			if (override.typ !== "train" && override.typ !== "flight") {
				return values;
			}
			const rates = override.rates;
			if (rates?.pricing === "per_fare") {
				values[ENUM_FORM.PRICING_ARM] =
					ENUM_OVERRIDE_PRICING_ARM.PER_FARE;
				values[ENUM_FORM.UNITS] = mergeUnitRows(
					units,
					rates.fares,
					(row) => row.fare_id,
					(row) => row.charge
				);
			} else if (rates?.pricing === "whole") {
				applyWholeCharge(values, rates.charge);
			}
			return values;
		}
		case ENUM_EVENT_BACKEND.BUS: {
			if (override.typ !== "bus") {
				return values;
			}
			const rates = override.rates;
			if (rates?.pricing === "per_vehicle") {
				values[ENUM_FORM.PRICING_ARM] =
					ENUM_OVERRIDE_PRICING_ARM.PER_VEHICLE;
				values[ENUM_FORM.UNITS] = mergeUnitRows(
					units,
					rates.vehicles,
					(row) => row.vehicle_id,
					(row) => row.charge
				);
			} else if (rates?.pricing === "whole") {
				applyWholeCharge(values, rates.charge);
			}
			return values;
		}
		case ENUM_EVENT_BACKEND.TRANSFER: {
			if (override.typ !== "transfer") {
				return values;
			}
			const rates = override.rates;
			if (rates?.pricing === "per_car") {
				values[ENUM_FORM.PRICING_ARM] =
					ENUM_OVERRIDE_PRICING_ARM.PER_CAR;
				values[ENUM_FORM.UNITS] = mergeUnitRows(
					units,
					rates.cars,
					(row) => row.car_id,
					(row) => row.charge
				);
			} else if (rates?.pricing === "per_car_category") {
				values[ENUM_FORM.PRICING_ARM] =
					ENUM_OVERRIDE_PRICING_ARM.PER_CAR_CATEGORY;
				values[ENUM_FORM.UNITS] = mergeUnitRows(
					units,
					rates.categories,
					(row) => row.category_id,
					(row) => row.charge
				);
			} else if (rates?.pricing === "whole") {
				applyWholeCharge(values, rates.charge);
			}
			return values;
		}
		case ENUM_EVENT_BACKEND.ACTIVITY: {
			if (override.typ !== "activity") {
				return values;
			}
			values[ENUM_FORM.PRICING_ARM] = ENUM_OVERRIDE_PRICING_ARM.OFFERINGS;
			values[ENUM_FORM.UNITS] = mergeUnitRows(
				units,
				override.rates?.offerings ?? [],
				(row) => row.offering_id,
				(row) => row.charge
			);
			return values;
		}
		default:
			return values;
	}
};

// ---------------------------------------------------------------------------
// Override construction (form -> Input)
// ---------------------------------------------------------------------------

type TFixedCharge = { typ: "fixed" } & FixedChargeInput;
type TPerPersonCharge = { typ: "per_person" } & PerPersonChargeInput;
type TDurationCharge = { typ: "per_duration" } & DurationChargeInput;

const buildFixedCharge = (
	total: number | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: FeeInput[] | null
): TFixedCharge => ({
	typ: "fixed",
	cost: { val: total ?? 0, currency: currencyConverter.to(currency)! },
	fees,
	extra_costs: [],
	markup: null
});

const buildPerPersonCharge = (
	total: number | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: FeeInput[] | null
): TPerPersonCharge => ({
	typ: "per_person",
	cost_per_person: {
		val: total ?? 0,
		currency: currencyConverter.to(currency)!
	},
	fees,
	extra_costs: [],
	markup: null
});

const buildPerDurationCharge = (
	total: number | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: FeeInput[] | null
): TDurationCharge => ({
	typ: "per_duration",
	rate: {
		typ: "fixed",
		cost: { val: total ?? 0, currency: currencyConverter.to(currency)! }
	},
	fees,
	extra_costs: [],
	markup: null
});

/** Whole arm of housing: fixed / per-night / per-person. */
const buildStayCharge = (
	values: TOverrideProductFormValues
): TFixedCharge | TPerPersonCharge | TDurationCharge => {
	const total = values[ENUM_FORM.TOTAL_PRICE];
	const currency = values[ENUM_FORM.CURRENCY];
	const fees = mapFeesToBackend(values[ENUM_FORM.FEES]);

	if (
		values[ENUM_FORM.PRICING_TYPE] === ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
	) {
		return buildPerPersonCharge(total, currency, fees);
	}
	if (values[ENUM_FORM.CHARGE_TYP] === ENUM_OVERRIDE_CHARGE.PER_DURATION) {
		return buildPerDurationCharge(total, currency, fees);
	}
	return buildFixedCharge(total, currency, fees);
};

/** Whole arm of route / bus / transfer: fixed or per-person only. */
const buildFlatOrPerPersonCharge = (
	values: TOverrideProductFormValues
): TFixedCharge | TPerPersonCharge => {
	const total = values[ENUM_FORM.TOTAL_PRICE];
	const currency = values[ENUM_FORM.CURRENCY];
	const fees = mapFeesToBackend(values[ENUM_FORM.FEES]);

	return values[ENUM_FORM.PRICING_TYPE] ===
		ENUM_FLIGHT_PRICING_TYPE.PER_PERSON
		? buildPerPersonCharge(total, currency, fees)
		: buildFixedCharge(total, currency, fees);
};

/** Fare / offering rows: fixed or per-person. */
const buildFlatOrPerPersonUnitCharge = (
	row: IOverrideUnitFormRow
): TFixedCharge | TPerPersonCharge => {
	const fees = mapFeesToBackend(row.fees);
	return row.charge_typ === ENUM_OVERRIDE_UNIT_CHARGE.PER_PERSON
		? buildPerPersonCharge(row.total_price, row.currency, fees)
		: buildFixedCharge(row.total_price, row.currency, fees);
};

/** Room rows: fixed or per-night. */
const buildRoomCharge = (row: IOverrideUnitFormRow): RoomRateInput["base"] => {
	const fees = mapFeesToBackend(row.fees);
	if (row.charge_typ === ENUM_OVERRIDE_UNIT_CHARGE.PER_DURATION) {
		return {
			typ: "per_duration",
			rate: {
				typ: "fixed",
				cost: {
					val: row.total_price ?? 0,
					currency: currencyConverter.to(row.currency)!
				}
			},
			fees,
			extra_costs: [],
			markup: null
		};
	}
	return buildFixedCharge(row.total_price, row.currency, fees);
};

/** Vehicle / car / car-category rows: fixed only. */
const buildFixedUnitCharge = (row: IOverrideUnitFormRow): TFixedCharge =>
	buildFixedCharge(row.total_price, row.currency, mapFeesToBackend(row.fees));

const buildHousingOverride = (
	values: TOverrideProductFormValues,
	arm: ENUM_OVERRIDE_PRICING_ARM_TYPE,
	rows: IOverrideUnitFormRow[]
): HotelOverrideInput => {
	const policy = {
		check_in_from: values[ENUM_FORM.CHECK_IN_FROM],
		check_out_until: values[ENUM_FORM.CHECK_OUT_UNTIL],
		early_check_in: [],
		late_check_out: []
	};

	if (arm === ENUM_OVERRIDE_PRICING_ARM.PER_ROOM) {
		return {
			typ: "housing",
			policy,
			rates: {
				pricing: "per_room",
				rooms: rows.map((row) => ({
					room_id: row.unit_id,
					rate: { base: buildRoomCharge(row), seasons: [] }
				}))
			}
		};
	}

	return {
		typ: "housing",
		policy,
		rates: {
			pricing: "whole",
			price: { base: buildStayCharge(values), seasons: [] }
		}
	};
};

const buildRouteOverride = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	values: TOverrideProductFormValues,
	arm: ENUM_OVERRIDE_PRICING_ARM_TYPE,
	rows: IOverrideUnitFormRow[]
): RouteOverrideInput => {
	const typ =
		eventTyp === ENUM_EVENT_BACKEND.TRAIN
			? RouteOverrideInputTypEnum.Train
			: RouteOverrideInputTypEnum.Flight;

	if (arm === ENUM_OVERRIDE_PRICING_ARM.PER_FARE) {
		return {
			typ,
			rates: {
				pricing: "per_fare",
				fares: rows.map((row) => ({
					fare_id: row.unit_id,
					charge: buildFlatOrPerPersonUnitCharge(row)
				}))
			}
		};
	}

	return {
		typ,
		rates: { pricing: "whole", charge: buildFlatOrPerPersonCharge(values) }
	};
};

const buildBusOverride = (
	values: TOverrideProductFormValues,
	arm: ENUM_OVERRIDE_PRICING_ARM_TYPE,
	rows: IOverrideUnitFormRow[]
): BusOverrideInput => {
	if (arm === ENUM_OVERRIDE_PRICING_ARM.PER_VEHICLE) {
		return {
			typ: "bus",
			rates: {
				pricing: "per_vehicle",
				vehicles: rows.map((row) => ({
					vehicle_id: row.unit_id,
					charge: buildFixedUnitCharge(row)
				}))
			}
		};
	}

	return {
		typ: "bus",
		rates: { pricing: "whole", charge: buildFlatOrPerPersonCharge(values) }
	};
};

const buildTransferOverride = (
	values: TOverrideProductFormValues,
	arm: ENUM_OVERRIDE_PRICING_ARM_TYPE,
	rows: IOverrideUnitFormRow[]
): TransferOverrideInput => {
	if (arm === ENUM_OVERRIDE_PRICING_ARM.PER_CAR) {
		return {
			typ: "transfer",
			rates: {
				pricing: "per_car",
				cars: rows.map((row) => ({
					car_id: row.unit_id,
					charge: buildFixedUnitCharge(row)
				}))
			}
		};
	}

	if (arm === ENUM_OVERRIDE_PRICING_ARM.PER_CAR_CATEGORY) {
		return {
			typ: "transfer",
			rates: {
				pricing: "per_car_category",
				categories: rows.map((row) => ({
					category_id: row.unit_id,
					charge: buildFixedUnitCharge(row)
				}))
			}
		};
	}

	return {
		typ: "transfer",
		rates: { pricing: "whole", charge: buildFlatOrPerPersonCharge(values) }
	};
};

const buildActivityOverride = (
	rows: IOverrideUnitFormRow[]
): ActivityOverrideInput => ({
	typ: "activity",
	rates: {
		offerings: rows.map((row) => ({
			offering_id: row.unit_id,
			charge: buildFlatOrPerPersonUnitCharge(row)
		}))
	}
});

/**
 * Builds the PATCH body in the generated Input union (contract 6) from the
 * dialog form values — the write converter at the service boundary. Only
 * rows with a filled price are sent: the backend lists repriced units, and
 * an empty row would zero a unit out.
 */
export const mapEventOverrideToBackend = (
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	values: TOverrideProductFormValues
): TEventOverrideInputBackend => {
	const arm = values[ENUM_FORM.PRICING_ARM];
	const filledRows = values[ENUM_FORM.UNITS].filter(
		(row) => row.total_price != null
	);

	switch (eventTyp) {
		case ENUM_EVENT_BACKEND.HOUSING:
			return buildHousingOverride(values, arm, filledRows);
		case ENUM_EVENT_BACKEND.TRAIN:
		case ENUM_EVENT_BACKEND.FLIGHT:
			return buildRouteOverride(eventTyp, values, arm, filledRows);
		case ENUM_EVENT_BACKEND.BUS:
			return buildBusOverride(values, arm, filledRows);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return buildTransferOverride(values, arm, filledRows);
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return buildActivityOverride(filledRows);
		default:
			throw new Error(
				`Override is not supported for event type "${eventTyp}"`
			);
	}
};

import type {
	FixedChargeInput,
	PerPersonChargeInput
} from "@/shared/api/generated/Api";

import {
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_PRICING,
	type ENUM_TRAIN_PRICING_TYPE,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainHop,
	type ITrainJourneyPoint,
	type ITrainProduct,
	type ITrainProductCreate,
	type ITrainVariant,
	type ITrainVariantWrite,
	type TCreateTrainProductBackend,
	type TSupplierVariantChargeReadBackend,
	type TTrainLegInputBackend,
	type TTrainLegReadBackend,
	type TTrainProductReadBackend,
	type TTrainVariantCharge,
	type TTrainVariantReadBackend,
	type TTrainVariantWriteBackend
} from "../../types";
import {
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "../supplier-fee.converters";
import {
	mapSupplierLocationFromBackend,
	mapSupplierLocationToBackend
} from "../supplier-location.converters";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "../supplier-money.converters";
import {
	mapSupplierChargeMarkupFromBackend,
	mapSupplierChargeMarkupToBackend
} from "../supplier-variant-charge.converters";

const mapTrainJourneyPointToBackend = (
	point: ITrainJourneyPoint | null
): TTrainLegInputBackend["departure"] => {
	if (!point) {
		return null;
	}

	return {
		location: mapSupplierLocationToBackend(point.location)
	};
};

const mapTrainJourneyPointFromBackend = (
	point: TTrainLegReadBackend["departure"]
): ITrainJourneyPoint | null => {
	if (!point) {
		return null;
	}

	return {
		location: mapSupplierLocationFromBackend(point.location)
	};
};

export const mapTrainHopToBackend = (
	hop: ITrainHop
): TTrainLegInputBackend => ({
	departure: mapTrainJourneyPointToBackend(hop.departure),
	arrival: mapTrainJourneyPointToBackend(hop.arrival)
});

export const mapTrainHopFromBackend = (
	leg: TTrainLegReadBackend
): ITrainHop => ({
	departure: mapTrainJourneyPointFromBackend(leg.departure),
	arrival: mapTrainJourneyPointFromBackend(leg.arrival)
});

export const mapTrainVariantChargeToBackend = (
	data: TTrainVariantCharge
): FixedChargeInput | PerPersonChargeInput => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapSupplierChargeMarkupToBackend(data.markup);

	if (data.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON) {
		return {
			typ: "per_person",
			cost_per_person: mapMonetaryToBackend(data.costPerPerson),
			fees,
			markup
		};
	}

	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(data.cost),
		fees,
		markup
	};
};

export const mapTrainVariantChargeFromBackend = (
	charge: TSupplierVariantChargeReadBackend | null | undefined
): TTrainVariantCharge | null => {
	if (!charge) {
		return null;
	}

	const fees = mapSupplierFeesFromBackend(charge.fees);
	const markup = mapSupplierChargeMarkupFromBackend(charge.markup);

	if (charge.typ === "per_person") {
		return {
			typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: mapMonetaryFromBackend(charge.cost_per_person),
			fees,
			markup
		};
	}

	return {
		typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(charge.cost),
		fees,
		markup
	};
};

export const mapTrainVariantFromBackend = (
	variant: TTrainVariantReadBackend
): ITrainVariant => ({
	id: variant.id ?? "",
	name: variant.name ?? "",
	expenses:
		"charge" in variant
			? mapTrainVariantChargeFromBackend(variant.charge)
			: null
});

export const mapTrainVariantToWrite = (
	data: ITrainVariantWrite,
	pricing: ENUM_TRAIN_PRICING_TYPE
): TTrainVariantWriteBackend =>
	pricing === ENUM_TRAIN_PRICING.WHOLE
		? {
				typ: "train",
				pricing: ENUM_TRAIN_PRICING.WHOLE,
				name: data.name
			}
		: {
				typ: "train",
				pricing: ENUM_TRAIN_PRICING.PER_FARE,
				name: data.name,
				charge: mapTrainVariantChargeToBackend(data.expenses)
			};

export const mapTrainProductFromBackend = (
	row: TTrainProductReadBackend
): ITrainProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		typ: ENUM_SUPPLIER_TYPE.TRAIN,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		charge:
			spec.pricing === ENUM_TRAIN_PRICING.WHOLE
				? mapTrainVariantChargeFromBackend(spec.charge)
				: null,
		hops: spec.legs.map(mapTrainHopFromBackend),
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.fares.map(mapTrainVariantFromBackend)
	};
};

export const mapTrainProductToCreate = (
	data: ITrainProductCreate
): TCreateTrainProductBackend => ({
	typ: "train",
	details: {
		pricing: ENUM_TRAIN_PRICING.PER_FARE,
		name: data.name,
		legs: data.hops.map(mapTrainHopToBackend)
	}
});

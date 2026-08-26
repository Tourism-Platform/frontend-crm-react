import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainHop,
	type ITrainJourneyPoint,
	type ITrainPerPersonCharge,
	type ITrainProduct,
	type ITrainProductCreate,
	type ITrainVariant,
	type ITrainVariantWrite,
	type TCreateTrainProductBackend,
	type TFixedChargeInputBackend,
	type TSupplierSurcharge,
	type TTrainHopInputBackend,
	type TTrainProductReadBackend,
	type TTrainVariantCharge,
	type TTrainVariantChargeInputBackend,
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

type TTrainChargeMarkupBackend = NonNullable<
	TFixedChargeInputBackend["markup"]
>;
type TTrainChargeMarkupOutputBackend = NonNullable<
	NonNullable<TTrainVariantReadBackend["expenses"]>["markup"]
>;

const mapTrainMarkupFromBackend = (
	markup?: TTrainChargeMarkupOutputBackend | null
): TSupplierSurcharge | null => {
	if (!markup) return null;
	if (markup.typ === "percentage" && "percentage" in markup) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: markup.percentage ?? 0
		};
	}
	if ("cost" in markup && markup.cost) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
			cost: mapMonetaryFromBackend(markup.cost)
		};
	}
	return null;
};

const mapTrainMarkupToBackend = (
	markup: TSupplierSurcharge | null
): TTrainChargeMarkupBackend | null => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: markup.percentage
		};
	}
	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(markup.cost)
	};
};

const mapTrainJourneyPointToBackend = (
	point: ITrainJourneyPoint | null
): TTrainHopInputBackend["departure"] => {
	if (!point) {
		return null;
	}

	return {
		time: point.time ? { time: point.time } : null,
		location: mapSupplierLocationToBackend(point.location)
	};
};

const mapTrainJourneyPointFromBackend = (
	point: TTrainHopInputBackend["departure"] | TTrainHopInputBackend["arrival"]
): ITrainJourneyPoint | null => {
	if (!point) {
		return null;
	}

	return {
		time: point.time?.time ?? null,
		location: mapSupplierLocationFromBackend(point.location ?? null)
	};
};

const mapTrainHopToBackend = (hop: ITrainHop): TTrainHopInputBackend => ({
	departure: mapTrainJourneyPointToBackend(hop.departure),
	arrival: mapTrainJourneyPointToBackend(hop.arrival)
});

const mapTrainHopFromBackend = (hop: {
	departure?: TTrainHopInputBackend["departure"];
	arrival?: TTrainHopInputBackend["arrival"];
}): ITrainHop => ({
	departure: mapTrainJourneyPointFromBackend(hop.departure),
	arrival: mapTrainJourneyPointFromBackend(hop.arrival)
});

export const mapTrainVariantChargeToBackend = (
	data: TTrainVariantCharge
): NonNullable<TTrainVariantChargeInputBackend> => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapTrainMarkupToBackend(data.markup);

	switch (data.typ) {
		case ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON: {
			const perPerson: ITrainPerPersonCharge = data;
			return {
				typ: "per_person",
				cost_per_person: mapMonetaryToBackend(perPerson.costPerPerson),
				fees,
				markup
			};
		}
		case ENUM_TRAIN_VARIANT_CHARGE.FIXED:
		default:
			return {
				typ: "fixed",
				cost: mapMonetaryToBackend(data.cost),
				fees,
				markup
			};
	}
};

export const mapTrainVariantChargeFromBackend = (
	expenses: TTrainVariantReadBackend["expenses"]
): TTrainVariantCharge | null => {
	if (!expenses) {
		return null;
	}

	const fees = mapSupplierFeesFromBackend(expenses.fees);
	const markup = mapTrainMarkupFromBackend(expenses.markup);

	if (expenses.typ === "per_person") {
		return {
			typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: mapMonetaryFromBackend(
				"cost_per_person" in expenses
					? expenses.cost_per_person
					: undefined
			),
			fees,
			markup
		};
	}

	return {
		typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(
			"cost" in expenses ? expenses.cost : undefined
		),
		fees,
		markup
	};
};

export const mapTrainVariantFromBackend = (
	variant: TTrainVariantReadBackend
): ITrainVariant => ({
	id: variant.id,
	name: variant.name,
	expenses: mapTrainVariantChargeFromBackend(variant.expenses)
});

export const mapTrainVariantToWrite = (
	data: ITrainVariantWrite
): TTrainVariantWriteBackend => ({
	typ: "train",
	name: data.name,
	details: {
		typ: "train",
		expenses: data.expenses
			? mapTrainVariantChargeToBackend(data.expenses)
			: null
	}
});

export const mapTrainProductFromBackend = (
	row: TTrainProductReadBackend
): ITrainProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.TRAIN,
	name: row.name,
	hops: (row.hop ?? []).map(mapTrainHopFromBackend),
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapTrainVariantFromBackend)
});

export const mapTrainProductToCreate = (
	data: ITrainProductCreate
): TCreateTrainProductBackend => ({
	typ: "train",
	name: data.name,
	details: {
		typ: "train",
		hop: data.hops.map(mapTrainHopToBackend)
	}
});

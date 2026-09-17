import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FLIGHT_VARIANT_CHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_VARIANT_CHARGE,
	type IFlightProduct,
	type IFlightVariantWrite,
	type ITrainProduct,
	type ITrainVariantWrite,
	type TFlightFareRow,
	type TTrainFareRow
} from "../types";

const emptyFlightCharge = (): IFlightVariantWrite["expenses"] => ({
	typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

const emptyTrainCharge = (): ITrainVariantWrite["expenses"] => ({
	typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

export function mapFareRowToVariantWrite(
	row: TFlightFareRow,
	product: IFlightProduct
): IFlightVariantWrite;
export function mapFareRowToVariantWrite(
	row: TTrainFareRow,
	product: ITrainProduct
): ITrainVariantWrite;
export function mapFareRowToVariantWrite(
	row: TFlightFareRow | TTrainFareRow,
	product: IFlightProduct | ITrainProduct
): IFlightVariantWrite | ITrainVariantWrite {
	const existing = product.variants.find(
		(variant) => variant.id === row.variant_id
	);

	return {
		name: row.name.trim(),
		expenses:
			existing?.expenses ??
			(product.typ === ENUM_SUPPLIER_TYPE.FLIGHT
				? emptyFlightCharge()
				: emptyTrainCharge())
	};
}

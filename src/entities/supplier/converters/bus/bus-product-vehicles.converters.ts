import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusProduct,
	type IBusVariant,
	type IBusVariantWrite,
	type ISupplierFixedCharge,
	type TBusVehicleRow
} from "../../types";

const EMPTY_FIXED_CHARGE = (): ISupplierFixedCharge => ({
	typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

export const mapVehicleRowFromVariant = (
	variant: IBusVariant
): TBusVehicleRow => ({
	[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]: variant.id,
	[ENUM_FORM_BUS_VEHICLES.NAME]: variant.name,
	[ENUM_FORM_BUS_VEHICLES.BODY_TYPE]:
		variant.bodyType ?? ENUM_VEHICLE_BODY_TYPE.BUS,
	[ENUM_FORM_BUS_VEHICLES.PAX]: variant.pax,
	[ENUM_FORM_BUS_VEHICLES.DESCRIPTION]: variant.description ?? undefined
});

export const mapBusVehicleRowToVariantWrite = (
	row: TBusVehicleRow,
	product: IBusProduct
): IBusVariantWrite => {
	const existing = product.variants.find(
		(variant) => variant.id === row[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]
	);

	return {
		name: row[ENUM_FORM_BUS_VEHICLES.NAME],
		bodyType: row[ENUM_FORM_BUS_VEHICLES.BODY_TYPE],
		pax: row[ENUM_FORM_BUS_VEHICLES.PAX] ?? 1,
		description: row[ENUM_FORM_BUS_VEHICLES.DESCRIPTION]?.trim() || null,
		expenses: existing?.expenses ?? EMPTY_FIXED_CHARGE()
	};
};

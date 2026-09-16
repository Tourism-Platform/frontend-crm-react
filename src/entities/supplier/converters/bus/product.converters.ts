import {
	ENUM_BUS_PRICING,
	type ENUM_BUS_PRICING_TYPE,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type IBusProductCreate,
	type IBusVariant,
	type IBusVariantWrite,
	type TBusProductReadBackend,
	type TBusVariantReadBackend,
	type TBusVariantWriteBackend,
	type TCreateBusProductBackend
} from "../../types";
import {
	mapSupplierFixedChargeFromBackend,
	mapSupplierFixedChargeToBackend,
	mapSupplierVariantChargeFromBackend
} from "../supplier-variant-charge.converters";
import { vehicleBodyTypeConverter } from "../vehicle-body.converters";

const emptyToNull = (value: string | null | undefined): string | null => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

export const mapBusVariantFromBackend = (
	variant: TBusVariantReadBackend
): IBusVariant => ({
	id: variant.id ?? "",
	name: variant.name ?? "",
	bodyType: vehicleBodyTypeConverter.from(variant.body_type) ?? null,
	pax: variant.pax ?? null,
	description: variant.description ?? null,
	expenses:
		"charge" in variant
			? mapSupplierFixedChargeFromBackend(variant.charge)
			: null
});

export const mapBusVariantToWrite = (
	data: IBusVariantWrite,
	pricing: ENUM_BUS_PRICING_TYPE
): TBusVariantWriteBackend => {
	const base = {
		name: data.name,
		body_type: vehicleBodyTypeConverter.to(data.bodyType)!,
		pax: data.pax,
		description: emptyToNull(data.description)
	};

	return pricing === ENUM_BUS_PRICING.WHOLE
		? { ...base, typ: "bus", pricing: ENUM_BUS_PRICING.WHOLE }
		: {
				...base,
				typ: "bus",
				pricing: ENUM_BUS_PRICING.PER_VEHICLE,
				charge: mapSupplierFixedChargeToBackend(data.expenses)
			};
};

export const mapBusProductFromBackend = (
	row: TBusProductReadBackend
): IBusProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		supplierName: row.supplier_name ?? null,
		typ: ENUM_SUPPLIER_TYPE.BUS,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		charge:
			spec.pricing === ENUM_BUS_PRICING.WHOLE
				? mapSupplierVariantChargeFromBackend(spec.charge)
				: null,
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.vehicles.map(mapBusVariantFromBackend)
	};
};

export const mapBusProductToCreate = (
	data: IBusProductCreate
): TCreateBusProductBackend => ({
	typ: "bus",
	details: {
		pricing: ENUM_BUS_PRICING.PER_VEHICLE,
		name: data.name
	}
});

import {
	ACTIVITY_VARIANT_CREATE_SCHEMA,
	BUS_VARIANT_CREATE_SCHEMA,
	ENUM_SUPPLIER_TYPE,
	FLIGHT_VARIANT_CREATE_SCHEMA,
	HOTEL_VARIANT_CREATE_SCHEMA,
	TRAIN_VARIANT_CREATE_SCHEMA,
	TRANSFER_VARIANT_CREATE_SCHEMA
} from "@/entities/supplier";

import type { TCreateProductVariantProps, TForm } from "./form.types";

export const CREATE_PRODUCT_VARIANT_NAME_FIELD: TForm = {
	key: "name",
	fieldType: "input",
	label: "form.variants.fields.name.label",
	placeholder: "form.variants.fields.name.placeholder"
};

export const getCreateProductVariantSchema = (
	typ: TCreateProductVariantProps["typ"]
) => {
	switch (typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return HOTEL_VARIANT_CREATE_SCHEMA;
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return TRAIN_VARIANT_CREATE_SCHEMA;
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return FLIGHT_VARIANT_CREATE_SCHEMA;
		case ENUM_SUPPLIER_TYPE.BUS:
			return BUS_VARIANT_CREATE_SCHEMA;
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return TRANSFER_VARIANT_CREATE_SCHEMA;
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return ACTIVITY_VARIANT_CREATE_SCHEMA;
	}
};

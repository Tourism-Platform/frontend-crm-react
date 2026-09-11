import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_SUPPLIER as ENUM_FORM,
	SUPPLIER_TYPE_LABELS
} from "@/entities/supplier";

import type { TForm } from "./form.types";

export const FORM_SUPPLIER_DETAIL_LIST = (): TForm[] => [
	{
		label: "fields.brandName.label",
		placeholder: "fields.brandName.placeholder",
		key: ENUM_FORM.BRAND_NAME,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "fields.legalName.label",
		placeholder: "fields.legalName.placeholder",
		key: ENUM_FORM.LEGAL_NAME,
		fieldType: "input"
	},
	{
		label: "fields.phone.label",
		placeholder: "fields.phone.placeholder",
		key: ENUM_FORM.PHONE,
		fieldType: "phone"
	},
	{
		label: "fields.website.label",
		placeholder: "fields.website.placeholder",
		key: ENUM_FORM.WEBSITE,
		fieldType: "input"
	},
	{
		label: "fields.supplierTypes.label",
		placeholder: "fields.supplierTypes.placeholder",
		key: ENUM_FORM.SUPPLIER_TYPES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(SUPPLIER_TYPE_LABELS),
		className: "col-span-2",
		badgeVariant: "secondary"
	}
];

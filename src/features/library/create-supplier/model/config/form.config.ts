import { ENUM_FORM_SUPPLIER as ENUM_FORM } from "@/entities/supplier";

import type { TForm } from "./form.types";

export const FORM_CREATE_SUPPLIER_LIST = (): TForm[] => [
	{
		label: "create.fields.brandName.label",
		placeholder: "create.fields.brandName.placeholder",
		key: ENUM_FORM.BRAND_NAME,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "create.fields.legalName.label",
		placeholder: "create.fields.legalName.placeholder",
		key: ENUM_FORM.LEGAL_NAME,
		fieldType: "input"
	},
	{
		label: "create.fields.phone.label",
		placeholder: "create.fields.phone.placeholder",
		key: ENUM_FORM.PHONE,
		fieldType: "phone"
	},
	{
		label: "create.fields.website.label",
		placeholder: "create.fields.website.placeholder",
		key: ENUM_FORM.WEBSITE,
		fieldType: "input"
	}
];

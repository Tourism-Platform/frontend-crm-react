import type { HTMLInputTypeAttribute } from "react";
import { z } from "zod";

import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

import type { PRICING_SCHEMA } from "../config";

interface IFormPriceDetailsBase {
	label: TTourEventFlightEditPageKeys;
	key: ENUM_FORM_PRICE_DETAILS_TYPE;
}

type TFormPriceDetailsBaseRequired = IFormPriceDetailsBase & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
};

type TFormPriceDetailsBaseOptional = IFormPriceDetailsBase & {
	fieldType: "date" | "time";
	placeholder?: string;
};
type TFormPriceDetailsBaseSelect = IFormPriceDetailsBase & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: string;
	defaultValue: string;
};

export type TFormPriceDetails =
	| TFormPriceDetailsBaseRequired
	| TFormPriceDetailsBaseOptional
	| TFormPriceDetailsBaseSelect;

export const ENUM_FORM_PRICE_DETAILS = {
	TOTAL_PRICE: "total_price",
	TAXES: "taxes",
	CURRENCY: "currency"
} as const;

export type ENUM_FORM_PRICE_DETAILS_TYPE =
	(typeof ENUM_FORM_PRICE_DETAILS)[keyof typeof ENUM_FORM_PRICE_DETAILS];

export type TPricingSchema = z.infer<typeof PRICING_SCHEMA>;

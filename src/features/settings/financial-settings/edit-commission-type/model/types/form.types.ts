import { z } from "zod";

import type { TFinancialSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { EDIT_COMMISSION_TYPE_SCHEMA } from "../config";

export type TForm = TFormField<
	TFinancialSettingsPageKeys,
	ENUM_FORM_EDIT_COMMISSION_TYPE_TYPE
>;

export const ENUM_FORM_EDIT_COMMISSION_TYPE = {
	CURRENCY: "currency",
	RATE: "rate"
} as const;

export type ENUM_FORM_EDIT_COMMISSION_TYPE_TYPE =
	(typeof ENUM_FORM_EDIT_COMMISSION_TYPE)[keyof typeof ENUM_FORM_EDIT_COMMISSION_TYPE];

export type TEditCommissionTypeSchema = z.infer<
	typeof EDIT_COMMISSION_TYPE_SCHEMA
>;

import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	OPERATOR_PAYMENT_METHOD_LABELS
} from "@/entities/finance/finance-information";

import type { TForm } from "../types/form.types";

export const FORM_EDIT_PAYMENT_ROUTE_COMMON_LIST = (): TForm[] => [
	{
		label: "payment_settings.form.modal.fields.method_type.label",
		placeholder:
			"payment_settings.form.modal.fields.method_type.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(OPERATOR_PAYMENT_METHOD_LABELS)
	},
	{
		label: "payment_settings.form.modal.fields.internal_label.label",
		placeholder:
			"payment_settings.form.modal.fields.internal_label.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.INTERNAL_LABEL,
		fieldType: "input"
	}
];

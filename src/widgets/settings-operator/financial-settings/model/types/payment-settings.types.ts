import type { TFinancialSettingsPageOperatorKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_OPERATOR_GENERAL_INFO_TYPE,
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS_TYPE,
	ENUM_FORM_OPERATOR_TAX_SETTINGS_TYPE
} from "@/entities/finance";

export type TForm = TFormField<
	TFinancialSettingsPageOperatorKeys,
	| ENUM_FORM_OPERATOR_PAYMENT_SETTINGS_TYPE
	| ENUM_FORM_OPERATOR_GENERAL_INFO_TYPE
	| ENUM_FORM_OPERATOR_TAX_SETTINGS_TYPE
>;

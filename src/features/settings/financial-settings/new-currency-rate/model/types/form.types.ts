import type { TFinancialSettingsPageOperatorKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import { type ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE_TYPE } from "@/entities/commission";

export type TForm = TFormField<
	TFinancialSettingsPageOperatorKeys,
	ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE_TYPE
>;

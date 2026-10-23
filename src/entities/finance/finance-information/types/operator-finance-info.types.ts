import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { TOperatorGeneralInfoSchema } from "./operator-general-info.types";
import type { TOperatorTaxSettingsSchema } from "./operator-tax-settings.types";

export type TOperatorFinanceInfo = TOperatorGeneralInfoSchema &
	TOperatorTaxSettingsSchema & {
		/** Валюты, в которых работает оператор; default_currency обязан входить */
		acceptedCurrencies: ENUM_CURRENCY_OPTIONS_TYPE[];
	};

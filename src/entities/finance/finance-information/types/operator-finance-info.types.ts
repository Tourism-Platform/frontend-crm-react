import type { TOperatorGeneralInfoSchema } from "./operator-general-info.types";
import type { TOperatorTaxSettingsSchema } from "./operator-tax-settings.types";

export type TOperatorFinanceInfo = TOperatorGeneralInfoSchema &
	TOperatorTaxSettingsSchema;

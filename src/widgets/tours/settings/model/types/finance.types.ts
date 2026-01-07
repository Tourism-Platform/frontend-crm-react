import type { TTourSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_SETTINGS_FINANCE_FORM_TYPE } from "@/entities/tour";

export type TFinanceForm = TFormField<
	TTourSettingsPageKeys,
	ENUM_SETTINGS_FINANCE_FORM_TYPE
>;

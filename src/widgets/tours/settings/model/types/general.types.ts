import type { TTourSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import { type ENUM_SETTINGS_GENERAL_FORM_TYPE } from "@/entities/tour";

export type TGeneralForm = TFormField<
	TTourSettingsPageKeys,
	ENUM_SETTINGS_GENERAL_FORM_TYPE
>;

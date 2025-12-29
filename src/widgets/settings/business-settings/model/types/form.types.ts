import type { TBusinessSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import { type ENUM_FORM_CHANGE_BUSINESS_TYPE } from "@/entities/user";

export type TForm = TFormField<
	TBusinessSettingsPageKeys,
	ENUM_FORM_CHANGE_BUSINESS_TYPE
>;

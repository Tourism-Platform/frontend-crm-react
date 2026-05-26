import type { TAccountSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_ACCOUNT_TYPE } from "@/entities/user";

export type TForm = TFormField<
	TAccountSettingsPageKeys,
	ENUM_FORM_ACCOUNT_TYPE
>;

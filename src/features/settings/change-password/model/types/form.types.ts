import type { TSecurityPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_CHANGE_PASSWORD_TYPE } from "@/entities/user";

export type TForm = TFormField<
	TSecurityPageKeys,
	ENUM_FORM_CHANGE_PASSWORD_TYPE
>;

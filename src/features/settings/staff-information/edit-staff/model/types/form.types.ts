import type { TStaffInformationPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_EDIT_STAFF_TYPE } from "@/entities/staff";

export type TForm = TFormField<
	TStaffInformationPageKeys,
	ENUM_FORM_EDIT_STAFF_TYPE
>;

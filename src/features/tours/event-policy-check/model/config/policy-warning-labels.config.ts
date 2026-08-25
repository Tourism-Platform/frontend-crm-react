import type { TTourCommonEventsKeys } from "@/shared/config";

import {
	ENUM_SUPPLIER_POLICY_WARNING,
	type ENUM_SUPPLIER_POLICY_WARNING_TYPE
} from "@/entities/tour";

export const POLICY_WARNING_TITLE_KEYS: Record<
	ENUM_SUPPLIER_POLICY_WARNING_TYPE,
	TTourCommonEventsKeys
> = {
	[ENUM_SUPPLIER_POLICY_WARNING.EARLY_CHECK_IN]:
		"policy_check.codes.early_check_in.title",
	[ENUM_SUPPLIER_POLICY_WARNING.LATE_CHECK_OUT]:
		"policy_check.codes.late_check_out.title",
	[ENUM_SUPPLIER_POLICY_WARNING.SUPPLIER_TYPE_MISMATCH]:
		"policy_check.codes.supplier_type_mismatch.title"
};

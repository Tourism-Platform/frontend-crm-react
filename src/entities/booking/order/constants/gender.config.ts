import { type TOptionsKeys } from "@/shared/config";

import { ENUM_GENDER_OPTIONS, type ENUM_GENDER_OPTIONS_TYPE } from "../types";

export const GENDER_LABELS: Record<ENUM_GENDER_OPTIONS_TYPE, TOptionsKeys> = {
	[ENUM_GENDER_OPTIONS.MALE]: "gender.male",
	[ENUM_GENDER_OPTIONS.FEMALE]: "gender.female"
};

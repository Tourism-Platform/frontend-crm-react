import { type TOrderIdPageKeys } from "@/shared/config";
import { valueToLabel } from "@/shared/utils";

import { ENUM_GENDER_OPTIONS, type ENUM_GENDER_OPTIONS_TYPE } from "../types";

export const GENDER_LABELS: Record<ENUM_GENDER_OPTIONS_TYPE, TOrderIdPageKeys> =
	{
		[ENUM_GENDER_OPTIONS.MALE]: "pax_information.table.genders.male",
		[ENUM_GENDER_OPTIONS.FEMALE]: "pax_information.table.genders.female"
	};

export const GENDER_OPTIONS = valueToLabel(GENDER_LABELS);

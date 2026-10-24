import type { TFileMetadata } from "@/shared/hooks";

import type { ENUM_GENDER_OPTIONS_TYPE } from "./gender.types";

export interface ITravellerPaxInput {
	pax_id?: string;
	first_name?: string;
	last_name?: string;
	gender?: ENUM_GENDER_OPTIONS_TYPE;
	nationality?: string;
	date_of_birth?: Date | string;
	passport_number?: string;
	passport_expiry?: Date | string;
	note?: string;
	file?: TFileMetadata[];
}

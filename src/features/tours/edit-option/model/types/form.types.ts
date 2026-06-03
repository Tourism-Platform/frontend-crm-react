import type { TTourItineraryPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import { type ENUM_FORM_TOUR_OPTION_TYPE } from "@/entities/tour";

export type TForm = TFormField<
	TTourItineraryPageKeys,
	ENUM_FORM_TOUR_OPTION_TYPE
>;

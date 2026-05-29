import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_PRICE_DETAILS_TYPE } from "@/entities/tour";

export type TForm = TFormField<
	TTourEventFlightEditPageKeys,
	ENUM_FORM_PRICE_DETAILS_TYPE
>;

import { z } from "zod";

import { ENUM_FORM_SEASONALITY } from "../types";

export const SEASONALITY_SCHEMA = z.object({
	[ENUM_FORM_SEASONALITY.COMMISSION]: z.number().min(0).max(100),
	[ENUM_FORM_SEASONALITY.VALID_FROM]: z.string().min(1),
	[ENUM_FORM_SEASONALITY.VALID_UNTIL]: z.string().min(1)
});

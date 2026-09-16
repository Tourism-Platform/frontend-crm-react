import { z } from "zod";

import { ENUM_FORM_ATTACH_SUPPLIER } from "./attach-supplier.types";

export const ATTACH_SUPPLIER_PICKER_SCHEMA = z.object({
	[ENUM_FORM_ATTACH_SUPPLIER.SUPPLIER_ID]: z.string().uuid()
});

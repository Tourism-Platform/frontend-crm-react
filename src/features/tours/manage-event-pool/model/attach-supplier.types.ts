import { z } from "zod";

import type { ATTACH_SUPPLIER_PICKER_SCHEMA } from "./attach-supplier.schema";

export const ENUM_FORM_ATTACH_SUPPLIER = {
	SUPPLIER_ID: "supplierId"
} as const;

export type ENUM_FORM_ATTACH_SUPPLIER_TYPE =
	(typeof ENUM_FORM_ATTACH_SUPPLIER)[keyof typeof ENUM_FORM_ATTACH_SUPPLIER];

export type TAttachSupplierPickerSchema = z.infer<
	typeof ATTACH_SUPPLIER_PICKER_SCHEMA
>;

import type { TSuppliersPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_SUPPLIER_TYPE } from "@/entities/supplier";

export type TForm = TFormField<TSuppliersPageKeys, ENUM_FORM_SUPPLIER_TYPE>;

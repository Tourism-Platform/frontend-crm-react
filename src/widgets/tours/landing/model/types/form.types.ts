import type { TLandingPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_LANDING_TYPE } from "@/entities/tour";

export type TForm = TFormField<TLandingPageKeys, ENUM_FORM_LANDING_TYPE>;

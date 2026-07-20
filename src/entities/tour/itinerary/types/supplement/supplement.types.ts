import { z } from "zod";

import type { SUPPLEMENT_EDIT_SCHEMA } from "../../schema";

export type TSupplementEditSchema = z.infer<typeof SUPPLEMENT_EDIT_SCHEMA>;

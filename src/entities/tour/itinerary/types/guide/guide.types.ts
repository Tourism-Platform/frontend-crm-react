import { z } from "zod";

import type { GUIDE_EDIT_SCHEMA } from "../../schema";

export type TGuideEditSchema = z.infer<typeof GUIDE_EDIT_SCHEMA>;

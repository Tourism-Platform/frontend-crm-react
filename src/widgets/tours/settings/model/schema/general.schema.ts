import { z } from "zod";

import { TOUR_TYPE_OPTIONS } from "@/shared/config";

const TOUR_TYPE_VALUES = TOUR_TYPE_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const GENERAL_FORM_SCHEMA = z.object({
	tourTitle: z.string().min(3).max(100),
	tourType: z.enum(TOUR_TYPE_VALUES),
	groupSize: z.number().min(1),
	duration: z.object({
		from: z.number().min(1),
		to: z.number().min(1)
	}),
	ageRequires: z.object({
		from: z.number().min(0),
		to: z.number().min(0)
	}),
	tourCategories: z.array(z.string())
});

export type TGeneralFormSchema = z.infer<typeof GENERAL_FORM_SCHEMA>;

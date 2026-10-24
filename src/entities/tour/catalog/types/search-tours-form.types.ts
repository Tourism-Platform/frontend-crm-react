import type { z } from "zod";

import type {
	createSearchToursSchema,
	dateRangeSchema,
	locationSuggestSchema
} from "../schema/search-tours.schema";

export type TDateRange = z.infer<typeof dateRangeSchema>;

export type TLocationSuggestFormValue = z.infer<typeof locationSuggestSchema>;

export type TSearchTours = z.infer<ReturnType<typeof createSearchToursSchema>>;

export type TSearchToursSchema = TSearchTours;

import { ENUM_API_TAGS } from "@/shared/api";

export const getTourStatsTag = (tourId: string) => ({
	type: ENUM_API_TAGS.TOURS,
	id: `STATS_${tourId}`
});

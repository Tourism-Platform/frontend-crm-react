import { type IQueryTab } from "@/shared/ui";

import { FullItinerary, Pricing } from "../../ui/option";
import { ENUM_PREVIEW_OPTION_TAB, type TPreviewOptionTabType } from "../types";

export const PREVIEW_OPTION_TABS_LIST: IQueryTab<
	TPreviewOptionTabType,
	"preview_option_page"
>[] = [
	{
		type: ENUM_PREVIEW_OPTION_TAB.FULL_ITINERARY,
		label: "tabs.full_itinerary",
		slot: FullItinerary
	},
	{
		type: ENUM_PREVIEW_OPTION_TAB.PRICING,
		label: "tabs.pricing",
		slot: Pricing
	}
] as IQueryTab<TPreviewOptionTabType, "preview_option_page">[];

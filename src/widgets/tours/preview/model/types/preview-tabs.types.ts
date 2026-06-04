import type { FC } from "react";

import type {
	TPreviewOptionPageKeys,
	TPreviewTourPageKeys
} from "@/shared/config";

import type {
	IOptionDetail,
	IPreviewTourData
} from "@/entities/tour/preview-tour";

export const ENUM_PREVIEW_TOUR_TAB = {
	TOUR_INFORMATION: "tour-information"
} as const;

export const ENUM_PREVIEW_OPTION_TAB = {
	FULL_ITINERARY: "full-itinerary",
	PRICING: "pricing"
} as const;

export type TPreviewTourTabType =
	(typeof ENUM_PREVIEW_TOUR_TAB)[keyof typeof ENUM_PREVIEW_TOUR_TAB];

export type TPreviewOptionTabType =
	(typeof ENUM_PREVIEW_OPTION_TAB)[keyof typeof ENUM_PREVIEW_OPTION_TAB];

export interface IPreviewOptionTabSlotProps {
	optionData?: IOptionDetail;
}

export interface IPreviewTourInformationSlotProps {
	data?: IPreviewTourData;
}

export interface IPreviewOptionTab {
	type: TPreviewOptionTabType;
	label: TPreviewOptionPageKeys;
	slot: FC<IPreviewOptionTabSlotProps>;
}

export type TPreviewTourSingleOptionTab =
	| {
		type: typeof ENUM_PREVIEW_TOUR_TAB.TOUR_INFORMATION;
		label: TPreviewTourPageKeys;
		slot: FC<IPreviewTourInformationSlotProps>;
	}
	| {
		type: TPreviewOptionTabType;
		label: TPreviewTourPageKeys;
		slot: FC<IPreviewOptionTabSlotProps>;
	};

import type {
	GuideByLanguageCategoryOutput,
	GuideDetailsOutput
} from "@/shared/api";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuidesSchema
} from "../../types";

import { guideTypeMapper } from "./guide-type.converters";

type TGuidesList = TGuidesSchema[typeof ENUM_FORM_GUIDES.GUIDES_LIST];

export const getDefaultGuidesList = (): TGuidesList => [
	{
		[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
		[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
	}
];

export const mapGuidesFromBackend = (
	details?: GuideDetailsOutput | null
): TGuidesSchema => ({
	[ENUM_FORM_GUIDES.GUIDES_LIST]: [
		{
			[ENUM_FORM_GUIDES.GUIDE_TYPE]:
				guideTypeMapper.from(details?.typ) ?? ENUM_GUIDE_TYPE.LOCAL,
			[ENUM_FORM_GUIDES.DURATION_DAYS]: details?.duration ?? 1
		}
	]
});

export const mapGuidesDurationToBackend = (
	guidesList: TGuidesList = []
): number | null => {
	const duration = guidesList[0]?.[ENUM_FORM_GUIDES.DURATION_DAYS];
	return duration != null && Number.isFinite(duration) ? duration : null;
};

export const mapGuidesTypeToBackend = (
	guidesList: TGuidesList = []
): GuideDetailsOutput["typ"] | undefined => {
	const guideType = guidesList[0]?.[ENUM_FORM_GUIDES.GUIDE_TYPE];
	return guideTypeMapper.to(guideType);
};

export type { GuideByLanguageCategoryOutput };

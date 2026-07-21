import type {
	GuideByLanguageCategoryOutput,
	GuideDetailsOutput
} from "@/shared/api";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuidesSchema
} from "../../types";

type TGuidesList = TGuidesSchema[typeof ENUM_FORM_GUIDES.GUIDES_LIST];

export const getDefaultGuidesList = (): TGuidesList => [
	{
		[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
		[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
	}
];

/** TODO: backend has no guide_type — restored as single LOCAL block on load. */
export const mapGuidesFromBackend = (
	details?: GuideDetailsOutput | null
): TGuidesSchema => ({
	[ENUM_FORM_GUIDES.GUIDES_LIST]: [
		{
			[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
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

export type { GuideByLanguageCategoryOutput };

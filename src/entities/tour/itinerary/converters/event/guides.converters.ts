import { DEFAULT_GUIDE_UP_TO_PAX } from "../../config";
import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuideByLanguageCategoryBackend,
	type TGuideDetailsBackend,
	type TGuideTypeTierBackend,
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
	details?: TGuideDetailsBackend | null
): TGuidesSchema => ({
	[ENUM_FORM_GUIDES.GUIDES_LIST]: [
		{
			[ENUM_FORM_GUIDES.GUIDE_TYPE]:
				guideTypeMapper.from(details?.spec?.typ_tiers?.[0]?.typ) ??
				ENUM_GUIDE_TYPE.LOCAL,
			[ENUM_FORM_GUIDES.DURATION_DAYS]: details?.plan?.duration ?? 1
		}
	]
});

export const mapGuidesDurationToBackend = (
	guidesList: TGuidesList = []
): number | null => {
	const duration = guidesList[0]?.[ENUM_FORM_GUIDES.DURATION_DAYS];
	return duration != null && Number.isFinite(duration) ? duration : null;
};

export const mapGuidesTypTiersToBackend = (
	guidesList: TGuidesList = []
): TGuideTypeTierBackend[] | undefined => {
	const guideType = guidesList[0]?.[ENUM_FORM_GUIDES.GUIDE_TYPE];
	const typ = guideTypeMapper.to(guideType);
	if (!typ) return undefined;

	return [
		{
			up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
			typ
		}
	];
};

export type { TGuideByLanguageCategoryBackend };

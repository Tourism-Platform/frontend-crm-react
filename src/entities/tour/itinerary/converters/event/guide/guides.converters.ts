import { DEFAULT_GUIDE_UP_TO_PAX } from "../../../config";
import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuideByLanguageCategoryBackend,
	type TGuideDetailsBackend,
	type TGuideTypeTierBackend,
	type TGuidesSchema
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";

import { guideTypeMapper } from "./guide-type.converters";

type TGuidesList = TGuidesSchema[typeof ENUM_FORM_GUIDES.GUIDES_LIST];

export const getDefaultGuidesList = (): TGuidesList => [
	{
		[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
		[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
	}
];

export const mapGuidesFromBackend = (
	details?: TGuideDetailsBackend | null,
	supplyId?: string | null
): TGuidesSchema => {
	const spec = getPoolMember(details, supplyId)?.spec;
	const duration = details?.plan?.duration ?? 1;

	return {
		[ENUM_FORM_GUIDES.GUIDES_LIST]: (spec?.typ_tiers ?? []).map((tier) => ({
			[ENUM_FORM_GUIDES.GUIDE_TYPE]:
				guideTypeMapper.from(tier.typ) ?? ENUM_GUIDE_TYPE.LOCAL,
			[ENUM_FORM_GUIDES.DURATION_DAYS]: duration
		}))
	};
};

export const guidesDurationFromList = (
	guidesList: TGuidesList = []
): number | null => {
	const duration = guidesList[0]?.[ENUM_FORM_GUIDES.DURATION_DAYS];
	return duration != null && Number.isFinite(duration) ? duration : null;
};

export const mapGuidesDurationToBackend = guidesDurationFromList;

export const mapGuidesTypTiersToBackend = (
	guidesList: TGuidesList = [],
	currentTiers?: TGuideTypeTierBackend[]
): TGuideTypeTierBackend[] | undefined => {
	const tiers = guidesList.flatMap((row, index) => {
		const typ = guideTypeMapper.to(row[ENUM_FORM_GUIDES.GUIDE_TYPE]);
		if (!typ) return [];
		return [
			{
				up_to_pax:
					currentTiers?.[index]?.up_to_pax ?? DEFAULT_GUIDE_UP_TO_PAX,
				typ
			}
		];
	});
	return tiers.length ? tiers : undefined;
};

export type { TGuideByLanguageCategoryBackend };

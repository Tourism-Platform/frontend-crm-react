import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuideDetailsBackend,
	type TGuideTypeTierBackend,
	type TGuidesSchema
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";

import { guideTypeMapper } from "./guide-type.converters";

type TGuideTypTiers = TGuidesSchema[typeof ENUM_FORM_GUIDES.TYP_TIERS];

export const mapGuidesFromBackend = (
	details?: TGuideDetailsBackend | null,
	supplyId?: string | null
): TGuidesSchema => {
	const spec = getPoolMember(details, supplyId)?.spec;

	return {
		// A new guide starts at one day; a stored plan without one stays empty.
		[ENUM_FORM_GUIDES.DURATION_DAYS]: details
			? (details.plan?.duration ?? null)
			: 1,
		[ENUM_FORM_GUIDES.TYP_TIERS]: (spec?.typ_tiers ?? []).map((tier) => ({
			[ENUM_FORM_GUIDES.GUIDE_TYPE]:
				guideTypeMapper.from(tier.typ) ?? ENUM_GUIDE_TYPE.LOCAL,
			[ENUM_FORM_GUIDES.UP_TO_PAX]: tier.up_to_pax
		}))
	};
};

export const mapGuidesTypTiersToBackend = (
	typTiers: TGuideTypTiers = []
): TGuideTypeTierBackend[] =>
	typTiers.flatMap((row) => {
		const typ = guideTypeMapper.to(row[ENUM_FORM_GUIDES.GUIDE_TYPE]);
		const upToPax = row[ENUM_FORM_GUIDES.UP_TO_PAX];
		if (!typ || upToPax == null) return [];
		return [{ typ, up_to_pax: upToPax }];
	});

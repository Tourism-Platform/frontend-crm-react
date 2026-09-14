import type { GuideDetailsWrite } from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "../../types";
import {
	ENUM_GUIDE_FORM_SECTION,
	type TGuideEditSchema,
	type TGuideSingleEventBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import {
	mapGuideCategoriesToBackend,
	mapGuidePricingFromBackend
} from "./guide-pricing.converters";
import {
	mapGuidesDurationToBackend,
	mapGuidesFromBackend,
	mapGuidesTypTiersToBackend
} from "./guides.converters";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";

type TGuideEvent = TGuideSingleEventBackend;

export const mapGuideEventToForm = (
	data: TTourEventBackendResponce
): TGuideEditSchema => {
	const event = data?.event as TGuideEvent;
	const details = event?.details;
	const guides = mapGuidesFromBackend(details);

	return {
		[ENUM_GUIDE_FORM_SECTION.NAME]: event?.name || "",
		[ENUM_GUIDE_FORM_SECTION.DAY]: event.day,
		[ENUM_GUIDE_FORM_SECTION.POSITION]: event.position,
		[ENUM_GUIDE_FORM_SECTION.GUIDES]: guides,
		[ENUM_GUIDE_FORM_SECTION.PRICING]: applyEventPackageIdToPricing(
			mapGuidePricingFromBackend(details, guides.guides_list),
			event.package_id
		)
	};
};

export const mapGuideFormToUpdate = (
	frontend: Partial<TGuideEditSchema>
): TTourEventUpdateBackend => {
	const guidesList = frontend.guides?.guides_list;
	const pricing = frontend.pricing;
	const categories =
		pricing !== undefined
			? mapGuideCategoriesToBackend(pricing, guidesList?.length ?? 0)
			: undefined;

	// Contract 3.1: `details` is required on a guide update — the duration
	// is the `plan`, the guide's own spec sits inside the inline `supply`.
	// Empty categories stay omitted — [] would wipe prices on the backend.
	const details: GuideDetailsWrite = {
		...(guidesList !== undefined && {
			plan: { duration: mapGuidesDurationToBackend(guidesList) }
		}),
		supply: {
			source: "inline",
			spec: {
				// Backend supports a single guide block — first item wins.
				...(guidesList !== undefined && {
					typ_tiers: mapGuidesTypTiersToBackend(guidesList)
				}),
				...(categories !== undefined &&
					categories.length > 0 && { categories })
			}
		}
	};

	return {
		typ: ENUM_EVENT_BACKEND.GUIDE,
		package_id: mapEventPackageIdToBackend(frontend.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		details
	};
};

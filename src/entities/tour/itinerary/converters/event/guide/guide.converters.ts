import type { GuideDetailsWrite } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import { ENUM_EVENT_BACKEND } from "../../../types";
import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_GUIDE_FORM_SECTION,
	type TEventDetailsBackend,
	type TGuideEditSchema,
	type TGuideSingleEventBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../../types";
import { mapInlinePoolWrite } from "../common/details-read-to-write.converters";
import { getPoolMember } from "../common/event-pool.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "../common/package-id.helpers";

import {
	mapGuideCategoriesToBackend,
	mapGuidePricingFromBackend
} from "./guide-pricing.converters";
import {
	mapGuidesDurationToBackend,
	mapGuidesFromBackend,
	mapGuidesTypTiersToBackend
} from "./guides.converters";

type TGuideEvent = TGuideSingleEventBackend;

export const mapGuideEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TGuideEditSchema => {
	const event = data?.event as TGuideEvent;
	const details = event?.details;
	const supplyId = getPoolMember(details, selectedSupplyId)?.id;
	const guides = mapGuidesFromBackend(details, selectedSupplyId);

	return {
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		[ENUM_GUIDE_FORM_SECTION.NAME]: event?.name || "",
		[ENUM_GUIDE_FORM_SECTION.DAY]: event.day,
		[ENUM_GUIDE_FORM_SECTION.POSITION]: event.position,
		[ENUM_GUIDE_FORM_SECTION.GUIDES]: guides,
		[ENUM_GUIDE_FORM_SECTION.PRICING]: applyEventPackageIdToPricing(
			mapGuidePricingFromBackend(
				details,
				guides.guides_list,
				selectedSupplyId
			),
			event.package_id
		)
	};
};

export const mapGuideFormToUpdate = (
	frontend: Partial<TGuideEditSchema>,
	_language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
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
	const currentSpec = getPoolMember(currentDetails)?.spec;
	const currentTiers =
		currentSpec && "typ_tiers" in currentSpec
			? currentSpec.typ_tiers
			: undefined;

	const inlineSpec = {
		...(guidesList !== undefined && {
			typ_tiers: mapGuidesTypTiersToBackend(guidesList, currentTiers)
		}),
		...(categories !== undefined && categories.length > 0 && { categories })
	};

	const details: GuideDetailsWrite = {
		...(guidesList !== undefined && {
			plan: { duration: mapGuidesDurationToBackend(guidesList) }
		}),
		pool: mapInlinePoolWrite(
			ENUM_EVENT_BACKEND.GUIDE,
			currentDetails,
			undefined,
			{ source: "inline", spec: inlineSpec }
		) as GuideDetailsWrite["pool"]
	};

	return {
		typ: ENUM_EVENT_BACKEND.GUIDE,
		package_id: mapEventPackageIdToBackend(frontend.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		details
	};
};

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_FORM_SECTION,
	type TEventDetailsBackend,
	type TGuideDetailsBackend,
	type TGuideDetailsWriteBackend,
	type TGuideEditSchema,
	type TGuideSingleEventBackend,
	type TGuideSpecInputBackend,
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

	return {
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		[ENUM_GUIDE_FORM_SECTION.NAME]: event?.name || "",
		[ENUM_GUIDE_FORM_SECTION.DAY]: event.day,
		[ENUM_GUIDE_FORM_SECTION.POSITION]: event.position,
		[ENUM_GUIDE_FORM_SECTION.GUIDES]: mapGuidesFromBackend(
			details,
			selectedSupplyId
		),
		[ENUM_GUIDE_FORM_SECTION.PRICING]: applyEventPackageIdToPricing(
			mapGuidePricingFromBackend(details, selectedSupplyId),
			event.package_id
		)
	};
};

export const mapGuideFormToUpdate = (
	frontend: Partial<TGuideEditSchema>,
	_language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const guides = frontend.guides;
	const pricing = frontend.pricing;
	const supplyId = frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID];

	// Contract 3.1: `details` is required on a guide update — the duration
	// is the `plan`, the guide's own spec sits inside the inline `supply`.
	// The member spec is replaced whole: what the form does not hold is
	// echoed from the member being edited.
	const currentSpec = getPoolMember(
		currentDetails as TGuideDetailsBackend | undefined,
		supplyId
	)?.spec;

	const inlineSpec: TGuideSpecInputBackend = {
		name: currentSpec?.name ?? null,
		typ_tiers:
			guides !== undefined
				? mapGuidesTypTiersToBackend(guides[ENUM_FORM_GUIDES.TYP_TIERS])
				: (currentSpec?.typ_tiers ?? []),
		categories:
			pricing !== undefined
				? mapGuideCategoriesToBackend(pricing)
				: (currentSpec?.categories ?? [])
	};

	const details: TGuideDetailsWriteBackend = {
		...(guides !== undefined && {
			plan: { duration: guides[ENUM_FORM_GUIDES.DURATION_DAYS] }
		}),
		pool: mapInlinePoolWrite(
			ENUM_EVENT_BACKEND.GUIDE,
			currentDetails,
			supplyId,
			{ source: "inline", spec: inlineSpec }
		) as TGuideDetailsWriteBackend["pool"]
	};

	return {
		typ: ENUM_EVENT_BACKEND.GUIDE,
		package_id: mapEventPackageIdToBackend(frontend.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		details
	};
};

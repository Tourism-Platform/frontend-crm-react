import type { SupplementaryDetailsWrite } from "@/shared/api";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_SUPPLEMENT_FORM_SECTION as ENUM_FORM_SECTION,
	type TEventDetailsBackend,
	type TSupplementEditSchema,
	type TSupplementarySingleEventBackend,
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
	mapItemsAndPricingToBackend,
	mapItemsFromBackend,
	mapPricingFromBackend
} from "./supplementary-pricing.converters";

type TSupplementaryEvent = TSupplementarySingleEventBackend;

export const mapSupplementaryEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TSupplementEditSchema => {
	const event = data?.event as TSupplementaryEvent;
	// Contract 6: supplementary lines live on the pool member `spec.item`.
	const member = getPoolMember(event?.details, selectedSupplyId);
	const backendItems = member?.spec?.item;

	return {
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: member?.id,
		[ENUM_FORM_SECTION.NAME]: event?.name || "",
		[ENUM_FORM_SECTION.DESCRIPTION]: event?.description || "",
		[ENUM_FORM_SECTION.DAY]: event.day,
		[ENUM_FORM_SECTION.POSITION]: event.position,
		[ENUM_FORM_SECTION.ITEMS]: mapItemsFromBackend(backendItems),
		[ENUM_FORM_SECTION.PRICING]: applyEventPackageIdToPricing(
			mapPricingFromBackend(backendItems),
			event.package_id
		)
	};
};

export const mapSupplementaryFormToUpdate = (
	frontend: Partial<TSupplementEditSchema>,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const itemsList = frontend.items?.items;
	const pricing = frontend.pricing;
	const hasSpec = itemsList !== undefined || pricing !== undefined;

	// Contract 3.1: `details` is required on a supplementary update — the
	// lines sit inside the inline supply's spec. When the form states no
	// items at all the spec's `item` stays omitted rather than wiping the
	// backend's list with [].
	const inlineSpec = {
		...(hasSpec && {
			item: mapItemsAndPricingToBackend(itemsList, pricing)
		})
	};

	const details: SupplementaryDetailsWrite = {
		pool: mapInlinePoolWrite(
			ENUM_EVENT_BACKEND.SUPPLEMENTARY,
			currentDetails,
			undefined,
			{ source: "inline", spec: inlineSpec }
		) as SupplementaryDetailsWrite["pool"]
	};

	return {
		typ: ENUM_EVENT_BACKEND.SUPPLEMENTARY,
		package_id: mapEventPackageIdToBackend(frontend.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(frontend.description !== undefined && {
			description: frontend.description || null
		}),
		details
	};
};

export type TSupplementaryTourEventResponse = TTourEventBackendResponce;

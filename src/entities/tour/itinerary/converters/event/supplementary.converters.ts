import type {
	SupplementarySingleEventOutput,
	TourEventResponse
} from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "../../types";
import type {
	TSupplementEditSchema,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../types";
import { ENUM_SUPPLEMENT_FORM_SECTION as ENUM_FORM_SECTION } from "../../types";

import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";
import {
	mapItemsAndPricingToBackend,
	mapItemsFromBackend,
	mapPricingFromBackend
} from "./supplementary-pricing.converters";

type TSupplementaryEvent = SupplementarySingleEventOutput;

export const mapSupplementaryEventToForm = (
	data: TTourEventBackendResponce
): TSupplementEditSchema => {
	const event = data?.event as TSupplementaryEvent;
	const backendItems = event?.details?.item;

	return {
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
	frontend: Partial<TSupplementEditSchema>
): TTourEventUpdateBackend => {
	const itemsList = frontend.items?.items;
	const pricing = frontend.pricing;
	const hasDetails = itemsList !== undefined || pricing !== undefined;

	return {
		typ: ENUM_EVENT_BACKEND.SUPPLEMENTARY,
		package_id: mapEventPackageIdToBackend(frontend.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(frontend.description !== undefined && {
			description: frontend.description || null
		}),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		...(hasDetails && {
			details: {
				item: mapItemsAndPricingToBackend(itemsList, pricing)
			}
		})
	};
};

// keep TourEventResponse reference for type clarity in call sites
export type TSupplementaryTourEventResponse = TourEventResponse;

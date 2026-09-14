import type { SupplementaryDetailsWrite } from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "../../types";
import type {
	TSupplementEditSchema,
	TSupplementarySingleEventBackend,
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

type TSupplementaryEvent = TSupplementarySingleEventBackend;

export const mapSupplementaryEventToForm = (
	data: TTourEventBackendResponce
): TSupplementEditSchema => {
	const event = data?.event as TSupplementaryEvent;
	// Contract 3.1: supplementary lines live on `details.spec.item`.
	const backendItems = event?.details?.spec?.item;

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
	const hasSpec = itemsList !== undefined || pricing !== undefined;

	// Contract 3.1: `details` is required on a supplementary update — the
	// lines sit inside the inline supply's spec. When the form states no
	// items at all the spec's `item` stays omitted rather than wiping the
	// backend's list with [].
	const details: SupplementaryDetailsWrite = {
		supply: {
			source: "inline",
			spec: {
				...(hasSpec && {
					item: mapItemsAndPricingToBackend(itemsList, pricing)
				})
			}
		}
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

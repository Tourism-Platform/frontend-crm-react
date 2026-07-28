import type { GuideEventReadOutput } from "@/shared/api";

import {
	ENUM_GUIDE_FORM_SECTION,
	type TGuideEditSchema,
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
	mapGuidesTypeToBackend
} from "./guides.converters";

type TGuideEvent = GuideEventReadOutput;

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
		[ENUM_GUIDE_FORM_SECTION.PRICING]: mapGuidePricingFromBackend(
			details,
			guides.guides_list
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
	const hasDetails =
		guidesList !== undefined ||
		(categories !== undefined && categories.length > 0);

	return {
		typ: "8",
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		...(hasDetails && {
			details: {
				// Backend supports a single guide block — first item wins.
				...(guidesList !== undefined && {
					typ: mapGuidesTypeToBackend(guidesList)
				}),
				...(guidesList !== undefined && {
					duration: mapGuidesDurationToBackend(guidesList)
				}),
				// Omit empty categories — [] would wipe prices on backend
				...(categories !== undefined &&
					categories.length > 0 && { categories })
			}
		})
	};
};

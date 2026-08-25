import {
	type ActivitySingleEventOutput,
	ActivityType,
	LanguageCode
} from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_ACTIVITY_TYPE,
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ACTIVITY,
	type TActivityEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import {
	mapMenuFromBackend,
	mapMenuToBackend
} from "./activity-menu.converters";
import {
	mapActivityPricingFromBackend,
	mapActivityPricingToBackend
} from "./activity-pricing.converters";
import { activityTypeMapper } from "./activity-type.converters";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";

const normalizeActivityDetailsTyp = (
	detailsTyp: string | null | undefined
): ActivityType | null | undefined => {
	if (detailsTyp === "food") {
		return ActivityType.Food;
	}
	return detailsTyp as ActivityType | null | undefined;
};

export const mapActivityEventToForm = (
	data: TTourEventBackendResponce
): TActivityEditSchema => {
	const event = data?.event as ActivitySingleEventOutput;
	const details = event?.details;
	const detailsTyp = details?.typ;
	const activityTyp = normalizeActivityDetailsTyp(detailsTyp);
	const isFood = detailsTyp === "food";

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			activity_subtype: activityTypeMapper.from(activityTyp),
			activity_start_time: event.details?.start_time?.time || "",
			activity_start_timezone: String(
				event.details?.start_time?.timezone ?? getDeviceUtcOffset()
			),
			activity_end_time: event.details?.end_time?.time || "",
			activity_end_timezone: String(
				event.details?.end_time?.timezone ?? getDeviceUtcOffset()
			),
			location: mapBackendLocationToGeoForm(event.details?.location),
			[ENUM_FORM_ACTIVITY.MENU]: isFood
				? mapMenuFromBackend(
						details && "menu" in details ? details.menu : null
					)
				: []
		},
		pricing: applyEventPackageIdToPricing(
			mapActivityPricingFromBackend(event.details),
			event.package_id
		)
	};
};

export const mapActivityFormToUpdate = (
	frontend: Partial<TActivityEditSchema>,
	lang: LanguageCode = LanguageCode.En
): TTourEventUpdateBackend => {
	const g = frontend?.general;
	const pricingDetails = mapActivityPricingToBackend(frontend?.pricing);
	const isFood = g?.activity_subtype === ENUM_ACTIVITY_TYPE.FOOD;

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.ACTIVITY,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(isFood
				? {
						typ: "food",
						menu: mapMenuToBackend(g?.[ENUM_FORM_ACTIVITY.MENU])
					}
				: g?.activity_subtype
					? { typ: activityTypeMapper.to(g.activity_subtype) }
					: {}),
			...(g?.activity_start_time && {
				start_time: {
					time: g.activity_start_time,
					timezone: g.activity_start_timezone
				}
			}),
			...(g?.activity_end_time && {
				end_time: {
					time: g.activity_end_time,
					timezone: g.activity_end_timezone
				}
			}),
			...(g !== undefined && {
				location: g.location
					? mapGeoFormToBackendLocation(g.location, lang)
					: null
			}),
			...pricingDetails.details
		}
	} as unknown as TTourEventUpdateBackend;
};

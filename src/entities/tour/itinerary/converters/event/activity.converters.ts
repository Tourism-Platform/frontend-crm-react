import { ActivityType, LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_ACTIVITY_TYPE,
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ACTIVITY,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_HOUSING_SOURCE,
	type TActivityEditSchema,
	type TActivitySingleEventBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import { isInheritedActivityDetails } from "./activity-details.helpers";
import {
	mapMenuFromBackend,
	mapMenuToBackend
} from "./activity-menu.converters";
import {
	mapActivityPricingFromBackend,
	mapActivityPricingToBackend
} from "./activity-pricing.converters";
import { activityTypeMapper } from "./activity-type.converters";
import { mapInheritedProductLinkToForm } from "./inherited-housing-form.helpers";
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
	const event = data?.event as TActivitySingleEventBackend;
	const details = event?.details ?? null;

	if (isInheritedActivityDetails(details)) {
		const product = details.product;
		const productTyp = product?.sub_typ ?? null;
		const activityTyp = normalizeActivityDetailsTyp(productTyp);

		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...mapInheritedProductLinkToForm(details),
			general: {
				description: event.description || "",
				activity_subtype: activityTypeMapper.from(activityTyp),
				activity_start_time: details.start_time?.time || "",
				activity_start_timezone: String(
					details.start_time?.timezone ?? getDeviceUtcOffset()
				),
				activity_end_time: details.end_time?.time || "",
				activity_end_timezone: String(
					details.end_time?.timezone ?? getDeviceUtcOffset()
				),
				location: mapBackendLocationToGeoForm(product?.location),
				[ENUM_FORM_ACTIVITY.MENU]: []
			},
			pricing: applyEventPackageIdToPricing(
				mapActivityPricingFromBackend(),
				event.package_id
			)
		};
	}

	const detailsTyp = details?.typ;
	const activityTyp = normalizeActivityDetailsTyp(detailsTyp);
	const isFood = detailsTyp === "food";

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			description: event.description || "",
			activity_subtype: activityTypeMapper.from(activityTyp),
			activity_start_time: details?.start_time?.time || "",
			activity_start_timezone: String(
				details?.start_time?.timezone ?? getDeviceUtcOffset()
			),
			activity_end_time: details?.end_time?.time || "",
			activity_end_timezone: String(
				details?.end_time?.timezone ?? getDeviceUtcOffset()
			),
			location: mapBackendLocationToGeoForm(details?.location),
			[ENUM_FORM_ACTIVITY.MENU]: isFood
				? mapMenuFromBackend(
						details && "menu" in details ? details.menu : null
					)
				: []
		},
		pricing: applyEventPackageIdToPricing(
			mapActivityPricingFromBackend(details),
			event.package_id
		)
	};
};

export const mapActivityFormToUpdate = (
	frontend: Partial<TActivityEditSchema>,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];

	if (productId) {
		return {
			typ: ENUM_EVENT_BACKEND.ACTIVITY,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(frontend.general?.description !== undefined && {
				description: frontend.general.description
			}),
			details: {
				product_id: productId,
				variant_id: frontend[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID] ?? null
			}
		};
	}

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
				location: mapGeoFormToBackendLocation(g.location, lang)
			}),
			...pricingDetails.details
		}
	} as unknown as TTourEventUpdateBackend;
};

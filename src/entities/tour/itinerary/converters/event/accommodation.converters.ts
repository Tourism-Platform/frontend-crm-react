import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_HOUSING_SOURCE,
	type TAccommodationEditSchema,
	type THousingSingleEventBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import { accommodationAmenityConverter } from "./accommodation-amenity.converters";
import {
	getDefaultAccommodationPricing,
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";
import {
	mapRoomsFromBackend,
	mapRoomsToBackend
} from "./accommodation-rooms.converters";
import { isInheritedHousingDetails } from "./housing-details.helpers";
import {
	mapInheritedHousingProductSnapshotToForm,
	mapInheritedProductLinkToForm
} from "./inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";

export const mapAccommodationEventToForm = (
	data: TTourEventBackendResponce
): TAccommodationEditSchema => {
	const event = data?.event as THousingSingleEventBackend;
	const details = event?.details;

	if (isInheritedHousingDetails(details)) {
		const link = mapInheritedProductLinkToForm(details);
		const snapshot = mapInheritedHousingProductSnapshotToForm(details);

		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...link,
			general: {
				property: snapshot.property,
				amenities: snapshot.amenities,
				description: event.description || "",
				length_of_stay: details.duration ?? null,
				check_in_time: details.check_in?.time || "",
				check_in_timezone: String(
					details.check_in?.timezone ?? getDeviceUtcOffset()
				),
				check_out_time: details.check_out?.time || "",
				check_out_timezone: String(
					details.check_out?.timezone ?? getDeviceUtcOffset()
				)
			},
			rooms: snapshot.rooms,
			pricing: applyEventPackageIdToPricing(
				getDefaultAccommodationPricing(),
				event.package_id
			)
		};
	}

	const expenses = details?.expenses;
	const perRoomRooms =
		expenses?.typ === "per_room" ? expenses.rooms : undefined;
	const perRoomCategoryRooms =
		expenses?.typ === "per_room_category" ? expenses.categories : undefined;
	const rooms = mapRoomsFromBackend(perRoomRooms, perRoomCategoryRooms);

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			property: mapBackendLocationToGeoForm(details?.location),
			amenities: accommodationAmenityConverter.fromMany(
				details?.amenities ?? []
			),
			description: event.description || "",
			length_of_stay: details?.duration ?? null,
			check_in_time: details?.check_in?.time || "",
			check_in_timezone: String(
				details?.check_in?.timezone ?? getDeviceUtcOffset()
			),
			check_out_time: details?.check_out?.time || "",
			check_out_timezone: String(
				details?.check_out?.timezone ?? getDeviceUtcOffset()
			)
		},
		rooms,
		pricing: applyEventPackageIdToPricing(
			mapAccommodationPricingFromBackend(details, rooms.rooms),
			event.package_id
		)
	};
};

export const mapAccommodationFormToUpdate = (
	frontend: Partial<TAccommodationEditSchema>,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];

	if (productId) {
		const g = frontend.general;
		const duration = Number(g?.length_of_stay);

		return {
			typ: ENUM_EVENT_BACKEND.HOUSING,
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined &&
				g.description !== "" && { description: g.description }),
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			details: {
				product_id: productId,
				variant_id:
					frontend[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID] ?? null,
				...(Number.isFinite(duration) && duration > 0 && { duration }),
				...(g?.check_in_time && {
					check_in: {
						time: g.check_in_time,
						timezone: g.check_in_timezone
					}
				}),
				...(g?.check_out_time && {
					check_out: {
						time: g.check_out_time,
						timezone: g.check_out_timezone
					}
				})
			}
		} as TTourEventUpdateBackend;
	}

	const g = frontend?.general;
	const roomsList = frontend?.rooms?.rooms ?? [];
	const pricingDetails = mapAccommodationPricingToBackend(
		frontend?.pricing,
		roomsList
	);
	const roomsDetails =
		frontend?.rooms !== undefined && !pricingDetails.details?.expenses
			? mapRoomsToBackend(roomsList).details
			: undefined;
	const duration = Number(g?.length_of_stay);
	const mappedAmenities = accommodationAmenityConverter.toMany(
		g?.amenities ?? []
	);
	const amenities = mappedAmenities.length ? mappedAmenities : undefined;

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.HOUSING,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		details: {
			...(Number.isFinite(duration) && duration > 0 && { duration }),
			...(amenities && { amenities }),
			...(g !== undefined && {
				location: mapGeoFormToBackendLocation(g.property, lang)
			}),
			...(g?.check_in_time && {
				check_in: {
					time: g.check_in_time,
					timezone: g.check_in_timezone
				}
			}),
			...(g?.check_out_time && {
				check_out: {
					time: g.check_out_time,
					timezone: g.check_out_timezone
				}
			}),
			...roomsDetails,
			...pricingDetails.details
		}
	} as unknown as TTourEventUpdateBackend;
};

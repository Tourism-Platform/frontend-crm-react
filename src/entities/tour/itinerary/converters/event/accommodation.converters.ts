import { type HousingSingleEventOutput, LanguageCode } from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_EVENT_BACKEND,
	type TAccommodationEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import { accommodationAmenityConverter } from "./accommodation-amenity.converters";
import {
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";
import {
	mapRoomsFromBackend,
	mapRoomsToBackend
} from "./accommodation-rooms.converters";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";

export const mapAccommodationEventToForm = (
	data: TTourEventBackendResponce
): TAccommodationEditSchema => {
	const event = data?.event as HousingSingleEventOutput;
	const details = event?.details;
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
		general: {
			property: mapBackendLocationToGeoForm(details?.location),
			amenities: accommodationAmenityConverter.fromMany(
				details?.amenities ?? []
			),
			description: event.description || "",
			length_of_stay: event.details?.duration ?? null,
			check_in_time: event.details?.check_in?.time || "",
			check_in_timezone: String(
				event.details?.check_in?.timezone ?? getDeviceUtcOffset()
			),
			check_out_time: event.details?.check_out?.time || "",
			check_out_timezone: String(
				event.details?.check_out?.timezone ?? getDeviceUtcOffset()
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
	lang: LanguageCode = LanguageCode.En
): TTourEventUpdateBackend => {
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
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(Number.isFinite(duration) && duration > 0 && { duration }),
			...(amenities && { amenities }),
			...(g !== undefined && {
				location: g.property
					? mapGeoFormToBackendLocation(g.property, lang)
					: null
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

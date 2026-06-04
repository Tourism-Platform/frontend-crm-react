import type { HousingEventSchemaOutput } from "@/shared/api";
import { AmenitiesTypes, LanguageCode } from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	type TAccommodationEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import {
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";
import {
	mapRoomsFromBackend,
	mapRoomsToBackend
} from "./accommodation-rooms.converters";

const hasPerRoomPricingInPayload = (
	pricing: TAccommodationEditSchema["pricing"] | undefined,
	pricingDetails: ReturnType<typeof mapAccommodationPricingToBackend>
) =>
	pricing?.invoicing === ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL &&
	pricing?.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM &&
	Boolean(pricingDetails.details?.expenses);

const mapAmenitiesFromBackend = (amenities?: AmenitiesTypes[] | null): string =>
	amenities?.[0] ?? "";

const mapAmenitiesToBackend = (
	amenities?: string
): AmenitiesTypes[] | undefined => {
	if (!amenities?.trim()) return undefined;
	const values = Object.values(AmenitiesTypes) as string[];
	if (!values.includes(amenities)) return undefined;
	return [amenities as AmenitiesTypes];
};

export const mapAccommodationEventToForm = (
	data: TTourEventBackendResponce
): TAccommodationEditSchema => {
	const event = data?.event as HousingEventSchemaOutput;
	const details = event?.details;
	const expenses = details?.expenses;
	const perRoomRooms =
		expenses?.typ === "per_room" ? expenses.rooms : undefined;
	const perRoomCategoryRooms =
		expenses?.typ === "per_room_category" ? expenses.rooms : undefined;
	const rooms = mapRoomsFromBackend(perRoomRooms, perRoomCategoryRooms);

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			property: mapBackendLocationToGeoForm(details?.location),
			amenities: mapAmenitiesFromBackend(details?.amenities),
			description: event.description || "",
			length_of_stay: String(event.details?.duration ?? ""),
			check_in_time: event.details?.check_in?.time || "",
			check_in_timezone: String(event.details?.check_in?.timezone ?? ""),
			check_out_time: event.details?.check_out?.time || "",
			check_out_timezone: String(event.details?.check_out?.timezone ?? "")
		},
		rooms,
		pricing: mapAccommodationPricingFromBackend(details, rooms.rooms)
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
		frontend?.rooms !== undefined &&
		!hasPerRoomPricingInPayload(frontend?.pricing, pricingDetails)
			? mapRoomsToBackend(roomsList).details
			: undefined;
	const duration = Number(g?.length_of_stay);
	const amenities = mapAmenitiesToBackend(g?.amenities);

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: "5",
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
			...pricingDetails.details,
			...roomsDetails
		}
	} as unknown as TTourEventUpdateBackend;
};

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import {
	ENUM_AMENITIES_TYPES_BACKEND,
	ENUM_HOUSING_ROOM_TYPES_BACKEND,
	ENUM_VEHICLE_BODY_TYPE_BACKEND
} from "@/entities/supplier/types/supplier-backend-enum.types";
import type { TTimeSchemaBackend } from "@/entities/tour/itinerary/types/event-backend.types";
import { ENUM_TRANSFER_TYPES_BACKEND } from "@/entities/tour/itinerary/types/itinerary-backend-enum.types";
import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_GENERAL_ACTIVITY_PUB_SCHEMA_OUTPUT_TYP_BACKEND,
	ENUM_HOTEL_KIND_BACKEND,
	type TActivityEventPubBackend,
	type TBusEventPubBackend,
	type TFlightEventPubBackend,
	type TGeneralActivityPubSchemaOutputBackend,
	type THousingEventPubBackend,
	type TInformationEventPubBackend,
	type TMultiEventPubBackend,
	type TOptionDetailBackend,
	type TPreviewOptionListItemBackend,
	type TPubLocationBackend,
	type TTrainEventPubBackend,
	type TTransferEventPubBackend
} from "../types";

import {
	PREVIEW_MOCK_IMAGE_URLS,
	withEventMedia
} from "./preview-option-media.mock";

export const PREVIEW_OPTION_MOCK_ID = "1f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11";

const time = (t: string): TTimeSchemaBackend => ({ time: t, timezone: 5 });

export const locationTashkent = (): TPubLocationBackend => ({
	lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
	city: "Tashkent",
	address: "Tashkent",
	lat: 41.2995,
	long: 69.2401
});

export const locationSamarkand = (): TPubLocationBackend => ({
	lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
	city: "Samarkand",
	address: "Samarkand",
	lat: 39.6542,
	long: 66.9597
});

export const locationAirportTashkent = (): TPubLocationBackend => ({
	lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
	city: "Tashkent",
	address: "Tashkent International Airport",
	lat: 41.2579,
	long: 69.2812
});

const housingDetails = () => ({
	duration: 1,
	check_in: time("14:00:00"),
	check_out: time("12:00:00"),
	spec: {
		stars: null,
		typs: [ENUM_HOTEL_KIND_BACKEND.HOTEL],
		amenities: [
			ENUM_AMENITIES_TYPES_BACKEND.WIFI,
			ENUM_AMENITIES_TYPES_BACKEND.BREAKFAST
		],
		rooms: [
			{
				name: "Standard Double",
				typ: ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE,
				pax: 2,
				description:
					"Comfortable double room with air conditioning, a private bathroom, and city views.",
				images: []
			},
			{
				name: "Family Suite",
				typ: ENUM_HOUSING_ROOM_TYPES_BACKEND.FAMILY,
				pax: 4,
				description:
					"Spacious suite with two sleeping areas, suitable for families travelling together.",
				images: []
			}
		]
	}
});

export const infoEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): TInformationEventPubBackend & { typ: "ref" } => ({
	typ: "ref",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: {
		start_time: time("13:00:00"),
		end_time: time("13:15:00")
	}
});

export const flightEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "flight" } & TFlightEventPubBackend => ({
	typ: "flight",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: {
		spec: {
			hop: [
				{
					airline_code: "HY",
					flight_number: 101,
					departure_airport_code: "IST",
					arrival_airport_code: "TAS",
					departure_location: locationAirportTashkent(),
					arrival_location: locationTashkent(),
					departure_date: "2026-06-01",
					arrival_date: "2026-06-01",
					departure_time: time("08:30:00"),
					arrival_time: time("14:45:00"),
					departure_terminal: "1",
					departure_gate: "A1",
					amenities: []
				}
			]
		}
	}
});

export const transferEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "transfer" } & TTransferEventPubBackend => ({
	typ: "transfer",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: {
		typ: ENUM_TRANSFER_TYPES_BACKEND.AIRPORT_TRANSFER,
		departure: {
			date: "2026-06-01",
			time: time("15:00:00"),
			location: locationAirportTashkent()
		},
		arrival: {
			date: "2026-06-01",
			time: time("16:00:00"),
			location: locationTashkent()
		},
		spec: {
			cars: [
				{
					name: null,
					typ: ENUM_VEHICLE_BODY_TYPE_BACKEND.SEDAN,
					pax: 2,
					description: null,
					categories: []
				},
				{
					name: null,
					typ: ENUM_VEHICLE_BODY_TYPE_BACKEND.MINIVAN,
					pax: 7,
					description: null,
					categories: []
				},
				{
					name: null,
					typ: ENUM_VEHICLE_BODY_TYPE_BACKEND.MINIBUS,
					pax: 21,
					description: null,
					categories: []
				}
			]
		}
	}
});

export const trainEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "train" } & TTrainEventPubBackend => ({
	typ: "train",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: {
		spec: {
			hop: [
				{
					departure: {
						date: "2026-06-02",
						time: time("08:00:00"),
						location: locationTashkent()
					},
					arrival: {
						date: "2026-06-02",
						time: time("10:30:00"),
						location: locationSamarkand()
					}
				}
			]
		}
	}
});

export const busEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "bus" } & TBusEventPubBackend => ({
	typ: "bus",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: {
		hop: [
			{
				departure: {
					date: "2026-06-02",
					time: time("17:30:00"),
					location: locationSamarkand()
				},
				arrival: {
					date: "2026-06-02",
					time: time("18:15:00"),
					location: locationSamarkand()
				}
			}
		],
		spec: { vehicles: [] }
	}
});

export const housingEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "housing" } & THousingEventPubBackend => ({
	typ: "housing",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: housingDetails()
});

export const activityEvent = (
	day: number,
	position: number,
	name: string,
	description: string,
	city: TPubLocationBackend
): { typ: "activity" } & TActivityEventPubBackend => ({
	typ: "activity",
	name,
	description,
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	// The generated details union intersects the literal discriminant with the
	// native enum (`{ typ: "sightseeing" } & TGeneralActivityPubSchemaOutputBackend`),
	// which TS reduces to never — a targeted cast is the only way to state it.
	details: {
		typ: ENUM_GENERAL_ACTIVITY_PUB_SCHEMA_OUTPUT_TYP_BACKEND.SIGHTSEEING,
		name: null,
		location: city,
		start_time: time("09:00:00"),
		end_time: time("17:00:00"),
		images: []
	} as { typ: "sightseeing" } & TGeneralActivityPubSchemaOutputBackend
});

export const multiplyHotels = (
	day: number,
	position: number
): TMultiEventPubBackend => ({
	typ: "options",
	name: "Overnight in Tashkent (choose one)",
	description:
		"Stay in one of our partner hotels of the same category. Exact property is confirmed before departure.",
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: [
		withEventMedia(
			housingEvent(
				day,
				1,
				"Holiday Inn Tashkent City (4*)",
				"Modern hotel near Amir Timur Square with rooftop bar and fitness centre."
			),
			[
				PREVIEW_MOCK_IMAGE_URLS.hotelA,
				PREVIEW_MOCK_IMAGE_URLS.hotelB,
				PREVIEW_MOCK_IMAGE_URLS.hotelC,
				PREVIEW_MOCK_IMAGE_URLS.hotelD,
				PREVIEW_MOCK_IMAGE_URLS.hotelE
			]
		),
		withEventMedia(
			housingEvent(
				day,
				2,
				"Uzbekistan Hotel (3*)",
				"Historic landmark hotel with central location and local cuisine restaurant."
			),
			[
				PREVIEW_MOCK_IMAGE_URLS.hotelB,
				PREVIEW_MOCK_IMAGE_URLS.hotelC,
				PREVIEW_MOCK_IMAGE_URLS.hotelD
			]
		),
		withEventMedia(
			housingEvent(
				day,
				3,
				"Ibis Styles Tashkent (3*)",
				"Design hotel in Yunusabad with metro access to the city centre."
			),
			[PREVIEW_MOCK_IMAGE_URLS.hotelC, PREVIEW_MOCK_IMAGE_URLS.hotelD]
		)
	]
});

export const multiplyEvening = (
	day: number,
	position: number
): TMultiEventPubBackend => ({
	typ: "options",
	name: "Evening experience (choose one)",
	description:
		"Select one included evening activity. Tell your guide by 12:00 on day 1.",
	day,
	position,
	is_optional: false,
	images: [],
	date: null,
	details: [
		withEventMedia(
			activityEvent(
				day,
				1,
				"State Conservatory chamber concert",
				"One-hour programme of Uzbek and European classics with reserved seating.",
				locationTashkent()
			),
			[PREVIEW_MOCK_IMAGE_URLS.activityA]
		),
		withEventMedia(
			activityEvent(
				day,
				2,
				"Plov cooking masterclass",
				"Hands-on lesson with a local chef; tasting and recipe card included.",
				locationTashkent()
			),
			[PREVIEW_MOCK_IMAGE_URLS.activityB]
		),
		withEventMedia(
			activityEvent(
				day,
				3,
				"Chorsu Bazaar night tour",
				"Guided walk through the covered market with dried fruit and bread tastings.",
				locationTashkent()
			),
			[PREVIEW_MOCK_IMAGE_URLS.activityC]
		)
	]
});

const monetary = (val: number) => ({
	val,
	currency: ENUM_CURRENCY_BACKEND.USD
});

export const PREVIEW_TOUR_OPTIONS_LIST_MOCK: TPreviewOptionListItemBackend[] = [
	{
		id: PREVIEW_OPTION_MOCK_ID,
		name: "Silk Road Explorer — 6 Days Classic",
		description:
			"Six-day journey through Tashkent and Samarkand with train, guided monuments, and partner hotels.",
		cover_image_path: PREVIEW_MOCK_IMAGE_URLS.cover,
		total_price: monetary(983),
		price_per_person: monetary(196)
	}
];

export const PREVIEW_OPTION_BACKEND_MOCK: TOptionDetailBackend = {
	id: PREVIEW_OPTION_MOCK_ID,
	total_price: monetary(983),
	events: [
		withEventMedia(
			infoEvent(
				1,
				1,
				"Arrival briefing & welcome",
				"Meet your representative at the airport, welcome pack, and lobby briefing at 15:00."
			),
			[]
		),
		withEventMedia(
			flightEvent(
				1,
				2,
				"International arrival flight",
				"Coordinated meet-and-greet for arrivals at Tashkent International Airport (TAS)."
			),
			[PREVIEW_MOCK_IMAGE_URLS.single1]
		),
		withEventMedia(
			transferEvent(
				1,
				3,
				"Airport to hotel transfer",
				"Shared air-conditioned minivan with bottled water; approx. 35–50 minutes."
			),
			[PREVIEW_MOCK_IMAGE_URLS.single2]
		),
		withEventMedia(multiplyHotels(1, 4), [
			PREVIEW_MOCK_IMAGE_URLS.single3,
			PREVIEW_MOCK_IMAGE_URLS.single4
		]),
		withEventMedia(multiplyEvening(1, 5), [
			PREVIEW_MOCK_IMAGE_URLS.activityA,
			PREVIEW_MOCK_IMAGE_URLS.activityB
		]),
		withEventMedia(
			trainEvent(
				2,
				1,
				"Afrosiyob train to Samarkand",
				"High-speed train in comfort class; guide meets you on the platform."
			),
			[PREVIEW_MOCK_IMAGE_URLS.single3]
		),
		withEventMedia(
			busEvent(
				2,
				2,
				"Local bus to Registan area",
				"Short shared bus ride from the station district to the historic centre."
			),
			[PREVIEW_MOCK_IMAGE_URLS.single4]
		),
		withEventMedia(
			activityEvent(
				2,
				3,
				"Registan Square guided visit",
				"Half-day walking tour with licensed historian; entrance fees included.",
				locationSamarkand()
			),
			[
				PREVIEW_MOCK_IMAGE_URLS.activityA,
				PREVIEW_MOCK_IMAGE_URLS.activityB,
				PREVIEW_MOCK_IMAGE_URLS.activityC
			]
		),
		withEventMedia(
			housingEvent(
				2,
				4,
				"Overnight in Samarkand",
				"Boutique hotel near the city centre with breakfast and Wi-Fi."
			),
			[
				PREVIEW_MOCK_IMAGE_URLS.hotelA,
				PREVIEW_MOCK_IMAGE_URLS.hotelB,
				PREVIEW_MOCK_IMAGE_URLS.hotelC
			]
		)
	]
};

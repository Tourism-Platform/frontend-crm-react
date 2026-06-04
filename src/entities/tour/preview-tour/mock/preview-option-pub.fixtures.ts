import {
	type ActivityEventPubReadOutput,
	ActivityType,
	AmenitiesTypes,
	type BusEventPubReadOutput,
	Currency,
	type FlightEventPubReadOutput,
	type HousingEventPubReadOutput,
	type InformationEventPubRead,
	LanguageCode,
	type LocationOutSchema,
	type MultipleOptionEventPubOutput,
	type TimeSchema,
	type TourOptionPreviewSchemaOutput,
	type TourOptionPublicResponse,
	type TrainEventPubReadOutput,
	type TransferEventPubReadOutput,
	TransferTypes
} from "@/shared/api";

import {
	PREVIEW_MOCK_IMAGE_URLS,
	withEventMedia
} from "./preview-option-media.mock";

export const PREVIEW_OPTION_MOCK_ID = "1f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11";

const time = (t: string): TimeSchema => ({ time: t, timezone: 5 });

export const locationTashkent = (): LocationOutSchema => ({
	lang: LanguageCode.En,
	city: "Tashkent",
	address: "Tashkent",
	lat: 41.2995,
	long: 69.2401
});

export const locationSamarkand = (): LocationOutSchema => ({
	lang: LanguageCode.En,
	city: "Samarkand",
	address: "Samarkand",
	lat: 39.6542,
	long: 66.9597
});

export const locationAirportTashkent = (): LocationOutSchema => ({
	lang: LanguageCode.En,
	city: "Tashkent",
	address: "Tashkent International Airport",
	lat: 41.2579,
	long: 69.2812
});

const housingDetails = (city: LocationOutSchema) => ({
	location: city,
	amenities: [AmenitiesTypes.Wifi, AmenitiesTypes.Breakfast],
	duration: 1,
	check_in: time("14:00:00"),
	check_out: time("12:00:00")
});

export const infoEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): InformationEventPubRead & { typ: "7" } => ({
	typ: "7",
	name,
	description,
	day,
	position,
	details: {}
});

export const flightEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "1" } & FlightEventPubReadOutput => ({
	typ: "1",
	name,
	description,
	day,
	position,
	details: {
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
				departure_gate: "A1"
			}
		]
	}
});

export const transferEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "4" } & TransferEventPubReadOutput => ({
	typ: "4",
	name,
	description,
	day,
	position,
	details: {
		typ: TransferTypes.AirportTransfer,
		departure: {
			date: "2026-06-01",
			time: time("15:00:00"),
			location: locationAirportTashkent()
		},
		arrival: {
			date: "2026-06-01",
			time: time("16:00:00"),
			location: locationTashkent()
		}
	}
});

export const trainEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "2" } & TrainEventPubReadOutput => ({
	typ: "2",
	name,
	description,
	day,
	position,
	details: {
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
});

export const busEvent = (
	day: number,
	position: number,
	name: string,
	description: string
): { typ: "3" } & BusEventPubReadOutput => ({
	typ: "3",
	name,
	description,
	day,
	position,
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
		]
	}
});

export const housingEvent = (
	day: number,
	position: number,
	name: string,
	description: string,
	city: LocationOutSchema
): { typ: "5" } & HousingEventPubReadOutput => ({
	typ: "5",
	name,
	description,
	day,
	position,
	details: housingDetails(city)
});

export const activityEvent = (
	day: number,
	position: number,
	name: string,
	description: string,
	city: LocationOutSchema
): { typ: "6" } & ActivityEventPubReadOutput => ({
	typ: "6",
	name,
	description,
	day,
	position,
	details: {
		typ: ActivityType.Sightseeing,
		location: city,
		start_time: time("09:00:00"),
		end_time: time("17:00:00")
	}
});

export const multiplyHotels = (
	day: number,
	position: number
): MultipleOptionEventPubOutput => ({
	typ: "8",
	name: "Overnight in Tashkent (choose one)",
	description:
		"Stay in one of our partner hotels of the same category. Exact property is confirmed before departure.",
	day,
	position,
	details: [
		withEventMedia(
			housingEvent(
				day,
				1,
				"Holiday Inn Tashkent City (4*)",
				"Modern hotel near Amir Timur Square with rooftop bar and fitness centre.",
				locationTashkent()
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
				"Historic landmark hotel with central location and local cuisine restaurant.",
				locationTashkent()
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
				"Design hotel in Yunusabad with metro access to the city centre.",
				locationTashkent()
			),
			[PREVIEW_MOCK_IMAGE_URLS.hotelC, PREVIEW_MOCK_IMAGE_URLS.hotelD]
		)
	]
});

export const multiplyEvening = (
	day: number,
	position: number
): MultipleOptionEventPubOutput => ({
	typ: "8",
	name: "Evening experience (choose one)",
	description:
		"Select one included evening activity. Tell your guide by 12:00 on day 1.",
	day,
	position,
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

const monetary = (val: number) => ({ val, currency: Currency.USD });

export const PREVIEW_TOUR_OPTIONS_LIST_MOCK: TourOptionPreviewSchemaOutput[] = [
	{
		id: PREVIEW_OPTION_MOCK_ID,
		name: "Silk Road Explorer — 6 Days Classic",
		description:
			"Six-day journey through Tashkent and Samarkand with train, guided monuments, and partner hotels.",
		cover_image_path: PREVIEW_MOCK_IMAGE_URLS.cover,
		total_price: monetary(983),
		total_price_max: monetary(1112),
		price_per_person: monetary(196),
		price_per_person_max: monetary(222)
	}
];

export const PREVIEW_OPTION_BACKEND_MOCK: TourOptionPublicResponse = {
	id: PREVIEW_OPTION_MOCK_ID,
	total_price: monetary(983),
	total_price_max: monetary(1112),
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
				"Boutique hotel near the city centre with breakfast and Wi-Fi.",
				locationSamarkand()
			),
			[
				PREVIEW_MOCK_IMAGE_URLS.hotelA,
				PREVIEW_MOCK_IMAGE_URLS.hotelB,
				PREVIEW_MOCK_IMAGE_URLS.hotelC
			]
		)
	]
};

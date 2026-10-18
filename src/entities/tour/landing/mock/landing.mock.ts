import { LanguageCode, PickupType } from "@/shared/api";

import type { TGetLandingBackendResponse } from "../types";

export const TOUR_LANDING_MOCK: TGetLandingBackendResponse = {
	id: "landing-mock-1",
	title: "Silk Road Discovery",
	overview: null,
	overview_description: null,
	languages: [LanguageCode.En, LanguageCode.Ru],
	created_at: null,
	updated_at: null,
	description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',
	amenities_included: [
		"professional_guide",
		"hotel_accommodation",
		"breakfast",
		"transportation"
	],
	amenities_not_included: [
		"international_flights",
		"visa_fees",
		"tips_gratuities"
	],
	pickup_type: [PickupType.HotelPickup, PickupType.AirportPickup],
	pickup_description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"We provide pickup from all major hotels in Tashkent and the international airport."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Please provide your arrival details at least 48 hours before the tour."}]}]}',
	cancellation_policy:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Full refund for cancellations made at least 7 days before the start date."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"50% refund for cancellations between 3 and 7 days."},{"type":"hardBreak"},{"type":"text","text":"No refund for cancellations within 72 hours."}]}]}',
	additional_information:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Please wear comfortable walking shoes."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Some sites require modest dress (shoulders and knees covered). Don\'t forget your camera!"}]}]}'
};

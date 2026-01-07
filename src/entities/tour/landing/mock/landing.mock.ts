import {
	ENUM_AMENITIES,
	ENUM_LANGUAGES,
	ENUM_PICKUP_TYPE
} from "@/entities/tour";

import type { ILandingBackend } from "../types";

export const TOUR_LANDING_MOCK: ILandingBackend = {
	photos: "https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0",
	description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',
	languages: [ENUM_LANGUAGES.ENGLISH, ENUM_LANGUAGES.RUSSIAN],
	includedAmenities: [
		ENUM_AMENITIES.PROFESSIONAL_GUIDE,
		ENUM_AMENITIES.HOTEL_ACCOMMODATION,
		ENUM_AMENITIES.BREAKFAST,
		ENUM_AMENITIES.TRANSPORTATION
	],
	notIncludedAmenities: [
		ENUM_AMENITIES.INTERNATIONAL_FLIGHTS,
		ENUM_AMENITIES.VISA_FEES,
		ENUM_AMENITIES.TIPS_GRATUITIES
	],
	pickupType: [ENUM_PICKUP_TYPE.HOTEL, ENUM_PICKUP_TYPE.AIRPORT],
	pickupDescription:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"We provide pickup from all major hotels in Tashkent and the international airport."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Please provide your arrival details at least 48 hours before the tour."}]}]}',
	cancellationPolicy:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Full refund for cancellations made at least 7 days before the start date."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"50% refund for cancellations between 3 and 7 days."},{"type":"hardBreak"},{"type":"text","text":"No refund for cancellations within 72 hours."}]}]}',
	additionalInfo:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Please wear comfortable walking shoes."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Some sites require modest dress (shoulders and knees covered). Don\'t forget your camera!"}]}]}'
};

import {
	Language,
	PickupType,
	SrcCommonConstantsAmenitiesTypes
} from "@/shared/api";

import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";

import type { TPreviewTourBackend } from "../types";

export const TOUR_PREVIEW_TOUR_MOCK: TPreviewTourBackend = {
	id: "36ec7294-0af4-4685-bb71-132808985b0c",
	title: "Title",
	overview:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',

	additional_information:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',

	description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',
	// cities: ["Tashkent", "Samarkand", "Bukhara", "Khiva"],
	languages: [Language.English, Language.Russian],
	amenities_included: [SrcCommonConstantsAmenitiesTypes.Wifi],
	amenities_not_included: [SrcCommonConstantsAmenitiesTypes.Wifi],
	pickup_type: [PickupType.AirportPickup],
	pickup_description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"We provide pickup from all major hotels in Tashkent and the international airport."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Please provide your arrival details at least 48 hours before the tour."}]}]}',
	cancellation_policy:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Full refund for cancellations made at least 7 days before the start date."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"50% refund for cancellations between 3 and 7 days."},{"type":"hardBreak"},{"type":"text","text":"No refund for cancellations within 72 hours."}]}]}',
	overview_description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Please wear comfortable walking shoes."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Some sites require modest dress (shoulders and knees covered). Don\'t forget your camera!"}]}]}'
};

export const PREVIEW_TOUR_OPTIONS_MOCK = [
	{
		id: "1",
		title: "Option 1",
		description:
			"Those seeking the historical culture of the silk road's ancient cities without the hassle of organization will enjoy this comprehensive six-day tour of Samarkand, Bukhara, Khiva & Tashkent. In collaboration with the experience of your local guide, your private group can customize an itinerary catered for your interests - be it cuisine, history, or architecture. Internet usage, accommodation, breakfast, travel (train, flight, and bus), and tickets for activities are all included. Make it easy - local internet access, accommodation, and breakfast are all included The six-day itinerary can be customised to your requests Your city guide allows for easy mobility around the vast cities Hassle-free border pic...",
		price: "$500.00",
		image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
		days: [
			{
				id: "d1",
				day_number: 1,
				location: "Tashkent",
				events: [
					{
						id: "e1",
						type: ENUM_EVENT.INFORMATION,
						title: "Information for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					}
				]
			}
		]
	},
	{
		id: "2",
		title: "Option 2",
		description:
			"Those seeking the historical culture of the silk road's ancient cities without the hassle of organization will enjoy this comprehensive six-day tour of Samarkand, Bukhara, Khiva & Tashkent. In collaboration with the experience of your local guide, your private group can customize an itinerary catered for your interests - be it cuisine, history, or architecture. Internet usage, accommodation, breakfast, travel (train, flight, and bus), and tickets for activities are all included. Make it easy - local internet access, accommodation, and breakfast are all included The six-day itinerary can be customised to your requests Your city guide allows for easy mobility around the vast cities Hassle-free border pic...",
		price: "$999.00",
		image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
		days: [
			{
				id: "d2",
				day_number: 1,
				location: "Tashkent",
				events: [
					{
						id: "e2",
						type: ENUM_EVENT.INFORMATION,
						title: "Information for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					},
					{
						id: "e3",
						type: ENUM_EVENT.INFORMATION,
						title: "Information for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					}
				]
			},
			{
				id: "d3",
				day_number: 2,
				location: "Tashkent",
				events: [
					{
						id: "e4",
						type: ENUM_EVENT.INFORMATION,
						title: "Information for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					},
					{
						id: "e5",
						type: ENUM_EVENT.INFORMATION,
						title: "Information for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					}
				]
			}
		]
	}
];

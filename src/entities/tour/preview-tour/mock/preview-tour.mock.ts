import { AmenitiesTypes, Language, PickupType } from "@/shared/api";

import type { TPreviewTourBackend } from "../types";
import { ENUM_PREVIEW_OPTION_EVENT } from "../types/preview-option-event.types";

import { PREVIEW_MOCK_IMAGE_URLS } from "./preview-option-media.mock";

export const TOUR_PREVIEW_TOUR_MOCK: TPreviewTourBackend = {
	title: "Title",
	images: [
		{
			id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
			image_url: PREVIEW_MOCK_IMAGE_URLS.cover,
			is_primary: true
		},
		{
			id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
			image_url: PREVIEW_MOCK_IMAGE_URLS.single1,
			is_primary: false
		},
		{
			id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
			image_url: PREVIEW_MOCK_IMAGE_URLS.single2,
			is_primary: false
		},
		{
			id: "d4e5f6a7-b8c9-0123-def0-234567890123",
			image_url: PREVIEW_MOCK_IMAGE_URLS.hotelA,
			is_primary: false
		},
		{
			id: "e5f6a7b8-c9d0-1234-ef01-345678901234",
			image_url: PREVIEW_MOCK_IMAGE_URLS.activityA,
			is_primary: false
		}
	],
	overview:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',

	additional_information:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',

	description:
		'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Embark on an unforgettable journey through the ancient cities of Uzbekistan."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Discover the rich history, stunning architecture, and warm hospitality of the Silk Road."}]}]}',
	// cities: ["Tashkent", "Samarkand", "Bukhara", "Khiva"],
	languages: [Language.English, Language.Russian],
	amenities_included: [AmenitiesTypes.Wifi],
	amenities_not_included: [AmenitiesTypes.Wifi],
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
						type: ENUM_PREVIEW_OPTION_EVENT.INFO,
						title: "INFO for arrivals",
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
						type: ENUM_PREVIEW_OPTION_EVENT.INFO,
						title: "INFO for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					},
					{
						id: "e3",
						type: ENUM_PREVIEW_OPTION_EVENT.INFO,
						title: "INFO for arrivals",
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
						type: ENUM_PREVIEW_OPTION_EVENT.INFO,
						title: "INFO for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					},
					{
						id: "e5",
						type: ENUM_PREVIEW_OPTION_EVENT.INFO,
						title: "INFO for arrivals",
						description:
							"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel...."
					}
				]
			}
		]
	}
];

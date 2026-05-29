import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";

import type { IOptionDetail } from "../types";

export const PREVIEW_OPTION_DETAIL_MOCK: IOptionDetail = {
	id: "1",
	title: "Option 1",
	price: "$500.00",
	days: [
		{
			id: "d1",
			day_number: 1,
			location: "Tashkent",
			events: [
				{
					id: "e1",
					type: ENUM_EVENT.INFO,
					title: "Information for arrivals",
					description:
						"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel. Open arrival, check-in at the hotel will be available from 14:00. After accommodation, guests will have free time to rest and recover after the journey or explore the surroundings.",
					full_description:
						"Upon arrival at the airport, guests will be met by a representative holding a name sign. A comfortable group transfer will then be provided to the hotel. Open arrival, check-in at the hotel will be available from 14:00. After accommodation, guests will have free time to rest and recover after the journey or explore the surroundings.\n\nWelcome briefing at 15:00 in the lobby — our guide will hand out maps, walk you through the next 3 days, and answer any questions. Light refreshments included. The remainder of the afternoon is yours to wander Amir Timur Square or take a first metro ride through Tashkent's famously decorated stations.",
					image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=1000"
				},
				{
					id: "e2",
					type: ENUM_EVENT.INFO,
					title: "Transfer to hotel",
					description:
						"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Quis est id mi ac quam mattis libero fringilla nec. Lacus quis lacus ornare ac nisi. Bibendum egestas duis nullam ut nulla urna.",
					full_description:
						"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Quis est id mi ac quam mattis libero fringilla nec. Lacus quis lacus ornare ac nisi. Bibendum egestas duis nullam ut nulla urna.\n\nPrivate air-conditioned minivan with bottled water. Travel time approximately 40 minutes depending on traffic conditions. Driver will assist with luggage.",
					image: "https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?q=80&w=1000"
				},
				{
					id: "e3",
					type: ENUM_EVENT.ACCOMMODATION,
					title: "Hotel in Tashkent",
					description:
						"Accommodation will be provided in one of the selected 2 hotels of the same category, subject to availability at the time of arrival. Hotel check-in is available from 14:00. All hotels offer comfortable rooms and standard amenities to ensure a pleasant stay.",
					full_description:
						"Accommodation will be provided in one of the selected 2 hotels of the same category, subject to availability at the time of arrival. Hotel check-in is available from 14:00. All hotels offer comfortable rooms and standard amenities to ensure a pleasant stay.\n\nAll rooms include Wi-Fi, air conditioning, minibar, and daily housekeeping service.",
					image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
					sub_options: [
						{
							id: "so1",
							title: "Holiday Resort (3*)",
							description:
								"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Quis est id mi ac quam mattis libero fringilla nec. Lacus quis lacus ornare ac nisi. Bibendum egestas duis nullam ut n...",
							image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
							full_description:
								"Holiday Resort is a comfortable 3-star hotel located in the heart of Tashkent. Features include outdoor pool, restaurant, and 24-hour reception. Rooms are spacious with modern furnishings."
						},
						{
							id: "so2",
							title: "Holiday Resort (3*)",
							description:
								"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Quis est id mi ac quam mattis libero fringilla nec. Lacus quis lacus ornare ac nisi. Bibendum egestas duis nullam ut n...",
							image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
							full_description:
								"Holiday Resort is a comfortable 3-star hotel located in the heart of Tashkent. Features include outdoor pool, restaurant, and 24-hour reception. Rooms are spacious with modern furnishings."
						},
						{
							id: "so3",
							title: "Holiday Resort (3*)",
							description:
								"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique...",
							image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
							full_description:
								"Holiday Resort is a comfortable 3-star hotel located in the heart of Tashkent. Features include outdoor pool, restaurant, and 24-hour reception."
						}
					]
				},
				{
					id: "e4",
					type: ENUM_EVENT.TRANSPORTATION,
					title: "Transfer to hotel",
					description:
						"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Quis est id mi ac quam mattis libero fringilla nec. Lacus quis lacus ornare ac nisi. Bibendum egestas duis nullam ut nulla urna.",
					full_description:
						"Lorem ipsum dolor sit amet consectetur. Iaculis nec feugiat in ut egestas non. Tristique turpis arcu platea diam risus amet diam interdum ac. Full transfer details with pickup times and vehicle specifications.",
					image: "https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?q=80&w=1000"
				}
			]
		},
		{
			id: "d2",
			day_number: 2,
			location: "Samarkand",
			events: [
				{
					id: "e5",
					type: ENUM_EVENT.INFO,
					title: "Guided city tour",
					description:
						"Full day exploring Samarkand's famous landmarks including Registan Square, Shah-i-Zinda necropolis, and Bibi-Khanym Mosque. Lunch included at a local restaurant.",
					full_description:
						"Full day exploring Samarkand's famous landmarks including Registan Square, Shah-i-Zinda necropolis, and Bibi-Khanym Mosque. Lunch included at a local restaurant.\n\nThe tour starts at 09:00 and finishes around 17:00. Comfortable walking shoes recommended. Entrance tickets to all sites are included.",
					image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=1000"
				},
				{
					id: "e6",
					type: ENUM_EVENT.ACCOMMODATION,
					title: "Hotel in Samarkand",
					description:
						"Accommodation in a selected hotel near the city center. Check-in available from 14:00.",
					full_description:
						"Accommodation in a selected hotel near the city center. Check-in available from 14:00. All rooms feature air conditioning, free Wi-Fi, and private bathroom.",
					image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
					sub_options: [
						{
							id: "so4",
							title: "Grand Samarkand (4*)",
							description:
								"Luxurious 4-star hotel with panoramic views of Registan Square. Full breakfast buffet included.",
							image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
							full_description:
								"Luxurious 4-star hotel with panoramic views of Registan Square. Full breakfast buffet included. Spa and wellness center available. Rooftop terrace with evening dining."
						},
						{
							id: "so5",
							title: "Silk Road Inn (3*)",
							description:
								"Charming boutique hotel in traditional Uzbek style. Courtyard garden with fountain.",
							image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
							full_description:
								"Charming boutique hotel in traditional Uzbek style. Courtyard garden with fountain. Authentic decor and warm hospitality. Walking distance to major attractions."
						}
					]
				}
			]
		}
	]
};

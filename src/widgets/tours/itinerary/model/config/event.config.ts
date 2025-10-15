import { Calendar, Car, Hotel, Info, List, MapPin, Plane } from "lucide-react";

import { ENUM_PATH, type TTourEventPath } from "@/shared/config";

import { ENUM_EVENT, type IEventTemplate } from "../types";

export const EVENT_TEMPLATES_LIST: IEventTemplate = {
	library: [
		{
			event_type: ENUM_EVENT.EVENT_LIBRARY,
			title: "Event library",
			icon: Calendar,
			color: "bg-blue-500"
		},
		{
			event_type: ENUM_EVENT.ITINERARY_LIBRARY,
			title: "Itinerary library",
			icon: MapPin,
			color: "bg-blue-500"
		}
	],
	components: [
		{
			event_type: ENUM_EVENT.TOUR_DETAILS,
			title: "Trip details",
			icon: List,
			color: "bg-red-500"
		},
		{
			event_type: ENUM_EVENT.FLIGHT,
			title: "Flight",
			icon: Plane,
			color: "bg-blue-500"
		},
		{
			event_type: ENUM_EVENT.ACTIVITY,
			title: "Activity",
			icon: Calendar,
			color: "bg-blue-500"
		},
		{
			event_type: ENUM_EVENT.ACCOMMODATION,
			title: "Accommodation",
			icon: Hotel,
			color: "bg-blue-500"
		},
		{
			event_type: ENUM_EVENT.TRANSPORTATION,
			title: "Transportation",
			icon: Car,
			color: "bg-green-500"
		},
		{
			event_type: ENUM_EVENT.MULTIPLY_OPTION,
			title: "Multiply-option",
			icon: List,
			color: "bg-gray-700"
		},
		{
			event_type: ENUM_EVENT.INFO,
			title: "Info",
			icon: Info,
			color: "bg-gray-900"
		}
	]
};

export const EVENT_TYPE_TO_PATH: Record<string, TTourEventPath> = {
	[ENUM_EVENT.TOUR_DETAILS]: ENUM_PATH.TOURS.EVENTS.TOUR_DETAILS,
	[ENUM_EVENT.FLIGHT]: ENUM_PATH.TOURS.EVENTS.FLIGHT,
	[ENUM_EVENT.ACTIVITY]: ENUM_PATH.TOURS.EVENTS.EVENT,
	[ENUM_EVENT.ACCOMMODATION]: ENUM_PATH.TOURS.EVENTS.ACCOMMODATION,
	[ENUM_EVENT.TRANSPORTATION]: ENUM_PATH.TOURS.EVENTS.TRANSFER,
	[ENUM_EVENT.MULTIPLY_OPTION]: ENUM_PATH.TOURS.EVENTS.MULTIPLY_OPTION,
	[ENUM_EVENT.INFO]: ENUM_PATH.TOURS.EVENTS.INFO
};

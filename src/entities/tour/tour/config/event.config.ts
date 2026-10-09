import { Calendar } from "lucide-react";

import {
	BoxOutlineIcon,
	DrivingIcon,
	HouseIcon,
	InfoCircleIcon,
	PlaneIcon,
	TaskSquareIcon,
	TicketStarIcon,
	UsersIcon
} from "@/shared/assets";
import { ENUM_PATH, type TTourEventPath } from "@/shared/config";

import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	ENUM_ACTIVITY_EDIT_TAB,
	ENUM_FLIGHT_EDIT_TAB,
	ENUM_GUIDE_EDIT_TAB,
	ENUM_INFORMATION_EDIT_TAB,
	ENUM_MULTIPLY_OPTION_EDIT_TAB,
	ENUM_SUPPLEMENT_EDIT_TAB,
	ENUM_TRANSPORTATION_EDIT_TAB
} from "../../itinerary/types";
import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type IEventTemplate,
	type ITemplateItem
} from "../types";

export const EVENT_METADATA: Record<
	string,
	Omit<ITemplateItem, "eventType">
> = {
	[ENUM_EVENT.FLIGHT]: {
		title: "Transportation",
		icon: PlaneIcon,
		color_text: "text-blue-500",
		color_bg: "bg-blue-500"
	},
	[ENUM_EVENT.ACTIVITY]: {
		title: "Activity",
		icon: TicketStarIcon,
		color_text: "text-sky-500",
		color_bg: "bg-sky-500"
	},
	[ENUM_EVENT.ACCOMMODATION]: {
		title: "Accommodation",
		icon: HouseIcon,
		color_text: "text-cyan-700",
		color_bg: "bg-cyan-700"
	},
	[ENUM_EVENT.TRANSPORTATION]: {
		title: "Transfer",
		icon: DrivingIcon,
		color_text: "text-emerald-600",
		color_bg: "bg-emerald-600"
	},
	[ENUM_EVENT.SUPPLEMENT]: {
		title: "Supplement",
		icon: BoxOutlineIcon,
		color_text: "text-violet-600",
		color_bg: "bg-violet-600"
	},
	[ENUM_EVENT.GUIDE]: {
		title: "Guide",
		icon: UsersIcon,
		color_text: "text-orange-600",
		color_bg: "bg-orange-600"
	},
	[ENUM_EVENT.MULTIPLY_OPTION]: {
		title: "Multiply-option",
		icon: TaskSquareIcon,
		color_text: "text-zinc-700",
		color_bg: "bg-zinc-700"
	},
	[ENUM_EVENT.INFO]: {
		title: "Info",
		icon: InfoCircleIcon,
		color_text: "text-amber-600",
		color_bg: "bg-amber-600"
	},
	[ENUM_EVENT.EVENT_LIBRARY]: {
		title: "Event library",
		icon: Calendar,
		color_text: "text-blue-500",
		color_bg: "bg-blue-500"
	},
	[ENUM_EVENT.PACKAGE]: {
		title: "Package",
		icon: BoxOutlineIcon,
		color_text: "text-indigo-600",
		color_bg: "bg-indigo-600"
	}
};

const COMPONENT_TYPES: ENUM_EVENT_TYPE[] = [
	ENUM_EVENT.FLIGHT,
	ENUM_EVENT.ACTIVITY,
	ENUM_EVENT.ACCOMMODATION,
	ENUM_EVENT.TRANSPORTATION,
	ENUM_EVENT.SUPPLEMENT,
	ENUM_EVENT.GUIDE,
	ENUM_EVENT.MULTIPLY_OPTION,
	ENUM_EVENT.INFO
];

export const EVENT_TEMPLATES_LIST: IEventTemplate = {
	library: [
		{
			eventType: ENUM_EVENT.EVENT_LIBRARY,
			...EVENT_METADATA[ENUM_EVENT.EVENT_LIBRARY]
		}
	],
	components: COMPONENT_TYPES.map((type) => ({
		eventType: type,
		...EVENT_METADATA[type]
	}))
};

export const EVENT_TYPE_TO_PATH: Record<string, TTourEventPath> = {
	[ENUM_EVENT.TOUR_DETAILS]: ENUM_PATH.TOURS.EVENTS.TOUR_DETAILS,
	[ENUM_EVENT.FLIGHT]: ENUM_PATH.TOURS.EVENTS.FLIGHT,
	[ENUM_EVENT.ACTIVITY]: ENUM_PATH.TOURS.EVENTS.EVENT,
	[ENUM_EVENT.ACCOMMODATION]: ENUM_PATH.TOURS.EVENTS.ACCOMMODATION,
	[ENUM_EVENT.TRANSPORTATION]: ENUM_PATH.TOURS.EVENTS.TRANSFER,
	[ENUM_EVENT.SUPPLEMENT]: ENUM_PATH.TOURS.EVENTS.SUPPLEMENT,
	[ENUM_EVENT.GUIDE]: ENUM_PATH.TOURS.EVENTS.GUIDE,
	[ENUM_EVENT.MULTIPLY_OPTION]: ENUM_PATH.TOURS.EVENTS.MULTIPLY_OPTION,
	[ENUM_EVENT.INFO]: ENUM_PATH.TOURS.EVENTS.INFO
};

export const EVENT_TYPE_TO_OPTION_PATH: Record<string, TTourEventPath> = {
	[ENUM_EVENT.FLIGHT]: ENUM_PATH.TOURS.EVENTS.FLIGHT_OPTION,
	[ENUM_EVENT.ACTIVITY]: ENUM_PATH.TOURS.EVENTS.EVENT_OPTION,
	[ENUM_EVENT.ACCOMMODATION]: ENUM_PATH.TOURS.EVENTS.ACCOMMODATION_OPTION,
	[ENUM_EVENT.TRANSPORTATION]: ENUM_PATH.TOURS.EVENTS.TRANSFER_OPTION,
	[ENUM_EVENT.SUPPLEMENT]: ENUM_PATH.TOURS.EVENTS.SUPPLEMENT_OPTION,
	[ENUM_EVENT.GUIDE]: ENUM_PATH.TOURS.EVENTS.GUIDE_OPTION,
	[ENUM_EVENT.INFO]: ENUM_PATH.TOURS.EVENTS.INFO_OPTION
};

/** Edit-page tabs per event type; order must match the page tab configs (first = default). */
export const EVENT_TYPE_TO_TABS: Record<string, readonly string[]> = {
	[ENUM_EVENT.FLIGHT]: [
		ENUM_FLIGHT_EDIT_TAB.GENERAL,
		ENUM_FLIGHT_EDIT_TAB.MEDIA,
		ENUM_FLIGHT_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.ACTIVITY]: [
		ENUM_ACTIVITY_EDIT_TAB.GENERAL,
		ENUM_ACTIVITY_EDIT_TAB.MEDIA,
		ENUM_ACTIVITY_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.ACCOMMODATION]: [
		ENUM_ACCOMMODATION_EDIT_TAB.GENERAL,
		ENUM_ACCOMMODATION_EDIT_TAB.ROOMS,
		ENUM_ACCOMMODATION_EDIT_TAB.MEDIA,
		ENUM_ACCOMMODATION_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.TRANSPORTATION]: [
		ENUM_TRANSPORTATION_EDIT_TAB.GENERAL,
		ENUM_TRANSPORTATION_EDIT_TAB.CARS,
		ENUM_TRANSPORTATION_EDIT_TAB.MEDIA,
		ENUM_TRANSPORTATION_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.SUPPLEMENT]: [
		ENUM_SUPPLEMENT_EDIT_TAB.ITEMS,
		ENUM_SUPPLEMENT_EDIT_TAB.MEDIA,
		ENUM_SUPPLEMENT_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.GUIDE]: [
		ENUM_GUIDE_EDIT_TAB.GUIDES,
		ENUM_GUIDE_EDIT_TAB.MEDIA,
		ENUM_GUIDE_EDIT_TAB.PRICING
	],
	[ENUM_EVENT.MULTIPLY_OPTION]: [
		ENUM_MULTIPLY_OPTION_EDIT_TAB.GENERAL,
		ENUM_MULTIPLY_OPTION_EDIT_TAB.MEDIA
	],
	[ENUM_EVENT.INFO]: [
		ENUM_INFORMATION_EDIT_TAB.GENERAL,
		ENUM_INFORMATION_EDIT_TAB.MEDIA
	]
};

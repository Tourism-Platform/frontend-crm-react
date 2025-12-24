import { Calendar } from "lucide-react";

import {
	DrivingIcon,
	HouseIcon,
	InfoCircleIcon,
	PlaneIcon,
	TaskSquareIcon,
	TicketStarIcon
} from "@/shared/assets";
import { ENUM_PATH, type TTourEventPath } from "@/shared/config";

import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type IEventTemplate,
	type ITemplateItem
} from "../types";

export const EVENT_METADATA: Record<
	string,
	Omit<ITemplateItem, "event_type">
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
	}
};

const COMPONENT_TYPES: ENUM_EVENT_TYPE[] = [
	ENUM_EVENT.FLIGHT,
	ENUM_EVENT.ACTIVITY,
	ENUM_EVENT.ACCOMMODATION,
	ENUM_EVENT.TRANSPORTATION,
	ENUM_EVENT.MULTIPLY_OPTION,
	ENUM_EVENT.INFO
];

export const EVENT_TEMPLATES_LIST: IEventTemplate = {
	library: [
		{
			event_type: ENUM_EVENT.EVENT_LIBRARY,
			...EVENT_METADATA[ENUM_EVENT.EVENT_LIBRARY]
		}
	],
	components: COMPONENT_TYPES.map((type) => ({
		event_type: type,
		...EVENT_METADATA[type]
	}))
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

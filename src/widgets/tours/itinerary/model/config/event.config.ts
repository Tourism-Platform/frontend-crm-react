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

import { ENUM_EVENT, type IEventTemplate } from "../types";

export const EVENT_TEMPLATES_LIST: IEventTemplate = {
	library: [
		{
			event_type: ENUM_EVENT.EVENT_LIBRARY,
			title: "Event library",
			icon: Calendar,
			color_text: "text-blue-500",
			color_bg: "bg-blue-500"
		}
	],
	components: [
		{
			event_type: ENUM_EVENT.FLIGHT,
			title: "Transportation",
			icon: PlaneIcon,
			color_text: "text-blue-500",
			color_bg: "bg-blue-500"
		},
		{
			event_type: ENUM_EVENT.ACTIVITY,
			title: "Activity",
			icon: TicketStarIcon,
			color_text: "text-sky-500",
			color_bg: "bg-sky-500"
		},
		{
			event_type: ENUM_EVENT.ACCOMMODATION,
			title: "Accommodation",
			icon: HouseIcon,
			color_text: "text-cyan-700",
			color_bg: "bg-cyan-700"
		},
		{
			event_type: ENUM_EVENT.TRANSPORTATION,
			title: "Transfer",
			icon: DrivingIcon,
			color_text: "text-emerald-600",
			color_bg: "bg-emerald-600"
		},
		{
			event_type: ENUM_EVENT.MULTIPLY_OPTION,
			title: "Multiply-option",
			icon: TaskSquareIcon,
			color_text: "text-zinc-700",
			color_bg: "bg-zinc-700"
		},
		{
			event_type: ENUM_EVENT.INFO,
			title: "Info",
			icon: InfoCircleIcon,
			color_text: "text-amber-600",
			color_bg: "bg-amber-600"
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

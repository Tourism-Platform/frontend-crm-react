import {
	BoxOutlineIcon,
	DrivingIcon,
	HouseIcon,
	InfoCircleIcon,
	PlaneIcon,
	TicketStarIcon
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";

import { ENUM_EVENT } from "@/entities/tour";

import type { ICreateEventTemplateOption } from "../types";

export const CREATE_EVENT_TEMPLATE_OPTIONS: ICreateEventTemplateOption[] = [
	{
		type: ENUM_EVENT.TRANSPORTATION,
		title: "create.transfer.title",
		description: "create.transfer.description",
		icon: DrivingIcon,
		iconBgClassName: "bg-emerald-600",
		path: ENUM_PATH.LIBRARY.EVENT_TRANSFER
	},
	{
		type: ENUM_EVENT.SUPPLEMENT,
		title: "create.supplement.title",
		description: "create.supplement.description",
		icon: BoxOutlineIcon,
		iconBgClassName: "bg-violet-600",
		path: ENUM_PATH.LIBRARY.EVENT_SUPPLEMENT
	},
	{
		type: ENUM_EVENT.FLIGHT,
		title: "create.flight.title",
		description: "create.flight.description",
		icon: PlaneIcon,
		iconBgClassName: "bg-blue-600",
		path: ENUM_PATH.LIBRARY.EVENT_FLIGHT
	},
	{
		type: ENUM_EVENT.ACCOMMODATION,
		title: "create.accommodation.title",
		description: "create.accommodation.description",
		icon: HouseIcon,
		iconBgClassName: "bg-cyan-700",
		path: ENUM_PATH.LIBRARY.EVENT_ACCOMMODATION
	},
	{
		type: ENUM_EVENT.ACTIVITY,
		title: "create.activity.title",
		description: "create.activity.description",
		icon: TicketStarIcon,
		iconBgClassName: "bg-sky-500",
		path: ENUM_PATH.LIBRARY.EVENT_ACTIVITY
	},
	{
		type: ENUM_EVENT.INFO,
		title: "create.info.title",
		description: "create.info.description",
		icon: InfoCircleIcon,
		iconBgClassName: "bg-amber-600",
		path: ENUM_PATH.LIBRARY.EVENT_INFO
	}
];

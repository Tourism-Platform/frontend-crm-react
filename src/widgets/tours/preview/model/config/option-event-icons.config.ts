import type { ComponentType, SVGProps } from "react";

import {
	BoxOutlineIcon,
	DrivingIcon,
	HouseIcon,
	InfoCircleIcon,
	PlaneIcon,
	TaskSquareIcon,
	TicketStarIcon
} from "@/shared/assets";

import {
	ENUM_PREVIEW_OPTION_EVENT,
	type TPreviewOptionEventType
} from "@/entities/tour/preview-tour";

/**
 * Иконка вида события — узел ленты маршрута и шапка группы в разборе цены.
 * Те же иконки, что у видов событий в редакторе маршрута (`EVENT_METADATA`)
 */
export const OPTION_EVENT_ICONS: Record<
	TPreviewOptionEventType,
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	[ENUM_PREVIEW_OPTION_EVENT.ACCOMMODATION]: HouseIcon,
	[ENUM_PREVIEW_OPTION_EVENT.FLIGHT]: PlaneIcon,
	[ENUM_PREVIEW_OPTION_EVENT.TRANSPORTATION]: DrivingIcon,
	[ENUM_PREVIEW_OPTION_EVENT.SUPPLEMENT]: BoxOutlineIcon,
	[ENUM_PREVIEW_OPTION_EVENT.MULTIPLY_OPTION]: TaskSquareIcon,
	[ENUM_PREVIEW_OPTION_EVENT.INFO]: InfoCircleIcon,
	[ENUM_PREVIEW_OPTION_EVENT.ACTIVITY]: TicketStarIcon
};

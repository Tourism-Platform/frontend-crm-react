import type { ComponentType, SVGProps } from "react";

import { HouseIcon, PlaneIcon } from "@/shared/assets";

import { ENUM_PICKUP_TYPE, type ENUM_PICKUP_TYPE_TYPE } from "@/entities/tour";

/** Те же иконки, что у перелёта и проживания в ленте маршрута (`OPTION_EVENT_ICONS`) */
export const PICKUP_ICONS: Record<
	ENUM_PICKUP_TYPE_TYPE,
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	[ENUM_PICKUP_TYPE.AIRPORT]: PlaneIcon,
	[ENUM_PICKUP_TYPE.HOTEL]: HouseIcon
};

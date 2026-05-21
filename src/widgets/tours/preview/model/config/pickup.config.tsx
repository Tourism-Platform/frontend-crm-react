import { Building, type LucideIcon, Plane } from "lucide-react";

import { ENUM_PICKUP_TYPE, type ENUM_PICKUP_TYPE_TYPE } from "@/entities/tour";

export const PICKUP_ICONS: Record<ENUM_PICKUP_TYPE_TYPE, LucideIcon> = {
	[ENUM_PICKUP_TYPE.AIRPORT]: Plane,
	[ENUM_PICKUP_TYPE.HOTEL]: Building
};

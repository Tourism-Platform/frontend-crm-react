import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_CLIENT_TYPE_OPTIONS,
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE
} from "../types";

export const BOOKING_CLIENT_TYPE_LABELS: Record<
	ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	TOptionsKeys
> = {
	[ENUM_CLIENT_TYPE_OPTIONS.AGENCY]: "booking.order.client_types.agency",
	[ENUM_CLIENT_TYPE_OPTIONS.DIRECT]: "booking.order.client_types.direct",
	[ENUM_CLIENT_TYPE_OPTIONS.CORPORATE]: "booking.order.client_types.corporate"
};

export const BOOKING_CLIENT_TYPE_VARIANTS: Record<
	ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	BadgeVariant
> = {
	[ENUM_CLIENT_TYPE_OPTIONS.AGENCY]: "yellow",
	[ENUM_CLIENT_TYPE_OPTIONS.DIRECT]: "green",
	[ENUM_CLIENT_TYPE_OPTIONS.CORPORATE]: "blue"
};

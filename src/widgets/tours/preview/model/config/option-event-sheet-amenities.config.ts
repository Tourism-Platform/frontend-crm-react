import { Coffee, Dumbbell, type LucideIcon, Star, Wifi } from "lucide-react";

import {
	ENUM_ACCOMMODATION_AMENITY,
	type ENUM_ACCOMMODATION_AMENITY_TYPE
} from "@/entities/tour";

export const SHEET_AMENITY_ICONS: Partial<
	Record<ENUM_ACCOMMODATION_AMENITY_TYPE, LucideIcon>
> = {
	[ENUM_ACCOMMODATION_AMENITY.WIFI]: Wifi,
	[ENUM_ACCOMMODATION_AMENITY.GYM]: Dumbbell,
	[ENUM_ACCOMMODATION_AMENITY.RESTAURANT]: Coffee,
	[ENUM_ACCOMMODATION_AMENITY.SPA]: Star,
	[ENUM_ACCOMMODATION_AMENITY.BREAKFAST]: Coffee,
	[ENUM_ACCOMMODATION_AMENITY.POOL]: Star
};

export const getSheetAmenityIcon = (
	amenity: ENUM_ACCOMMODATION_AMENITY_TYPE
): LucideIcon => SHEET_AMENITY_ICONS[amenity] ?? Wifi;

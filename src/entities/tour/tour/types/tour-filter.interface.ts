import type { ENUM_TOUR_STATUS_TYPE } from "./tour-status.types";
import type { ITourCard } from "./tour.interface";

export interface ITourFilters {
	search: string;
	status: ENUM_TOUR_STATUS_TYPE[];
	page: number;
	limit: number;
}

export type TTourSelectOption = {
	label: string;
	value: string;
} & ITourCard;

import type { DateRange } from "react-day-picker";

import type { TSearchTours } from "./search-tours-form.types";

export interface IRecentSearch {
	id: string;
	destination: string;
	label?: string;
	dates: DateRange;
	searchTours: TSearchTours;
}

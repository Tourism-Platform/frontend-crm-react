import type { DateRange } from "react-day-picker";

import type { TSearchTours } from "../schema";

export interface IRecentSearch {
	id: string;
	destination: string;
	label?: string;
	dates: DateRange;
	searchTours: TSearchTours;
}

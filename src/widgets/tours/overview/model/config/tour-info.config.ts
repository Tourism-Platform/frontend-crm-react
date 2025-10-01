import { formatToDollars } from "@/shared/utils";

import type { ITourInfoOverview } from "../types";

export const TOUR_INFO_LIST: Partial<ITourInfoOverview>[] = [
	{
		label: "info.total",
		key: "total"
	},
	{
		label: "info.completed",
		key: "completed"
	},
	{
		label: "info.in_progress",
		key: "in_progress"
	},
	{
		label: "info.tourists",
		key: "tourists"
	},
	{
		label: "info.confirmed_revenue",
		key: "confirmed_revenue",
		func: formatToDollars
	},
	{
		label: "info.potential_revenue",
		key: "potential_revenue",
		func: formatToDollars
	}
];

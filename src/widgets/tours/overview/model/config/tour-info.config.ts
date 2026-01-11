import { formatToDollars } from "@/shared/utils";

import type { ITourInfoOverview } from "../types";

export const TOUR_INFO_LIST: Partial<ITourInfoOverview>[] = [
	{
		label: "info.fields.total",
		key: "total"
	},
	{
		label: "info.fields.completed",
		key: "completed"
	},
	{
		label: "info.fields.in_progress",
		key: "inProgress"
	},
	{
		label: "info.fields.tourists",
		key: "tourists"
	},
	{
		label: "info.fields.confirmed_revenue",
		key: "confirmedRevenue",
		func: formatToDollars
	},
	{
		label: "info.fields.potential_revenue",
		key: "potentialRevenue",
		func: formatToDollars
	}
];

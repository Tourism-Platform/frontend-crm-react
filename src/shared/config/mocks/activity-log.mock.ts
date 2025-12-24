import type { IActivityLogItem } from "@/entities/activity-log";

export const ACTIVITY_LOG_MOCK: IActivityLogItem[] = [
	{
		id: "1",
		title: "Tour created",
		user: "User",
		date: "28 aug. 2025, 14:40 PM"
	},
	{
		id: "2",
		title: "Added flight component",
		user: "User",
		date: "28 aug. 2025, 14:40 PM"
	},
	{
		id: "3",
		title: 'Edited Flight component "London to Tashkent" (Pricing & booking tab)',
		user: "User",
		date: "28 aug. 2025, 14:40 PM"
	},
	{
		id: "4",
		title: 'Edited Flight component "London to tashkent" (General info tab)',
		user: "User",
		date: "28 aug. 2025, 14:40 PM"
	}
];

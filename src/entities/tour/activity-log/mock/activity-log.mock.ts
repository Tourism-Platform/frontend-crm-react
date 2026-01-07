import type { IActivityLogBackend } from "../types";

export const ACTIVITY_LOG_MOCK: IActivityLogBackend[] = [
	{
		id: "1",
		title: "Tour created",
		user: "Admin",
		date: "2025-08-28T14:40:00Z"
	},
	{
		id: "2",
		title: "Added flight component",
		user: "Manager",
		date: "2025-08-28T14:45:00Z"
	},
	{
		id: "3",
		title: 'Edited Flight component "London to Tashkent"',
		user: "Manager",
		date: "2025-08-28T15:00:00Z"
	},
	{
		id: "4",
		title: 'Edited Flight component "London to tashkent" (General info)',
		user: "Admin",
		date: "2025-08-28T15:10:00Z"
	},
	{
		id: "5",
		title: "Added hotel component 'Grand Hotel'",
		user: "Manager",
		date: "2025-08-28T15:30:00Z"
	},
	{
		id: "6",
		title: "Updated tour pricing",
		user: "Admin",
		date: "2025-08-28T16:00:00Z"
	},
	{
		id: "7",
		title: "Added transfer: Airport to Hotel",
		user: "Manager",
		date: "2025-08-28T16:15:00Z"
	},
	{
		id: "8",
		title: "Tour status changed to 'Published'",
		user: "Admin",
		date: "2025-08-28T17:00:00Z"
	},
	{
		id: "9",
		title: "Added guide: John Doe",
		user: "Manager",
		date: "2025-08-29T10:00:00Z"
	},
	{
		id: "10",
		title: "Updated itinerary description",
		user: "Admin",
		date: "2025-08-29T10:30:00Z"
	},
	{
		id: "11",
		title: "Added excursion: City Tour",
		user: "Manager",
		date: "2025-08-29T11:00:00Z"
	},
	{
		id: "12",
		title: "Modified flight departure time",
		user: "Admin",
		date: "2025-08-29T12:00:00Z"
	},
	{
		id: "13",
		title: "Added meal plan: All Inclusive",
		user: "Manager",
		date: "2025-08-29T13:00:00Z"
	},
	{
		id: "14",
		title: "Updated hotel availability",
		user: "Admin",
		date: "2025-08-29T14:00:00Z"
	},
	{
		id: "15",
		title: "Added insurance info",
		user: "Manager",
		date: "2025-08-29T15:00:00Z"
	},
	{
		id: "16",
		title: "Tour duplicate created",
		user: "Admin",
		date: "2025-08-30T09:00:00Z"
	},
	{
		id: "17",
		title: "Added flight component 'Istanbul to Rome'",
		user: "Manager",
		date: "2025-08-30T10:00:00Z"
	},
	{
		id: "18",
		title: "Updated villa availability",
		user: "Admin",
		date: "2025-08-30T11:00:00Z"
	},
	{
		id: "19",
		title: "Added activity: Wine Tasting",
		user: "Manager",
		date: "2025-08-30T12:00:00Z"
	},
	{
		id: "20",
		title: "Tour metadata updated",
		user: "Admin",
		date: "2025-08-30T13:00:00Z"
	}
];

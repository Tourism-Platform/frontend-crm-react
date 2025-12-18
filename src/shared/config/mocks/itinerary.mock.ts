import { v4 as uuidv4 } from "uuid";

export const ITINERARY_TABS_MOCK = [
	{ id: 1, name: "Option 1" },
	{ id: 2, name: "Option 2" },
	{ id: 3, name: "Option 3" }
];

export const ITINERARY_ROUTES_MOCK = {
	1: {
		tripDetails: [],
		days: {
			1: [
				{
					id: uuidv4(),
					block_id: "day1-1",
					event_type: "flight",
					title: "DOM - TAS",
					subtitle: "7:30 AM (UTC +5) - 12:30 AM (UTC +5)"
				}
			],
			2: [],
			3: [],
			4: []
		},
		dayOrder: [1, 2, 3, 4]
	},
	2: {
		tripDetails: [
			{
				id: uuidv4(),
				block_id: "trip-1",
				event_type: "accommodation",
				title: "Hotel Royal",
				subtitle: "Check-in: 2:00 PM"
			}
		],
		days: { 1: [], 2: [], 3: [], 4: [] },
		dayOrder: [1, 2, 3, 4]
	},
	3: {
		tripDetails: [],
		days: { 1: [], 2: [], 3: [], 4: [] },
		dayOrder: [1, 2, 3, 4]
	}
};

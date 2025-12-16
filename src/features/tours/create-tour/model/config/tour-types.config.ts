export const TOUR_TYPE_OPTIONS = [
	{ label: "Private", value: "private" },
	{ label: "Group", value: "group" },
	{ label: "Private/Group", value: "private_group" }
];

export type TTourTypeValue = (typeof TOUR_TYPE_OPTIONS)[number]["value"];

import { ENUM_TOUR_TYPES } from "../types";
import type { ITourGeneralBackend } from "../types";

export const TOUR_GENERAL_MOCK: ITourGeneralBackend = {
	id: "9f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11",
	title: "Embark on an Unforgettable Archaeological Journey",
	type: ENUM_TOUR_TYPES.GROUP,
	group_size: 15,
	duration_from: 5,
	duration_to: 10,
	age_requires_from: 18,
	age_requires_to: 65,
	categories: ["archaeology", "cultural"]
};

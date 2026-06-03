import { TourCategory, TourStatus, TourType } from "@/shared/api";

import type { TGetPreviewTourBackendResponse } from "../types";

export const PREVIEW_TOUR_GENERAL_MOCK: TGetPreviewTourBackendResponse = {
	id: "9f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11",
	status: TourStatus.Archived,
	operator_id: "123",
	schedule_id: "123",
	agency_id: "123",
	landing_id: "123",
	cover_image_path: "123",
	duration_hours: 10,
	typ: TourType.Regular,
	name: "Embark on an Unforgettable Archaeological Journey",
	group_size: 15,
	days: 10,
	nights: 10,
	age_from: 18,
	age_to: 65,
	categories: [TourCategory.AdventureOutdoor]
};

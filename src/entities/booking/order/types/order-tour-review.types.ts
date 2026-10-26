import type { ITourReviewItem } from "@/entities/tour/tour/types/tour-review.interface";

import type { IBookingEventAvailability } from "./booking-availability.types";

export interface IOrderTourReviewItem extends ITourReviewItem {
	eventId?: string;
	availability?: IBookingEventAvailability;
	subRows?: IOrderTourReviewItem[];
}

export interface IBookingEventOption {
	value: string;
	label: string;
}

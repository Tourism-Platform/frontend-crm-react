import type { ENUM_EVENT_TYPE } from "@/entities/tour";

import type { ENUM_AVAILABILITY_STATUS_TYPE } from "./availability-status.types";

export interface IBookingEventAvailability {
	id: string;
	bookingId: string;
	eventId: string;
	optionIndex: number;
	status: ENUM_AVAILABILITY_STATUS_TYPE;
	eventName: string | null;
	eventType: ENUM_EVENT_TYPE | null;
}

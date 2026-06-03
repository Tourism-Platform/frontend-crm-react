import type { AvailabilityStatus } from "@/shared/api";

export interface IBookingEventAvailability {
	id: string;
	bookingId: string;
	eventId: string;
	optionIndex: number;
	status: AvailabilityStatus;
}

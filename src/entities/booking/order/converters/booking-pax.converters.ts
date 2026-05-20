import { formatDate } from "@/shared/utils";

import type {
	IBookingPax,
	TBookingPaxBackend,
	TBookingPaxListBackendResponce
} from "../types";

export const mapBookingPaxToFrontend = (
	data: TBookingPaxBackend
): IBookingPax => ({
	id: data.id,
	bookingId: data.booking_id,
	name: data.full_name,
	surname: data.full_name,
	gender: data.gender,
	nationality: data.nationality,
	dateOfBirth: formatDate(data.date_of_birth),
	passportNum: data.passport_number,
	passportExpiryDate: formatDate(data.expired_date),
	comment: data.comment
});

export const mapBookingPaxListToFrontend = (
	data: TBookingPaxListBackendResponce
): IBookingPax[] => data.map(mapBookingPaxToFrontend);

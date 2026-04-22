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
	name: data.name,
	surname: data.surname,
	gender: data.gender,
	nationality: data.nationality,
	dateOfBirth: formatDate(data.date_of_birth),
	passportNum: data.passport_num,
	passportExpiryDate: formatDate(data.passport_expiry_date),
	comment: data.comment
});

export const mapBookingPaxListToFrontend = (
	data: TBookingPaxListBackendResponce
): IBookingPax[] => data.map(mapBookingPaxToFrontend);

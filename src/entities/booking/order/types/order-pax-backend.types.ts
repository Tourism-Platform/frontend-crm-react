import type { BookingPaxModel, OperatorFilesModel } from "@/shared/api";
import type { BOOKING_PASSENGER_PATHS } from "@/shared/api";

export type TBookingPaxBackend = BookingPaxModel;

export type TBookingPaxListBackendResponce = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.listPassengerInfo
>["_types"]["response"];

export type TAddPassengerResponseBackend = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.addPassengerInfo
>["_types"]["response"];

export interface IBookingPax {
	id: string;
	bookingId: string;
	name: string;
	surname: string;
	gender: TBookingPaxBackend["gender"];
	nationality: TBookingPaxBackend["nationality"];
	dateOfBirth: string;
	passportNum: string;
	passportExpiryDate: string;
	comment: string | null;
}

export type TOperatorFile = OperatorFilesModel;

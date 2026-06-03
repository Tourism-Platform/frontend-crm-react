import type { BookingModel, Currency } from "@/shared/api";

export interface ICreateBookingRequest {
	tourOptionId: string;
	date: Date | string;
	pax: number;
	comment?: string | null;
}

export interface ICreatedBooking {
	id: string;
	tourOptionId: string;
	date: string;
	endDate: string;
	pax: number;
	tourAmount: string;
	tourCurrency: Currency;
}

export type TSubmittedBooking = ICreatedBooking;

export type TBookingModelBackend = BookingModel;

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import type { ENUM_LANGUAGES_TYPE } from "@/entities/tour/landing";

export interface ICreateBookingRequest {
	tourOptionId: string;
	date: Date | string;
	pax: number;
	lang: ENUM_LANGUAGES_TYPE;
	comment?: string | null;
}

export interface ICreatedBooking {
	id: string;
	tourOptionId: string;
	date: string;
	endDate: string;
	pax: number;
	tourAmount: string;
	tourCurrency: ENUM_CURRENCY_OPTIONS_TYPE;
}

export type TSubmittedBooking = ICreatedBooking;

import { type ITourReviewItem, type ITourSummary } from "@/entities/tour";

import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";

export interface IPaxReviewDetail {
	id: string;
	type: string;
	value: string;
	metadata?: {
		fileName?: string;
		fileSize?: string;
	};
}

export interface IPaxReviewItem {
	id: string;
	fullName: string;
	gender: "Male" | "Female";
	nationality: string;
	dateOfBirth: string;
	passportNumber: string;
	expiredDate: string;
	items: IPaxReviewDetail[];
}

export interface IOrderDates {
	from: string;
	to: string;
}

export interface IOrder {
	orderId: string;
	orderType: string;
	dateCreated: string;
	client: string;
	clientType: string;
	pax: number;
	dates: IOrderDates;
	// New fields
	tourName: string;
	duration: string;
	route: string;
	comment?: string;
	email: string;
	phone: string;
	roomType?: string;
	carClass?: string;
	status: ENUM_ORDER_STATUS_TYPE;
	paxDetails?: IPaxReviewItem[];
	tourReview: ITourReviewItem[];
	tourSummary: ITourSummary;
}

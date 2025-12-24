import { type ITourReviewItem, type ITourSummary } from "@/entities/tour";

import { type ENUM_CLIENT_TYPE_OPTIONS_TYPE } from "./client-type.types";
import { type ENUM_GENDER_OPTIONS_TYPE } from "./gender.types";
import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";
import { type ENUM_ORDER_TYPE_OPTIONS_TYPE } from "./order-type.types";

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
	gender: ENUM_GENDER_OPTIONS_TYPE;
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
	orderType: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	dateCreated: string;
	client: string;
	clientType: ENUM_CLIENT_TYPE_OPTIONS_TYPE;
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

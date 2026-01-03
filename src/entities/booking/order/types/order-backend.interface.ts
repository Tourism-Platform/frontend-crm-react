import { type IOrderSupplierPaymentItem } from "@/entities/finance";
import { type ITourReviewItem, type ITourSummary } from "@/entities/tour";

import { type IOrderDates, type IPaxReviewItem } from "./order.interface";

export interface IBookingOrderBackend {
	order_id: string;
	order_type: string;
	date_created: string;
	client: string;
	client_type: string;
	pax: number;
	dates: IOrderDates;
	tour_name: string;
	duration: string;
	route: string;
	comment: string | null;
	email: string;
	phone: string;
	room_type: string | null;
	car_class: string | null;
	is_available: boolean;
	manager: string | null;
	invoice_status: string | null;
	report: string | null;
	status: string;
	pax_details: IPaxReviewItem[] | null;
	tour_review: ITourReviewItem[];
	supplier_payments: IOrderSupplierPaymentItem[] | null;
	tour_summary: ITourSummary;
}

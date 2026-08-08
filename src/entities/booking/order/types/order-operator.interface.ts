import type { ITourSummary } from "@/entities/tour/tour/types/tour-review.interface";

import type { ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";
import type { ENUM_ORDER_STATUS_TYPE } from "./order-status.types";
import type { IOrderTourReviewItem } from "./order-tour-review.types";
import type { ENUM_ORDER_TYPE_OPTIONS_TYPE } from "./order-type.types";
import type {
	IOrderAgencyInfo,
	IOrderDates,
	IOrderTourInfo,
	IOrderUserInfo,
	IPaxReviewItem
} from "./order.interface";
import type { ISupplierPaymentItem } from "./supplier-payment.interface";

export interface IOperatorOrderDetail {
	orderId: string;
	orderNumber: string;
	orderType: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	status: ENUM_ORDER_STATUS_TYPE;
	pax: number;
	dates: IOrderDates;
	tourName: string;
	tourOptionId: string;
	tour: IOrderTourInfo;
	duration: string;
	route: string;
	comment?: string;
	tourAmount: string;
	paidAmount: string;
	agencyId?: string | null;
	userId?: string | null;
	agency?: IOrderAgencyInfo | null;
	user?: IOrderUserInfo | null;
	roomType?: string;
	carClass?: string;
	report?: string;
	invoiceStatus?: ENUM_INVOICE_STATUS_TYPE;
	paxDetails?: IPaxReviewItem[];
	tourReview?: IOrderTourReviewItem[];
	supplierPayments?: ISupplierPaymentItem[];
	tourSummary?: ITourSummary;
}

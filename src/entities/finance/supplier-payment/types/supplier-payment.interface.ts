import { type TFileMetadata } from "@/shared/hooks";
import { type IPaginationResponse } from "@/shared/types";

import type {
	ENUM_EVENT_KIND_TYPE,
	ENUM_EVENT_TYPE
} from "@/entities/tour/itinerary/types/event-enum.types";

import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";

export interface ISupplierPayment {
	id: string;
	/** Display: order_number */
	orderId: string;
	bookingId: string;
	component: string;
	type: string;
	/** null — тип события не пришёл или неизвестен */
	eventKind: ENUM_EVENT_KIND_TYPE | null;
	/** Тип события на борде (flight/train/bus → flight) */
	eventType: ENUM_EVENT_TYPE | null;
	supplier: string;
	dateCreated: string;
	amount: number;
	currency: string;
	manager: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
	receiptCount: number;
	note?: string;
	files?: TFileMetadata[];
}

export type TSupplierPaymentStatusCounts = Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	number
>;

export interface ISupplierPaymentPaginatedResponse
	extends IPaginationResponse<ISupplierPayment> {
	statusCounts: TSupplierPaymentStatusCounts;
}

export interface IOrderSupplierPaymentItem {
	id: string;
	item: string;
	supplierPayment: number | string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}

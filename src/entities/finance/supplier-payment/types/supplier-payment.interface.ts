import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment.types";

export interface ISupplierPayment {
	id: string;
	orderId: string;
	component: string;
	type: string;
	supplier: string;
	dateCreated: string;
	amount: number;
	currency: string;
	manager: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}

export interface IConfirmedFile {
	fileName: string;
	fileUrl: string;
}

export interface IOrderSupplierPaymentItem {
	id: string;
	item: string;
	type?: string; // For icon/color logic from OrderTourReview
	confirmation?: IConfirmedFile;
	supplierPayment: number | string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
	subRows?: IOrderSupplierPaymentItem[];
}

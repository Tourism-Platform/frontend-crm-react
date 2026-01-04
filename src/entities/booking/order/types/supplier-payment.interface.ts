import type { IDownloadFile } from "@/shared/hooks";

import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment-status.types";

export interface ISupplierPaymentItem {
	id: string;
	item: string;
	type: string; // For icon/color logic from OrderTourReview
	confirmation?: IDownloadFile;
	supplierPayment: number | string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
	subRows?: ISupplierPaymentItem[];
}

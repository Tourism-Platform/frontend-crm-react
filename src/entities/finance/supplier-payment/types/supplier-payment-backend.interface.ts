import type {
	OPERATOR_SUPPLIER_PAYMENT_PATHS,
	SupplierPaymentFile,
	SupplierPaymentListRowOutput,
	SupplierPaymentResponse,
	SupplierPaymentUpdate
} from "@/shared/api";

import type { TSupplierPaymentStatusCounts } from "./supplier-payment.interface";

export type TSupplierPaymentBackend = SupplierPaymentResponse;

export type TSupplierPaymentListBackendResponse =
	typeof OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments._types.response;

export type TSupplierPaymentListResponseInput =
	TSupplierPaymentListBackendResponse & {
		status_counts?: TSupplierPaymentStatusCounts;
	};

export type TUpdateSupplierPaymentBackend = SupplierPaymentUpdate;
export type TSupplierPaymentFileBackend = SupplierPaymentFile;
export type TSupplierPaymentListRowOutputBackend = SupplierPaymentListRowOutput;

export type TSupplierPaymentListQueryBackend =
	typeof OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments._types.query;

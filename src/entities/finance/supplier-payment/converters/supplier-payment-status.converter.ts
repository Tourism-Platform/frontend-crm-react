import { SupplierPaymentStatus } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE
} from "../types";

const MAP_SUPPLIER_PAYMENT_STATUS: Partial<
	Record<ENUM_SUPPLIER_PAYMENT_STATUS_TYPE, SupplierPaymentStatus>
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: SupplierPaymentStatus.Paid,
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: SupplierPaymentStatus.NotPaid
};

export const supplierPaymentStatusConverter = createEnumMapper<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	SupplierPaymentStatus
>(MAP_SUPPLIER_PAYMENT_STATUS);

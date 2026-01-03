import { authHandlers } from "@/entities/auth/api/auth.mock";
import { commissionHandlers } from "@/entities/commission";
import {
	financeClientPaymentHandlers,
	financeInvoiceHandlers,
	financeSupplierPaymentHandlers
} from "@/entities/finance";
import { staffHandlers } from "@/entities/staff";
import { tourHandlers } from "@/entities/tour";
import {
	accountHandlers,
	businessDocumentsHandlers,
	businessHandlers
} from "@/entities/user/handlers";

export const handlers = [
	...authHandlers,
	...accountHandlers,
	...businessHandlers,
	...businessDocumentsHandlers,
	...staffHandlers,
	...commissionHandlers,
	...tourHandlers,
	...financeInvoiceHandlers,
	...financeClientPaymentHandlers,
	...financeSupplierPaymentHandlers
];

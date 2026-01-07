import { activityLogHandlers } from "@/entities/activity-log";
import { authHandlers } from "@/entities/auth/api/auth.mock";
import { bookingOrderHandlers } from "@/entities/booking/order/handlers/booking-order.handlers";
import { commissionHandlers } from "@/entities/commission";
import {
	financeClientPaymentHandlers,
	financeInvoiceHandlers,
	financeReconciliationHandler,
	financeSupplierPaymentHandlers
} from "@/entities/finance";
import { staffHandlers } from "@/entities/staff";
import { tourHandlers, tourOrderHandlers } from "@/entities/tour";
import {
	accountHandlers,
	businessDocumentsHandlers,
	businessHandlers
} from "@/entities/user";

export const handlers = [
	...authHandlers,
	...accountHandlers,
	...businessHandlers,
	...businessDocumentsHandlers,
	...staffHandlers,
	...commissionHandlers,
	...tourHandlers,
	...tourOrderHandlers,
	...financeInvoiceHandlers,
	...financeClientPaymentHandlers,
	...financeSupplierPaymentHandlers,
	...financeReconciliationHandler,
	...activityLogHandlers,
	...bookingOrderHandlers
];

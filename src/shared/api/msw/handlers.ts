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
import {
	tourCatalogHandlers,
	tourHandlers,
	tourLandingHandlers,
	tourOrderHandlers
} from "@/entities/tour";
import { tourActivityLogHandlers } from "@/entities/tour/activity-log";
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
	...financeInvoiceHandlers,
	...financeClientPaymentHandlers,
	...financeSupplierPaymentHandlers,
	...financeReconciliationHandler,
	...tourHandlers,
	...tourLandingHandlers,
	...tourActivityLogHandlers,
	...tourOrderHandlers,
	...tourCatalogHandlers,
	...bookingOrderHandlers
];

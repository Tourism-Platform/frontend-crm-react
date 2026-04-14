import { authHandlers } from "@/entities/auth/api/auth.mock";
import { bookingOrderHandlers } from "@/entities/booking/order/handlers/booking-order.handlers";
import { commissionHandlers } from "@/entities/commission/handlers/commission.handlers";
import { financeClientPaymentHandlers } from "@/entities/finance/client-payment/handlers/payment.handlers";
import { financeInvoiceHandlers } from "@/entities/finance/invoice/handlers/invoice.handlers";
import { financeReconciliationHandler } from "@/entities/finance/reconciliation/handlers/reconciliation.handlers";
import { financeSupplierPaymentHandlers } from "@/entities/finance/supplier-payment/handlers/supplier-payment.handlers";
import { staffHandlers } from "@/entities/staff/handlers/staff.handlers";
import { tourActivityLogHandlers } from "@/entities/tour/activity-log/handlers/activity-log.handlers";
import { tourCatalogHandlers } from "@/entities/tour/catalog/handlers/catalog-tour.handlers";
import { tourLandingHandlers } from "@/entities/tour/landing/handlers/landing.handlers";
import { tourOrderHandlers } from "@/entities/tour/order/handlers/tour-order.handlers";
import { tourHandlers } from "@/entities/tour/tour/handlers/tour.handlers";
import { accountHandlers } from "@/entities/user/handlers/account.handlers";
import { businessDocumentsHandlers } from "@/entities/user/handlers/business-documents.handlers";
import { businessHandlers } from "@/entities/user/handlers/business.handlers";

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

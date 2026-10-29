import { auditHandlers } from "@/entities/audit/handlers";
import { authHandlers } from "@/entities/auth/handlers";
import {
	bookingAvailabilityHandlers,
	bookingOrderHandlers,
	bookingPaxHandlers,
	bookingRevisionHandlers,
	bookingVoucherHandlers
} from "@/entities/booking/order/handlers";
import { fxRateHandlers } from "@/entities/commission/handlers";
import { financeClientPaymentHandlers } from "@/entities/finance/client-payment/handlers/payment.handlers";
import { operatorPaymentRoutesHandlers } from "@/entities/finance/finance-information/handlers";
import { invoiceDocumentHandlers } from "@/entities/finance/invoice/handlers/invoice-document.handlers";
import { financeInvoiceHandlers } from "@/entities/finance/invoice/handlers/invoice.handlers";
import { ledgerHandlers } from "@/entities/finance/ledger/handlers";
import { financeReconciliationHandler } from "@/entities/finance/reconciliation/handlers/reconciliation.handlers";
import { financeSupplierPaymentHandlers } from "@/entities/finance/supplier-payment/handlers/supplier-payment.handlers";
import { geoHandlers } from "@/entities/geo/handlers";
import { staffHandlers } from "@/entities/staff/handlers";
import { supplierHandlers } from "@/entities/supplier/handlers";
import { tourActivityLogHandlers } from "@/entities/tour/activity-log/handlers/activity-log.handlers";
import { tourCatalogHandlers } from "@/entities/tour/catalog/handlers/catalog-tour.handlers";
import { eventLibraryHandlers } from "@/entities/tour/event-library/handlers";
import { itineraryHandlers } from "@/entities/tour/itinerary/handlers/itinerary.handlers";
import { pricingReviewHandlers } from "@/entities/tour/itinerary/handlers/pricing-review.handlers";
import { tourLandingHandlers } from "@/entities/tour/landing/handlers/landing.handlers";
import { tourOrderHandlers } from "@/entities/tour/order/handlers/tour-order.handlers";
import { tourPreviewTourHandlers } from "@/entities/tour/preview-tour";
import { scheduleHandlers } from "@/entities/tour/schedule/handlers";
import { tourHandlers } from "@/entities/tour/tour/handlers/tour.handlers";
import { accountHandlers } from "@/entities/user/account/handlers/account.handlers";
import { agencyHandlers } from "@/entities/user/agency/handlers";
import {
	operatorByIdHandlers,
	operatorHandlers
} from "@/entities/user/operator/handlers";

import { unmockedHandlers } from "./unmocked.handlers";

export const handlers = [
	...authHandlers,
	...accountHandlers,
	...operatorHandlers,
	...operatorPaymentRoutesHandlers,
	...agencyHandlers,
	...staffHandlers,
	...fxRateHandlers,
	...financeSupplierPaymentHandlers,
	...financeInvoiceHandlers,
	...invoiceDocumentHandlers,
	...financeClientPaymentHandlers,
	...financeReconciliationHandler,
	...ledgerHandlers,
	...auditHandlers,
	...tourHandlers,
	...tourLandingHandlers,
	...tourActivityLogHandlers,
	...tourOrderHandlers,
	...tourCatalogHandlers,
	// После каталога: `/tour/:tourId/public` перекрывает `/tour/catalog/public`
	...tourPreviewTourHandlers,
	...scheduleHandlers,
	...pricingReviewHandlers,
	...itineraryHandlers,
	...eventLibraryHandlers,
	...supplierHandlers,
	...bookingOrderHandlers,
	...bookingPaxHandlers,
	...bookingAvailabilityHandlers,
	...bookingRevisionHandlers,
	...bookingVoucherHandlers,
	...geoHandlers,
	// `/operator/:id` перекрывает `/operator/fx-rate` и т.п. — после конкретных путей
	...operatorByIdHandlers,
	// Последними: всё незамоканное к API отдаёт 501
	...unmockedHandlers
];

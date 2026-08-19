import { Permissions } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_PERMISSION, type ENUM_PERMISSION_TYPE } from "../types";

const MAP_PERMISSION: Record<ENUM_PERMISSION_TYPE, Permissions> = {
	[ENUM_PERMISSION.TOUR_READ]: Permissions.TourRead,
	[ENUM_PERMISSION.TOUR_CREATE]: Permissions.TourCreate,
	[ENUM_PERMISSION.TOUR_UPDATE]: Permissions.TourUpdate,
	[ENUM_PERMISSION.TOUR_DELETE]: Permissions.TourDelete,
	[ENUM_PERMISSION.TOUR_PUBLISH]: Permissions.TourPublish,
	[ENUM_PERMISSION.TOUR_ARCHIVE]: Permissions.TourArchive,
	[ENUM_PERMISSION.TOUR_OPTION_WRITE]: Permissions.TourOptionWrite,
	[ENUM_PERMISSION.TOUR_EVENT_WRITE]: Permissions.TourEventWrite,
	[ENUM_PERMISSION.TOUR_EVENT_LIBRARY_READ]: Permissions.TourEventLibraryRead,
	[ENUM_PERMISSION.TOUR_EVENT_LIBRARY_WRITE]:
		Permissions.TourEventLibraryWrite,
	[ENUM_PERMISSION.TOUR_GALLERY_WRITE]: Permissions.TourGalleryWrite,
	[ENUM_PERMISSION.TOUR_LANDING_WRITE]: Permissions.TourLandingWrite,
	[ENUM_PERMISSION.TOUR_SCHEDULE_WRITE]: Permissions.TourScheduleWrite,
	[ENUM_PERMISSION.TOUR_FINANCE_READ]: Permissions.TourFinanceRead,
	[ENUM_PERMISSION.TOUR_FINANCE_WRITE]: Permissions.TourFinanceWrite,
	[ENUM_PERMISSION.CATALOG_READ]: Permissions.CatalogRead,
	[ENUM_PERMISSION.BOOKING_READ]: Permissions.BookingRead,
	[ENUM_PERMISSION.BOOKING_WRITE]: Permissions.BookingWrite,
	[ENUM_PERMISSION.BOOKING_CANCEL]: Permissions.BookingCancel,
	[ENUM_PERMISSION.BOOKING_TRANSITION]: Permissions.BookingTransition,
	[ENUM_PERMISSION.BOOKING_FINANCE_READ]: Permissions.BookingFinanceRead,
	[ENUM_PERMISSION.BOOKING_PAX_WRITE]: Permissions.BookingPaxWrite,
	[ENUM_PERMISSION.BOOKING_REVISION_WRITE]: Permissions.BookingRevisionWrite,
	[ENUM_PERMISSION.BOOKING_PAYMENT_READ]: Permissions.BookingPaymentRead,
	[ENUM_PERMISSION.BOOKING_PAYMENT_WRITE]: Permissions.BookingPaymentWrite,
	[ENUM_PERMISSION.BOOKING_PAYMENT_CONFIRM]:
		Permissions.BookingPaymentConfirm,
	[ENUM_PERMISSION.BOOKING_AVAILABILITY_WRITE]:
		Permissions.BookingAvailabilityWrite,
	[ENUM_PERMISSION.BOOKING_VOUCHER_WRITE]: Permissions.BookingVoucherWrite,
	[ENUM_PERMISSION.BOOKING_RECONCILIATION_READ]:
		Permissions.BookingReconciliationRead,
	[ENUM_PERMISSION.INVOICE_READ]: Permissions.InvoiceRead,
	[ENUM_PERMISSION.INVOICE_WRITE]: Permissions.InvoiceWrite,
	[ENUM_PERMISSION.INVOICE_PAYMENT_WRITE]: Permissions.InvoicePaymentWrite,
	[ENUM_PERMISSION.LEDGER_READ]: Permissions.LedgerRead,
	[ENUM_PERMISSION.SUPPLIER_READ]: Permissions.SupplierRead,
	[ENUM_PERMISSION.SUPPLIER_WRITE]: Permissions.SupplierWrite,
	[ENUM_PERMISSION.OPERATOR_INFO_READ]: Permissions.OperatorInfoRead,
	[ENUM_PERMISSION.OPERATOR_INFO_WRITE]: Permissions.OperatorInfoWrite,
	[ENUM_PERMISSION.OPERATOR_DELETE]: Permissions.OperatorDelete,
	[ENUM_PERMISSION.OPERATOR_FINANCIALS_READ]:
		Permissions.OperatorFinancialsRead,
	[ENUM_PERMISSION.OPERATOR_FINANCIALS_WRITE]:
		Permissions.OperatorFinancialsWrite,
	[ENUM_PERMISSION.OPERATOR_FILES_READ]: Permissions.OperatorFilesRead,
	[ENUM_PERMISSION.OPERATOR_FILES_WRITE]: Permissions.OperatorFilesWrite,
	[ENUM_PERMISSION.OPERATOR_AGENCIES_READ]: Permissions.OperatorAgenciesRead,
	[ENUM_PERMISSION.OPERATOR_AGENCIES_WRITE]:
		Permissions.OperatorAgenciesWrite,
	[ENUM_PERMISSION.FX_RATE_READ]: Permissions.FxRateRead,
	[ENUM_PERMISSION.FX_RATE_WRITE]: Permissions.FxRateWrite,
	[ENUM_PERMISSION.SUPPLIER_PAYMENT_READ]: Permissions.SupplierPaymentRead,
	[ENUM_PERMISSION.SUPPLIER_PAYMENT_WRITE]: Permissions.SupplierPaymentWrite,
	[ENUM_PERMISSION.PAYMENT_ROUTE_READ]: Permissions.PaymentRouteRead,
	[ENUM_PERMISSION.PAYMENT_ROUTE_WRITE]: Permissions.PaymentRouteWrite,
	[ENUM_PERMISSION.AGENCY_INFO_READ]: Permissions.AgencyInfoRead,
	[ENUM_PERMISSION.AGENCY_INFO_WRITE]: Permissions.AgencyInfoWrite,
	[ENUM_PERMISSION.STAFF_READ]: Permissions.StaffRead,
	[ENUM_PERMISSION.STAFF_MANAGE]: Permissions.StaffManage,
	[ENUM_PERMISSION.AUDIT_READ]: Permissions.AuditRead
};

export const permissionConverter = createEnumMapper<
	ENUM_PERMISSION_TYPE,
	Permissions
>(MAP_PERMISSION);

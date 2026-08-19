import { type TOptionsKeys } from "@/shared/config";

import { ENUM_PERMISSION, type ENUM_PERMISSION_TYPE } from "../types";

export const PERMISSION_LABELS: Record<ENUM_PERMISSION_TYPE, TOptionsKeys> = {
	[ENUM_PERMISSION.TOUR_READ]: "staff.permissions.tour_read",
	[ENUM_PERMISSION.TOUR_CREATE]: "staff.permissions.tour_create",
	[ENUM_PERMISSION.TOUR_UPDATE]: "staff.permissions.tour_update",
	[ENUM_PERMISSION.TOUR_DELETE]: "staff.permissions.tour_delete",
	[ENUM_PERMISSION.TOUR_PUBLISH]: "staff.permissions.tour_publish",
	[ENUM_PERMISSION.TOUR_ARCHIVE]: "staff.permissions.tour_archive",
	[ENUM_PERMISSION.TOUR_OPTION_WRITE]: "staff.permissions.tour_option_write",
	[ENUM_PERMISSION.TOUR_EVENT_WRITE]: "staff.permissions.tour_event_write",
	[ENUM_PERMISSION.TOUR_EVENT_LIBRARY_READ]:
		"staff.permissions.tour_event_library_read",
	[ENUM_PERMISSION.TOUR_EVENT_LIBRARY_WRITE]:
		"staff.permissions.tour_event_library_write",
	[ENUM_PERMISSION.TOUR_GALLERY_WRITE]:
		"staff.permissions.tour_gallery_write",
	[ENUM_PERMISSION.TOUR_LANDING_WRITE]:
		"staff.permissions.tour_landing_write",
	[ENUM_PERMISSION.TOUR_SCHEDULE_WRITE]:
		"staff.permissions.tour_schedule_write",
	[ENUM_PERMISSION.TOUR_FINANCE_READ]: "staff.permissions.tour_finance_read",
	[ENUM_PERMISSION.TOUR_FINANCE_WRITE]:
		"staff.permissions.tour_finance_write",
	[ENUM_PERMISSION.CATALOG_READ]: "staff.permissions.catalog_read",
	[ENUM_PERMISSION.BOOKING_READ]: "staff.permissions.booking_read",
	[ENUM_PERMISSION.BOOKING_WRITE]: "staff.permissions.booking_write",
	[ENUM_PERMISSION.BOOKING_CANCEL]: "staff.permissions.booking_cancel",
	[ENUM_PERMISSION.BOOKING_TRANSITION]:
		"staff.permissions.booking_transition",
	[ENUM_PERMISSION.BOOKING_FINANCE_READ]:
		"staff.permissions.booking_finance_read",
	[ENUM_PERMISSION.BOOKING_PAX_WRITE]: "staff.permissions.booking_pax_write",
	[ENUM_PERMISSION.BOOKING_REVISION_WRITE]:
		"staff.permissions.booking_revision_write",
	[ENUM_PERMISSION.BOOKING_PAYMENT_READ]:
		"staff.permissions.booking_payment_read",
	[ENUM_PERMISSION.BOOKING_PAYMENT_WRITE]:
		"staff.permissions.booking_payment_write",
	[ENUM_PERMISSION.BOOKING_PAYMENT_CONFIRM]:
		"staff.permissions.booking_payment_confirm",
	[ENUM_PERMISSION.BOOKING_AVAILABILITY_WRITE]:
		"staff.permissions.booking_availability_write",
	[ENUM_PERMISSION.BOOKING_VOUCHER_WRITE]:
		"staff.permissions.booking_voucher_write",
	[ENUM_PERMISSION.BOOKING_RECONCILIATION_READ]:
		"staff.permissions.booking_reconciliation_read",
	[ENUM_PERMISSION.INVOICE_READ]: "staff.permissions.invoice_read",
	[ENUM_PERMISSION.INVOICE_WRITE]: "staff.permissions.invoice_write",
	[ENUM_PERMISSION.INVOICE_PAYMENT_WRITE]:
		"staff.permissions.invoice_payment_write",
	[ENUM_PERMISSION.LEDGER_READ]: "staff.permissions.ledger_read",
	[ENUM_PERMISSION.SUPPLIER_READ]: "staff.permissions.supplier_read",
	[ENUM_PERMISSION.SUPPLIER_WRITE]: "staff.permissions.supplier_write",
	[ENUM_PERMISSION.OPERATOR_INFO_READ]:
		"staff.permissions.operator_info_read",
	[ENUM_PERMISSION.OPERATOR_INFO_WRITE]:
		"staff.permissions.operator_info_write",
	[ENUM_PERMISSION.OPERATOR_DELETE]: "staff.permissions.operator_delete",
	[ENUM_PERMISSION.OPERATOR_FINANCIALS_READ]:
		"staff.permissions.operator_financials_read",
	[ENUM_PERMISSION.OPERATOR_FINANCIALS_WRITE]:
		"staff.permissions.operator_financials_write",
	[ENUM_PERMISSION.OPERATOR_FILES_READ]:
		"staff.permissions.operator_files_read",
	[ENUM_PERMISSION.OPERATOR_FILES_WRITE]:
		"staff.permissions.operator_files_write",
	[ENUM_PERMISSION.OPERATOR_AGENCIES_READ]:
		"staff.permissions.operator_agencies_read",
	[ENUM_PERMISSION.OPERATOR_AGENCIES_WRITE]:
		"staff.permissions.operator_agencies_write",
	[ENUM_PERMISSION.FX_RATE_READ]: "staff.permissions.fx_rate_read",
	[ENUM_PERMISSION.FX_RATE_WRITE]: "staff.permissions.fx_rate_write",
	[ENUM_PERMISSION.SUPPLIER_PAYMENT_READ]:
		"staff.permissions.supplier_payment_read",
	[ENUM_PERMISSION.SUPPLIER_PAYMENT_WRITE]:
		"staff.permissions.supplier_payment_write",
	[ENUM_PERMISSION.PAYMENT_ROUTE_READ]:
		"staff.permissions.payment_route_read",
	[ENUM_PERMISSION.PAYMENT_ROUTE_WRITE]:
		"staff.permissions.payment_route_write",
	[ENUM_PERMISSION.AGENCY_INFO_READ]: "staff.permissions.agency_info_read",
	[ENUM_PERMISSION.AGENCY_INFO_WRITE]: "staff.permissions.agency_info_write",
	[ENUM_PERMISSION.STAFF_READ]: "staff.permissions.staff_read",
	[ENUM_PERMISSION.STAFF_MANAGE]: "staff.permissions.staff_manage",
	[ENUM_PERMISSION.AUDIT_READ]: "staff.permissions.audit_read"
};

import { ENUM_PATH } from "@/shared/config";

import type { TBreadcrumbList } from "./types";

export const BREADCRUMB_LIST: TBreadcrumbList = {
	// Settings — operator
	[ENUM_PATH.OPERATOR.SETTINGS.ROOT]: "operator.settings.title",
	[ENUM_PATH.OPERATOR.SETTINGS.ACCOUNT_SETTINGS]:
		"operator.settings.personal.menu.account",
	[ENUM_PATH.OPERATOR.SETTINGS.SECURITY]:
		"operator.settings.personal.menu.security",
	[ENUM_PATH.OPERATOR.SETTINGS.NOTIFICATIONS]:
		"operator.settings.personal.menu.notifications",
	[ENUM_PATH.OPERATOR.SETTINGS.BUSINESS_SETTINGS]:
		"operator.settings.business.menu.business",
	[ENUM_PATH.OPERATOR.SETTINGS.STAFF_INFORMATION]:
		"operator.settings.business.menu.staff",
	[ENUM_PATH.OPERATOR.SETTINGS.FINANCIAL_SETTINGS]:
		"operator.settings.business.menu.financial",
	[ENUM_PATH.OPERATOR.SETTINGS.TOUR_SETTINGS]:
		"operator.settings.business.menu.tour",
	[ENUM_PATH.OPERATOR.SETTINGS.TAGS]: "operator.settings.business.menu.tags",

	// Settings — agency
	[ENUM_PATH.AGENCY.SETTINGS.ROOT]: "agency.settings.title",
	[ENUM_PATH.AGENCY.SETTINGS.ACCOUNT_SETTINGS]:
		"agency.settings.personal.menu.account",
	[ENUM_PATH.AGENCY.SETTINGS.SECURITY]:
		"agency.settings.personal.menu.security",
	[ENUM_PATH.AGENCY.SETTINGS.NOTIFICATIONS]:
		"agency.settings.personal.menu.notifications",
	[ENUM_PATH.AGENCY.SETTINGS.BUSINESS_SETTINGS]:
		"agency.settings.business.menu.business",
	[ENUM_PATH.AGENCY.SETTINGS.FINANCIAL_SETTINGS]:
		"agency.settings.business.menu.financial",

	// Tours
	[ENUM_PATH.TOURS.ROOT]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.CATALOG.ROOT]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.CATALOG.PREVIEW_OPTION]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.CATALOG.BOOKING]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.SEARCH]: "operator.tours.general.title",
	[ENUM_PATH.TOURS.OVERVIEW]: "operator.tours.general.menu.overview",
	[ENUM_PATH.TOURS.LANDING]: "operator.tours.general.menu.landing",
	[ENUM_PATH.TOURS.ITINERARY]: "operator.tours.general.menu.itinerary",
	[ENUM_PATH.TOURS.SCHEDULE]: "operator.tours.general.menu.schedule",
	[ENUM_PATH.TOURS.PRICING_REVIEW]:
		"operator.tours.general.menu.pricing_review",
	[ENUM_PATH.TOURS.ORDER_HISTORY]: "operator.tours.more.menu.order_history",
	[ENUM_PATH.TOURS.MESSAGES]: "operator.tours.more.menu.messages",
	[ENUM_PATH.TOURS.ACTIVITY_LOG]: "operator.tours.more.menu.activity_log",
	[ENUM_PATH.TOURS.SETTINGS]: "operator.tours.more.menu.settings",

	// Booking
	[ENUM_PATH.BOOKING.ROOT]: "operator.booking.title",
	[ENUM_PATH.BOOKING.ORDERS]: "operator.booking.general.menu.orders",
	[ENUM_PATH.BOOKING.ORDER_ID]: "operator.booking.general.menu.orders",
	[ENUM_PATH.BOOKING.APPEALS]: "operator.booking.general.menu.appeals",

	// Finance
	[ENUM_PATH.FINANCE.ROOT]: "operator.finance.title",
	[ENUM_PATH.FINANCE.INVOICES]: "operator.finance.general.menu.invoices",
	[ENUM_PATH.FINANCE.INVOICE_ID]: "operator.finance.general.menu.invoices",
	[ENUM_PATH.FINANCE.CLIENT_PAYMENTS]:
		"operator.finance.general.menu.client_payments",
	[ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS]:
		"operator.finance.general.menu.supplier_payments",
	[ENUM_PATH.FINANCE.RECONCILIATION]:
		"operator.finance.general.menu.reconciliation",
	[ENUM_PATH.FINANCE.RECONCILIATION_ID]:
		"operator.finance.general.menu.reconciliation"
};

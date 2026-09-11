import { ENUM_PATH } from "@/shared/config";

import type { TBreadcrumbTrail } from "./types";

const libraryEvent = (pattern: string): TBreadcrumbTrail => ({
	pattern,
	crumbs: [
		{ type: "i18n", key: "operator.library.title" },
		{
			type: "i18n",
			key: "operator.library.general.menu.events",
			to: ENUM_PATH.LIBRARY.EVENTS
		},
		{ type: "dynamic", param: "libraryId" }
	]
});

const libraryProduct = (pattern: string): TBreadcrumbTrail => ({
	pattern,
	crumbs: [
		{ type: "i18n", key: "operator.library.title" },
		{
			type: "i18n",
			key: "operator.library.general.menu.suppliers",
			to: ENUM_PATH.LIBRARY.SUPPLIERS
		},
		{ type: "dynamic", toPattern: ENUM_PATH.LIBRARY.SUPPLIER },
		{ type: "dynamic" }
	]
});

/**
 * More specific patterns must come first (matchPath first-hit wins).
 * Settings trails omitted — section has no breadcrumbs.
 */
export const BREADCRUMB_TRAILS: TBreadcrumbTrail[] = [
	// Finance
	{
		pattern: ENUM_PATH.FINANCE.INVOICE_ID,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{
				type: "i18n",
				key: "operator.finance.general.menu.invoices",
				to: ENUM_PATH.FINANCE.INVOICES
			},
			{ type: "dynamic" }
		]
	},
	{
		pattern: ENUM_PATH.FINANCE.INVOICES,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{ type: "i18n", key: "operator.finance.general.menu.invoices" }
		]
	},
	{
		pattern: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{
				type: "i18n",
				key: "operator.finance.general.menu.client_payments"
			}
		]
	},
	{
		pattern: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{
				type: "i18n",
				key: "operator.finance.general.menu.supplier_payments"
			}
		]
	},
	{
		pattern: ENUM_PATH.FINANCE.RECONCILIATION_ID,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{
				type: "i18n",
				key: "operator.finance.general.menu.reconciliation",
				to: ENUM_PATH.FINANCE.RECONCILIATION
			},
			{ type: "dynamic" }
		]
	},
	{
		pattern: ENUM_PATH.FINANCE.RECONCILIATION,
		crumbs: [
			{ type: "i18n", key: "operator.finance.title" },
			{
				type: "i18n",
				key: "operator.finance.general.menu.reconciliation"
			}
		]
	},

	// Booking — operator
	{
		pattern: ENUM_PATH.OPERATOR.BOOKING.ORDER_ID,
		crumbs: [
			{ type: "i18n", key: "operator.booking.title" },
			{
				type: "i18n",
				key: "operator.booking.general.menu.orders",
				to: ENUM_PATH.OPERATOR.BOOKING.ORDERS
			},
			{ type: "dynamic" }
		]
	},
	{
		pattern: ENUM_PATH.OPERATOR.BOOKING.ORDERS,
		crumbs: [
			{ type: "i18n", key: "operator.booking.title" },
			{ type: "i18n", key: "operator.booking.general.menu.orders" }
		]
	},
	{
		pattern: ENUM_PATH.OPERATOR.BOOKING.APPEALS,
		crumbs: [
			{ type: "i18n", key: "operator.booking.title" },
			{ type: "i18n", key: "operator.booking.general.menu.appeals" }
		]
	},

	// Booking — agency
	{
		pattern: ENUM_PATH.AGENCY.BOOKING.ORDER_ID,
		crumbs: [
			{ type: "i18n", key: "agency.booking.title" },
			{
				type: "i18n",
				key: "agency.booking.general.menu.orders",
				to: ENUM_PATH.AGENCY.BOOKING.ORDERS
			},
			{ type: "dynamic" }
		]
	},
	{
		pattern: ENUM_PATH.AGENCY.BOOKING.ORDERS,
		crumbs: [
			{ type: "i18n", key: "agency.booking.title" },
			{ type: "i18n", key: "agency.booking.general.menu.orders" }
		]
	},
	{
		pattern: ENUM_PATH.AGENCY.BOOKING.APPEALS,
		crumbs: [
			{ type: "i18n", key: "agency.booking.title" },
			{ type: "i18n", key: "agency.booking.general.menu.appeals" }
		]
	},

	// Library — products / suppliers
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT_NEW),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT_NEW),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_FLIGHT_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_FLIGHT_PRODUCT_NEW),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_BUS_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_BUS_PRODUCT_NEW),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_TRANSFER_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_TRANSFER_PRODUCT_NEW),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_ACTIVITY_PRODUCT),
	libraryProduct(ENUM_PATH.LIBRARY.SUPPLIER_ACTIVITY_PRODUCT_NEW),
	{
		pattern: ENUM_PATH.LIBRARY.SUPPLIER,
		crumbs: [
			{ type: "i18n", key: "operator.library.title" },
			{
				type: "i18n",
				key: "operator.library.general.menu.suppliers",
				to: ENUM_PATH.LIBRARY.SUPPLIERS
			},
			{ type: "dynamic" }
		]
	},
	{
		pattern: ENUM_PATH.LIBRARY.SUPPLIERS,
		crumbs: [
			{ type: "i18n", key: "operator.library.title" },
			{ type: "i18n", key: "operator.library.general.menu.suppliers" }
		]
	},

	// Library — events
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_TRANSFER),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_SUPPLEMENT),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_GUIDE),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_FLIGHT),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_ACCOMMODATION),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_ACTIVITY),
	libraryEvent(ENUM_PATH.LIBRARY.EVENT_INFO),
	{
		pattern: ENUM_PATH.LIBRARY.EVENTS,
		crumbs: [
			{ type: "i18n", key: "operator.library.title" },
			{ type: "i18n", key: "operator.library.general.menu.events" }
		]
	},
	{
		pattern: ENUM_PATH.LIBRARY.ITINERARIES,
		crumbs: [
			{ type: "i18n", key: "operator.library.title" },
			{ type: "i18n", key: "operator.library.general.menu.itineraries" }
		]
	}
];

export const ENUM_PATH = {
	MAIN: "/",
	LOGIN: "/login",
	NOT_FOUND: "/*",
	SETTINGS: {
		ROOT: "/settings",
		ACCOUNT_SETTINGS: "/settings/account-settings",
		SECURITY: "/settings/security",
		NOTIFICATIONS: "/settings/notifications",
		BUSINESS_SETTINGS: "/settings/business-settings",
		STAFF_INFORMATION: "/settings/staff-information",
		FINANCIAL_SETTINGS: "/settings/financial-settings",
		TOUR_SETTINGS: "/settings/tour-settings",
		TAGS: "/settings/tags"
	},
	TOURS: {
		ROOT: "/tours",
		OVERVIEW: "/tours/:tourId/overview",
		ITINERARY: "/tours/:tourId/itinerary",
		SCHEDULE: "/tours/:tourId/schedule",
		PRICING_REVIEW: "/tours/:tourId/pricing-review",
		ORDER_HISTORY: "/tours/:tourId/order-history",
		MESSAGES: "/tours/:tourId/messages",
		ACTIVITY_LOG: "/tours/:tourId/activity-log",
		EVENTS: {
			ROOT: "/tours/:tourId/itinerary/events",
			FLIGHT: "/tours/:tourId/itinerary/events/:eventId/flight",
			EVENT: "/tours/:tourId/itinerary/events/:eventId/event",
			TRANSFER: "/tours/:tourId/itinerary/events/:eventId/transfer",
			ACCOMMODATION:
				"/tours/:tourId/itinerary/events/:eventId/accommodation",
			MULTIPLY_OPTION:
				"/tours/:tourId/itinerary/events/:eventId/multiply-option",
			TOUR_DETAILS:
				"/tours/:tourId/itinerary/events/:eventId/tour-details",
			INFO: "/tours/:tourId/itinerary/events/:eventId/info"
		}
	},
	BOOKING: {
		ROOT: "/booking",
		ORDERS: "/booking/orders",
		ORDER_ID: "/booking/orders/:orderId",
		APPEALS: "/booking/appeals"
	},
	FINANCE: {
		ROOT: "/finance",
		INVOICES: "/finance/invoices",
		INVOICE_ID: "/finance/invoices/:invoiceId",
		CLIENT_PAYMENTS: "/finance/client-payments",
		SUPPLIER_PAYMENTS: "/finance/supplier-payments",
		RECONCILIATION: "/finance/reconciliation",
		RECONCILIATION_ID: "/finance/reconciliation/:reconciliationId"
	}
} as const;

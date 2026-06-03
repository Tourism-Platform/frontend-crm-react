export const ENUM_PATH = {
	MAIN: "/",
	LOGIN: "/login",
	NOT_FOUND: "/*",
	OPERATOR: {
		SETTINGS: {
			ROOT: "/operator/settings",
			ACCOUNT_SETTINGS: "/operator/settings/account-settings",
			SECURITY: "/operator/settings/security",
			NOTIFICATIONS: "/operator/settings/notifications",
			BUSINESS_SETTINGS: "/operator/settings/business-settings",
			STAFF_INFORMATION: "/operator/settings/staff-information",
			FINANCIAL_SETTINGS: "/operator/settings/financial-settings",
			TOUR_SETTINGS: "/operator/settings/tour-settings",
			TAGS: "/operator/settings/tags"
		}
	},
	AGENCY: {
		SETTINGS: {
			ROOT: "/agency/settings",
			ACCOUNT_SETTINGS: "/agency/settings/account-settings",
			SECURITY: "/agency/settings/security",
			NOTIFICATIONS: "/agency/settings/notifications",
			BUSINESS_SETTINGS: "/agency/settings/business-settings",
			FINANCIAL_SETTINGS: "/agency/settings/financial-settings"
		}
	},
	TOURS: {
		ROOT: "/tours",
		CATALOG: {
			ROOT: "/tours/catalog",
			PREVIEW_TOUR: "/tours/catalog/preview/:tourId",
			PREVIEW_OPTION: "/tours/catalog/preview/:tourId/option/:optionId",
			BOOKING: "/tours/catalog/preview/:tourId/booking/:bookingId?"
		},
		SEARCH: "/tours/search",
		OVERVIEW: "/tours/:tourId/overview",
		ITINERARY: "/tours/:tourId/itinerary",
		SCHEDULE: "/tours/:tourId/schedule",
		PRICING_REVIEW: "/tours/:tourId/pricing-review",
		ORDER_HISTORY: "/tours/:tourId/order-history",
		MESSAGES: "/tours/:tourId/messages",
		LANDING: "/tours/:tourId/landing",
		ACTIVITY_LOG: "/tours/:tourId/activity-log",
		SETTINGS: "/tours/:tourId/settings",
		EVENTS: {
			ROOT: "/tours/:tourId/itinerary/:optionId/events",
			FLIGHT: "/tours/:tourId/itinerary/:optionId/events/:eventId/flight",
			EVENT: "/tours/:tourId/itinerary/:optionId/events/:eventId/event",
			TRANSFER:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/transfer",
			ACCOMMODATION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/accommodation",
			MULTIPLY_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/multiply-option",
			TOUR_DETAILS:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/tour-details",
			INFO: "/tours/:tourId/itinerary/:optionId/events/:eventId/info"
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

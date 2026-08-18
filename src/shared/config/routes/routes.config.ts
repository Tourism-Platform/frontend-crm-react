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
		},
		BOOKING: {
			ROOT: "/operator/booking",
			ORDERS: "/operator/booking/orders",
			ORDER_ID: "/operator/booking/orders/:orderId",
			APPEALS: "/operator/booking/appeals"
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
		},
		BOOKING: {
			ROOT: "/agency/booking",
			ORDERS: "/agency/booking/orders",
			ORDER_ID: "/agency/booking/orders/:orderId",
			APPEALS: "/agency/booking/appeals"
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
		DRAFT_PREVIEW: "/tours/:tourId/draft-preview",
		DRAFT_PREVIEW_OPTION: "/tours/:tourId/draft-preview/option/:optionId",
		OVERVIEW: "/tours/:tourId/overview",
		ITINERARY: "/tours/:tourId/itinerary",
		SCHEDULE: "/tours/:tourId/schedule",
		PRICING_REVIEW: "/tours/:tourId/pricing-review",
		PACKAGE: "/tours/:tourId/pricing-review/:optionId/packages/:packageId",
		ORDER_HISTORY: "/tours/:tourId/order-history",
		MESSAGES: "/tours/:tourId/messages",
		LANDING: "/tours/:tourId/landing",
		ACTIVITY_LOG: "/tours/:tourId/activity-log",
		SETTINGS: "/tours/:tourId/settings",
		EVENTS: {
			ROOT: "/tours/:tourId/itinerary/:optionId/events",
			FLIGHT: "/tours/:tourId/itinerary/:optionId/events/:eventId/flight",
			FLIGHT_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/flight",
			EVENT: "/tours/:tourId/itinerary/:optionId/events/:eventId/event",
			EVENT_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/event",
			TRANSFER:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/transfer",
			TRANSFER_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/transfer",
			SUPPLEMENT:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/supplement",
			SUPPLEMENT_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/supplement",
			GUIDE: "/tours/:tourId/itinerary/:optionId/events/:eventId/guide",
			GUIDE_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/guide",
			ACCOMMODATION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/accommodation",
			ACCOMMODATION_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/accommodation",
			MULTIPLY_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/multiply-option",
			TOUR_DETAILS:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/tour-details",
			INFO: "/tours/:tourId/itinerary/:optionId/events/:eventId/info",
			INFO_OPTION:
				"/tours/:tourId/itinerary/:optionId/events/:eventId/options/:eventOptionId/info"
		}
	},
	FINANCE: {
		ROOT: "/finance",
		INVOICES: "/finance/invoices",
		INVOICE_ID: "/finance/invoices/:invoiceId",
		CLIENT_PAYMENTS: "/finance/client-payments",
		SUPPLIER_PAYMENTS: "/finance/supplier-payments",
		RECONCILIATION: "/finance/reconciliation",
		RECONCILIATION_ID: "/finance/reconciliation/:bookingId"
	},
	LIBRARY: {
		ROOT: "/library",
		EVENTS: "/library/events",
		EVENT_TRANSFER: "/library/events/:libraryId/transfer",
		EVENT_SUPPLEMENT: "/library/events/:libraryId/supplement",
		EVENT_GUIDE: "/library/events/:libraryId/guide",
		EVENT_FLIGHT: "/library/events/:libraryId/flight",
		EVENT_ACCOMMODATION: "/library/events/:libraryId/accommodation",
		EVENT_ACTIVITY: "/library/events/:libraryId/activity",
		EVENT_INFO: "/library/events/:libraryId/info",
		ITINERARIES: "/library/itineraries",
		SUPPLIERS: "/library/suppliers"
	}
} as const;

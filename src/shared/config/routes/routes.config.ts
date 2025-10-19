export const ENUM_PATH = {
	// MAIN: "/",
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
		BOOKING_REQUESTS: "/booking/booking-requests",
		APPEALS: "/booking/appeals"
	}
} as const;

export const ENUM_PATH = {
	MAIN: "/",
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
		OVERVIEW: "/tours/overview",
		ITINERARY: "/tours/itinerary",
		SCHEDULE: "/tours/schedule",
		PRICING_REVIEW: "/tours/pricing-review",
		ORDER_HISTORY: "/tours/order-history",
		MESSAGES: "/tours/messages",
		ACTIVITY_LOG: "/tours/activity-log"
	},
	BOOKING: {
		ROOT: "/booking",
		BOOKING_REQUESTS: "/booking/booking-requests",
		APPEALS: "/booking/appeals"
	}
} as const;

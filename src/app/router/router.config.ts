import {
	BOOKING_SIDEBAR_LIST,
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	type IRouting,
	SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";

import { AppealsPage, BookingRequestsPage } from "@/pages/booking";
import { NotFoundPage } from "@/pages/not-found-page";
import {
	AccountSettingsPage,
	BusinessSettingsPage,
	FinancialSettingsPage,
	NotificationsPage,
	SecurityPage,
	StaffInformationPage,
	TagsPage,
	TourSettingsPage
} from "@/pages/settings";
import {
	ActivityLogPage,
	ItineraryPage,
	MessagesPage,
	OrderHistoryPage,
	OverviewPage,
	PricingReviewPage,
	SchedulePage,
	ToursPage
} from "@/pages/tours";

export const ALL_APP_ROUTES_LIST: IRouting[] = [
	// only public
	// settings
	{
		path: ENUM_PATH.SETTINGS.ACCOUNT_SETTINGS,
		component: AccountSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.BUSINESS_SETTINGS,
		component: BusinessSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.FINANCIAL_SETTINGS,
		component: FinancialSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.NOTIFICATIONS,
		component: NotificationsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.SECURITY,
		component: SecurityPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.STAFF_INFORMATION,
		component: StaffInformationPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.TAGS,
		component: TagsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},
	{
		path: ENUM_PATH.SETTINGS.TOUR_SETTINGS,
		component: TourSettingsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: SETTINGS_SIDEBAR_LIST,
		useBreadcrumb: true
	},

	// tours
	{
		path: ENUM_PATH.TOURS.ROOT,
		component: ToursPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT
	},
	{
		path: ENUM_PATH.TOURS.OVERVIEW,
		component: OverviewPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.ITINERARY,
		component: ItineraryPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.SCHEDULE,
		component: SchedulePage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.PRICING_REVIEW,
		component: PricingReviewPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.ORDER_HISTORY,
		component: OrderHistoryPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.MESSAGES,
		component: MessagesPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.TOURS.ACTIVITY_LOG,
		component: ActivityLogPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: TOURS_SIDEBAR_LIST
	},

	// booking
	{
		path: ENUM_PATH.BOOKING.APPEALS,
		component: AppealsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: BOOKING_SIDEBAR_LIST
	},
	{
		path: ENUM_PATH.BOOKING.BOOKING_REQUESTS,
		component: BookingRequestsPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT,
		sidebarMenu: BOOKING_SIDEBAR_LIST
	},

	// 404
	{
		path: ENUM_PATH.NOT_FOUND,
		component: NotFoundPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.ROOT
	}
];

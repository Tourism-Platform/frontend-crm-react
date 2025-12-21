import {
	BOOKING_SIDEBAR_LIST,
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	type IRouting,
	SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";

import {
	BookingOwnerLayout,
	EventOwnerLayout,
	SettingsOwnerLayout,
	SideBarOwnerLayout,
	TourOwnerLayout,
	ToursOwnerLayout
} from "@/widgets/layouts";

import { AppealsPage, BookingRequestsPage } from "@/pages/booking";
import { LoginPage } from "@/pages/login";
import { MainPage } from "@/pages/main";
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
	AccommodationEditPage,
	ActivityLogPage,
	EventEditPage,
	FlightEditPage,
	InformationEditPage,
	ItineraryPage,
	MessagesPage,
	MultiplyOptionEditPage,
	OrderHistoryPage,
	OverviewPage,
	PricingReviewPage,
	SchedulePage,
	ToursPage,
	TransportationEditPage
} from "@/pages/tours";

export const ALL_APP_ROUTES_LIST: IRouting[] = [
	// only public

	// login
	{
		path: ENUM_PATH.LOGIN,
		component: LoginPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: ENUM_LAYOUT.DEFAULT
	},
	{
		path: ENUM_PATH.MAIN,
		component: MainPage,
		auth: ENUM_AUTH.PUBLIC,
		layout: ENUM_LAYOUT.DEFAULT
	},

	// only private

	// settings
	{
		path: ENUM_PATH.SETTINGS.ACCOUNT_SETTINGS,
		component: AccountSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.BUSINESS_SETTINGS,
		component: BusinessSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.FINANCIAL_SETTINGS,
		component: FinancialSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.NOTIFICATIONS,
		component: NotificationsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.SECURITY,
		component: SecurityPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.STAFF_INFORMATION,
		component: StaffInformationPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.TAGS,
		component: TagsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},
	{
		path: ENUM_PATH.SETTINGS.TOUR_SETTINGS,
		component: TourSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			SettingsOwnerLayout
		]
	},

	// tours
	{
		path: ENUM_PATH.TOURS.ROOT,
		component: ToursPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [ToursOwnerLayout]
	},
	{
		path: ENUM_PATH.TOURS.OVERVIEW,
		component: OverviewPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ITINERARY,
		component: ItineraryPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.SCHEDULE,
		component: SchedulePage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.PRICING_REVIEW,
		component: PricingReviewPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ORDER_HISTORY,
		component: OrderHistoryPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.MESSAGES,
		component: MessagesPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ACTIVITY_LOG,
		component: ActivityLogPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			TourOwnerLayout
		]
	},

	// events
	{
		path: ENUM_PATH.TOURS.EVENTS.FLIGHT,
		component: FlightEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.EVENT,
		component: EventEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.TRANSFER,
		component: TransportationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.ACCOMMODATION,
		component: AccommodationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.MULTIPLY_OPTION,
		component: MultiplyOptionEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.INFO,
		component: InformationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			EventOwnerLayout
		]
	},
	// {
	// 	path: ENUM_PATH.TOURS.EVENTS.TOUR_DETAILS,
	// 	component: TourDetailsEditPage,
	// 	auth: ENUM_AUTH.PRIVATE,
	// 	layout: ENUM_LAYOUT.ROOT,
	// 	layout_cascade: [
	// 		({ children }: { children: React.ReactNode }) => (
	// 			<SideBarOwnerLayout items={TOURS_SIDEBAR_LIST}>
	// 				{children}
	// 			</SideBarOwnerLayout>
	// 		),
	// 		EventOwnerLayout
	// 	]
	// },

	// booking
	{
		path: ENUM_PATH.BOOKING.APPEALS,
		component: AppealsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={BOOKING_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			BookingOwnerLayout
		]
	},
	{
		path: ENUM_PATH.BOOKING.BOOKING_REQUESTS,
		component: BookingRequestsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={BOOKING_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			BookingOwnerLayout
		]
	},

	// 404
	{
		path: ENUM_PATH.NOT_FOUND,
		component: NotFoundPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT
	}
];

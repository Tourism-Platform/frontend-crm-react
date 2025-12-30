import React from "react";

import {
	BOOKING_SIDEBAR_LIST,
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	FINANCE_SIDEBAR_LIST,
	type IRouting,
	SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";

import {
	BookingOwnerLayout,
	EventOwnerLayout,
	FinanceOwnerLayout,
	SettingsOwnerLayout,
	SideBarOwnerLayout,
	TourOwnerLayout,
	ToursOwnerLayout
} from "@/widgets/layouts";

// Lazy loading страниц для корректной работы Suspense
const LoginPage = React.lazy(() =>
	import("@/pages/login/ui/login-page").then((m) => ({
		default: m.LoginPage
	}))
);
const MainPage = React.lazy(() =>
	import("@/pages/main/ui/main-page").then((m) => ({ default: m.MainPage }))
);
const NotFoundPage = React.lazy(() =>
	import("@/pages/not-found-page/ui/not-found-page").then((m) => ({
		default: m.NotFoundPage
	}))
);

// Settings pages
const AccountSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings/account-settings-page/ui/account-settings-page"
	).then((m) => ({ default: m.AccountSettingsPage }))
);
const BusinessSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings/business-settings-page/ui/business-settings-page"
	).then((m) => ({ default: m.BusinessSettingsPage }))
);
const FinancialSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings/financial-settings-page/ui/financial-settings-page"
	).then((m) => ({ default: m.FinancialSettingsPage }))
);
const NotificationsPage = React.lazy(() =>
	import("@/pages/settings/notifications-page/ui/notifications-page").then(
		(m) => ({ default: m.NotificationsPage })
	)
);
const SecurityPage = React.lazy(() =>
	import("@/pages/settings/security-page/ui/security-page").then((m) => ({
		default: m.SecurityPage
	}))
);
const StaffInformationPage = React.lazy(() =>
	import(
		"@/pages/settings/staff-information-page/ui/staff-information-page"
	).then((m) => ({ default: m.StaffInformationPage }))
);
const TagsPage = React.lazy(() =>
	import("@/pages/settings/tags-page/ui/tags-page").then((m) => ({
		default: m.TagsPage
	}))
);
const TourSettingsPage = React.lazy(() =>
	import("@/pages/settings/tour-settings-page/ui/tour-settings-page").then(
		(m) => ({ default: m.TourSettingsPage })
	)
);

// Tours pages
const ToursPage = React.lazy(() =>
	import("@/pages/tours/tours-page/ui/tours-page").then((m) => ({
		default: m.ToursPage
	}))
);
const OverviewPage = React.lazy(() =>
	import("@/pages/tours/overview-page/ui/overview-page").then((m) => ({
		default: m.OverviewPage
	}))
);
const ItineraryPage = React.lazy(() =>
	import("@/pages/tours/itinerary-page/ui/itinerary-page").then((m) => ({
		default: m.ItineraryPage
	}))
);
const SchedulePage = React.lazy(() =>
	import("@/pages/tours/schedule-page/ui/schedule-page").then((m) => ({
		default: m.SchedulePage
	}))
);
const PricingReviewPage = React.lazy(() =>
	import("@/pages/tours/pricing-review-page/ui/pricing-review-page").then(
		(m) => ({ default: m.PricingReviewPage })
	)
);
const OrderHistoryPage = React.lazy(() =>
	import("@/pages/tours/order-history-page/ui/order-history-page").then(
		(m) => ({ default: m.OrderHistoryPage })
	)
);
const MessagesPage = React.lazy(() =>
	import("@/pages/tours/messages-page/ui/messages-page").then((m) => ({
		default: m.MessagesPage
	}))
);
const LandingPage = React.lazy(() =>
	import("@/pages/tours/landing-page/ui/landing-page").then((m) => ({
		default: m.LandingPage
	}))
);
const ActivityLogPage = React.lazy(() =>
	import("@/pages/tours/activity-log-page/ui/activity-log-page").then(
		(m) => ({ default: m.ActivityLogPage })
	)
);
const SettingsPage = React.lazy(() =>
	import("@/pages/tours/settings-page/ui/settings-page").then((m) => ({
		default: m.SettingsPage
	}))
);

// Events pages
const FlightEditPage = React.lazy(() =>
	import("@/pages/tours/events/flight-edit-page/ui/flight-edit-page").then(
		(m) => ({ default: m.FlightEditPage })
	)
);
const EventEditPage = React.lazy(() =>
	import("@/pages/tours/events/event-edit-page/ui/event-edit-page").then(
		(m) => ({ default: m.EventEditPage })
	)
);
const TransportationEditPage = React.lazy(() =>
	import(
		"@/pages/tours/events/transportation-edit-page/ui/transportation-edit-page"
	).then((m) => ({ default: m.TransportationEditPage }))
);
const AccommodationEditPage = React.lazy(() =>
	import(
		"@/pages/tours/events/accommodation-edit-page/ui/accommodation-edit-page"
	).then((m) => ({ default: m.AccommodationEditPage }))
);
const MultiplyOptionEditPage = React.lazy(() =>
	import(
		"@/pages/tours/events/multiply-option-edit-page/ui/multiply-option-edit-page"
	).then((m) => ({ default: m.MultiplyOptionEditPage }))
);
const InformationEditPage = React.lazy(() =>
	import(
		"@/pages/tours/events/information-edit-page/ui/information-edit-page"
	).then((m) => ({ default: m.InformationEditPage }))
);

// Booking pages
const AppealsPage = React.lazy(() =>
	import("@/pages/booking/appeals-page/ui/appeals-page").then((m) => ({
		default: m.AppealsPage
	}))
);
const OrdersPage = React.lazy(() =>
	import("@/pages/booking/orders-page/ui/orders-page").then((m) => ({
		default: m.OrdersPage
	}))
);
const OrderIdPage = React.lazy(() =>
	import("@/pages/booking/order-id-page/ui/order-id-page").then((m) => ({
		default: m.OrderIdPage
	}))
);

// Finance pages
const InvoicesPage = React.lazy(() =>
	import("@/pages/finance/invoices-page/ui/invoices-page").then((m) => ({
		default: m.InvoicesPage
	}))
);
const InvoiceIdPage = React.lazy(() =>
	import("@/pages/finance/invoice-id-page/ui/invoice-id-page").then((m) => ({
		default: m.InvoiceIdPage
	}))
);
const ClientPaymentsPage = React.lazy(() =>
	import("@/pages/finance/client-payments-page/ui/client-payments-page").then(
		(m) => ({ default: m.ClientPaymentsPage })
	)
);
const SupplierPaymentsPage = React.lazy(() =>
	import(
		"@/pages/finance/supplier-payments-page/ui/supplier-payments-page"
	).then((m) => ({ default: m.SupplierPaymentsPage }))
);
const ReconciliationPage = React.lazy(() =>
	import("@/pages/finance/reconciliation-page/ui/reconciliation-page").then(
		(m) => ({ default: m.ReconciliationPage })
	)
);
const ReconciliationIdPage = React.lazy(() =>
	import(
		"@/pages/finance/reconciliation-id-page/ui/reconciliation-details-page"
	).then((m) => ({ default: m.ReconciliationIdPage }))
);

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
			)
			// SettingsOwnerLayout
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
			)
			// SettingsOwnerLayout
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
			)
			// SettingsOwnerLayout
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
		path: ENUM_PATH.TOURS.LANDING,
		component: LandingPage,
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
	{
		path: ENUM_PATH.TOURS.SETTINGS,
		component: SettingsPage,
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
		path: ENUM_PATH.BOOKING.ORDERS,
		component: OrdersPage,
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
		path: ENUM_PATH.BOOKING.ORDER_ID,
		component: OrderIdPage,
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

	// finance
	{
		path: ENUM_PATH.FINANCE.INVOICES,
		component: InvoicesPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.INVOICE_ID,
		component: InvoiceIdPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
		component: ClientPaymentsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
		component: SupplierPaymentsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.RECONCILIATION,
		component: ReconciliationPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
		]
	},

	{
		path: ENUM_PATH.FINANCE.RECONCILIATION_ID,
		component: ReconciliationIdPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOwnerLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOwnerLayout>
			),
			FinanceOwnerLayout
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

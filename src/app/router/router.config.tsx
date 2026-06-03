import React from "react";

import {
	AGENCY_SETTINGS_SIDEBAR_LIST,
	BOOKING_SIDEBAR_LIST,
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	FINANCE_SIDEBAR_LIST,
	type IRouting,
	OPERATOR_SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";

import {
	BookingOperatorLayout,
	DefaultOperatorLayout,
	EventOperatorLayout,
	FinanceOperatorLayout,
	SettingsAgencyLayout,
	SettingsOperatorLayout,
	SideBarAgencyLayout,
	SideBarOperatorLayout,
	TourOperatorLayout,
	ToursOperatorLayout
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

// Settings pages — operator
const OperatorAccountSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/account-settings-page/ui/account-settings-page"
	).then((m) => ({ default: m.AccountSettingsPage }))
);
const OperatorBusinessSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/business-settings-page/ui/business-settings-page"
	).then((m) => ({ default: m.BusinessSettingsPage }))
);
const OperatorFinancialSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/financial-settings-page/ui/financial-settings-page"
	).then((m) => ({ default: m.FinancialSettingsPage }))
);
const OperatorNotificationsPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/notifications-page/ui/notifications-page"
	).then((m) => ({ default: m.NotificationsPage }))
);
const OperatorSecurityPage = React.lazy(() =>
	import("@/pages/settings-operator/security-page/ui/security-page").then(
		(m) => ({ default: m.SecurityPage })
	)
);
const OperatorStaffInformationPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/staff-information-page/ui/staff-information-page"
	).then((m) => ({ default: m.StaffInformationPage }))
);
const OperatorTagsPage = React.lazy(() =>
	import("@/pages/settings-operator/tags-page/ui/tags-page").then((m) => ({
		default: m.TagsPage
	}))
);
const OperatorTourSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-operator/tour-settings-page/ui/tour-settings-page"
	).then((m) => ({ default: m.TourSettingsPage }))
);

// Settings pages — agency
const AgencyAccountSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-agency/account-settings-page/ui/account-settings-page"
	).then((m) => ({ default: m.AccountSettingsPage }))
);
const AgencyBusinessSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-agency/business-settings-page/ui/business-settings-page"
	).then((m) => ({ default: m.BusinessSettingsPage }))
);
const AgencyFinancialSettingsPage = React.lazy(() =>
	import(
		"@/pages/settings-agency/financial-settings-page/ui/financial-settings-page"
	).then((m) => ({ default: m.FinancialSettingsPage }))
);
const AgencyNotificationsPage = React.lazy(() =>
	import(
		"@/pages/settings-agency/notifications-page/ui/notifications-page"
	).then((m) => ({ default: m.NotificationsPage }))
);
const AgencySecurityPage = React.lazy(() =>
	import("@/pages/settings-agency/security-page/ui/security-page").then(
		(m) => ({
			default: m.SecurityPage
		})
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
const CatalogToursPage = React.lazy(() =>
	import("@/pages/tours/catalog-page/ui/catalog-tours-page").then((m) => ({
		default: m.CatalogToursPage
	}))
);
const SearchToursPage = React.lazy(() =>
	import("@/pages/tours/search-page/ui/search-tours-page").then((m) => ({
		default: m.SearchToursPage
	}))
);

// Events pages
const FlightEditPage = React.lazy(() =>
	import("@/pages/tours/events/flight-edit-page/ui/flight-edit-page").then(
		(m) => ({ default: m.FlightEditPage })
	)
);
const ActivityEditPage = React.lazy(() =>
	import(
		"@/pages/tours/events/activity-edit-page/ui/activity-edit-page"
	).then((m) => ({ default: m.ActivityEditPage }))
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

// Preview tours pages
const PreviewTourPage = React.lazy(() =>
	import("@/pages/tours/preview-tour-page/ui/preview-tour-page").then(
		(m) => ({
			default: m.PreviewTourPage
		})
	)
);
const PreviewOptionPage = React.lazy(() =>
	import("@/pages/tours/preview-option-page/ui/preview-option-page").then(
		(m) => ({ default: m.PreviewOptionPage })
	)
);
const PreviewBookingPage = React.lazy(() =>
	import("@/pages/tours/preview-booking-page/ui/preview-booking-page").then(
		(m) => ({ default: m.PreviewBookingPage })
	)
);

export const ALL_APP_ROUTES_LIST: IRouting[] = [
	// only public

	// login
	{
		path: ENUM_PATH.LOGIN,
		component: LoginPage,
		auth: ENUM_AUTH.ONLY_PUBLIC,
		layout: null
	},
	{
		path: ENUM_PATH.MAIN,
		component: MainPage,
		auth: ENUM_AUTH.PUBLIC,
		layout: ENUM_LAYOUT.DEFAULT
	},

	// only private

	// settings — operator
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.ACCOUNT_SETTINGS,
		component: OperatorAccountSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			SettingsOperatorLayout
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.BUSINESS_SETTINGS,
		component: OperatorBusinessSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			SettingsOperatorLayout
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.FINANCIAL_SETTINGS,
		component: OperatorFinancialSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			SettingsOperatorLayout
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.NOTIFICATIONS,
		component: OperatorNotificationsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			)
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.SECURITY,
		component: OperatorSecurityPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			SettingsOperatorLayout
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.STAFF_INFORMATION,
		component: OperatorStaffInformationPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			SettingsOperatorLayout
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.TAGS,
		component: OperatorTagsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			)
		]
	},
	{
		path: ENUM_PATH.OPERATOR.SETTINGS.TOUR_SETTINGS,
		component: OperatorTourSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			)
		]
	},

	// settings — agency
	{
		path: ENUM_PATH.AGENCY.SETTINGS.ACCOUNT_SETTINGS,
		component: AgencyAccountSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarAgencyLayout>
			),
			SettingsAgencyLayout
		]
	},
	{
		path: ENUM_PATH.AGENCY.SETTINGS.BUSINESS_SETTINGS,
		component: AgencyBusinessSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarAgencyLayout>
			),
			SettingsAgencyLayout
		]
	},
	{
		path: ENUM_PATH.AGENCY.SETTINGS.FINANCIAL_SETTINGS,
		component: AgencyFinancialSettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarAgencyLayout>
			),
			SettingsAgencyLayout
		]
	},
	{
		path: ENUM_PATH.AGENCY.SETTINGS.NOTIFICATIONS,
		component: AgencyNotificationsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarAgencyLayout>
			)
		]
	},
	{
		path: ENUM_PATH.AGENCY.SETTINGS.SECURITY,
		component: AgencySecurityPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
					{children}
				</SideBarAgencyLayout>
			),
			SettingsAgencyLayout
		]
	},

	// tours
	{
		path: ENUM_PATH.TOURS.ROOT,
		component: ToursPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.CATALOG.ROOT,
		component: CatalogToursPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR,
		component: PreviewTourPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.CATALOG.PREVIEW_OPTION,
		component: PreviewOptionPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.CATALOG.BOOKING,
		component: PreviewBookingPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.SEARCH,
		component: SearchToursPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_AGENCY,
		layout_cascade: [ToursOperatorLayout]
	},
	{
		path: ENUM_PATH.TOURS.OVERVIEW,
		component: OverviewPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ITINERARY,
		component: ItineraryPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.SCHEDULE,
		component: SchedulePage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.PRICING_REVIEW,
		component: PricingReviewPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ORDER_HISTORY,
		component: OrderHistoryPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.MESSAGES,
		component: MessagesPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.LANDING,
		component: LandingPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.ACTIVITY_LOG,
		component: ActivityLogPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.SETTINGS,
		component: SettingsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			TourOperatorLayout
		]
	},

	// events
	{
		path: ENUM_PATH.TOURS.EVENTS.FLIGHT,
		component: FlightEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.EVENT,
		component: ActivityEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.TRANSFER,
		component: TransportationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.ACCOMMODATION,
		component: AccommodationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.MULTIPLY_OPTION,
		component: MultiplyOptionEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	{
		path: ENUM_PATH.TOURS.EVENTS.INFO,
		component: InformationEditPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			EventOperatorLayout
		]
	},
	// {
	// 	path: ENUM_PATH.TOURS.EVENTS.TOUR_DETAILS,
	// 	component: TourDetailsEditPage,
	// 	auth: ENUM_AUTH.PRIVATE,
	// 	layout: ENUM_LAYOUT.ROOT,
	// 	layout_cascade: [
	// 		({ children }: { children: React.ReactNode }) => (
	// 			<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
	// 				{children}
	// 			</SideBarOperatorLayout>
	// 		),
	// 		EventOperatorLayout
	// 	]
	// },

	// booking
	{
		path: ENUM_PATH.BOOKING.APPEALS,
		component: AppealsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={BOOKING_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			BookingOperatorLayout
		]
	},
	{
		path: ENUM_PATH.BOOKING.ORDERS,
		component: OrdersPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={BOOKING_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			BookingOperatorLayout
		]
	},
	{
		path: ENUM_PATH.BOOKING.ORDER_ID,
		component: OrderIdPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [DefaultOperatorLayout]
	},

	// finance
	{
		path: ENUM_PATH.FINANCE.INVOICES,
		component: InvoicesPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			FinanceOperatorLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.INVOICE_ID,
		component: InvoiceIdPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [DefaultOperatorLayout]
	},
	{
		path: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
		component: ClientPaymentsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			FinanceOperatorLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
		component: SupplierPaymentsPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			FinanceOperatorLayout
		]
	},
	{
		path: ENUM_PATH.FINANCE.RECONCILIATION,
		component: ReconciliationPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [
			({ children }: { children: React.ReactNode }) => (
				<SideBarOperatorLayout items={FINANCE_SIDEBAR_LIST}>
					{children}
				</SideBarOperatorLayout>
			),
			FinanceOperatorLayout
		]
	},

	{
		path: ENUM_PATH.FINANCE.RECONCILIATION_ID,
		component: ReconciliationIdPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR,
		layout_cascade: [DefaultOperatorLayout]
	},

	// 404
	{
		path: ENUM_PATH.NOT_FOUND,
		component: NotFoundPage,
		auth: ENUM_AUTH.PRIVATE,
		layout: ENUM_LAYOUT.ROOT_OPERATOR
	}
];

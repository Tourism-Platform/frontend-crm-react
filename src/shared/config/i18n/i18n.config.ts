// относительные пути от этого файла к public/locales/en/*
// путь: src/types -> ../../public/...
import order_id_page from "../../../../public/locales/en/booking/order_id_page.json";
import orders_page from "../../../../public/locales/en/booking/orders_page.json";
import common from "../../../../public/locales/en/common.json";
import client_payments_page from "../../../../public/locales/en/finance/client_payments_page.json";
import invoice_id_page from "../../../../public/locales/en/finance/invoice_id_page.json";
import invoices_page from "../../../../public/locales/en/finance/invoices_page.json";
import reconciliation_id_page from "../../../../public/locales/en/finance/reconciliation_id_page.json";
import reconciliation_page from "../../../../public/locales/en/finance/reconciliation_page.json";
import supplier_payments_page from "../../../../public/locales/en/finance/supplier_payments_page.json";
import header from "../../../../public/locales/en/header.json";
import home from "../../../../public/locales/en/home.json";
import login_page from "../../../../public/locales/en/login_page.json";
import account_settings_page from "../../../../public/locales/en/settings/account_settings_page.json";
import business_settings_page from "../../../../public/locales/en/settings/business_settings_page.json";
import financial_settings_page from "../../../../public/locales/en/settings/financial_settings_page.json";
import security_page from "../../../../public/locales/en/settings/security_page.json";
import staff_information_page from "../../../../public/locales/en/settings/staff_information_page.json";
import sidebar from "../../../../public/locales/en/sidebar.json";
import accommodation_edit_page from "../../../../public/locales/en/tours/events/accommodation_edit_page.json";
import common_events from "../../../../public/locales/en/tours/events/common_events.json";
import event_edit_page from "../../../../public/locales/en/tours/events/event_edit_page.json";
import flight_edit_page from "../../../../public/locales/en/tours/events/flight_edit_page.json";
import information_edit_page from "../../../../public/locales/en/tours/events/information_edit_page.json";
import multiply_option_edit_page from "../../../../public/locales/en/tours/events/multiply_option_edit_page.json";
import tour_details_edit_page from "../../../../public/locales/en/tours/events/tour_details_edit_page.json";
import transportation_edit_page from "../../../../public/locales/en/tours/events/transportation_edit_page.json";
import landing_page from "../../../../public/locales/en/tours/landing_page.json";
import tour_activity_log_page from "../../../../public/locales/en/tours/tour_activity_log_page.json";
import tour_itinerary_page from "../../../../public/locales/en/tours/tour_itinerary_page.json";
import tour_order_history_page from "../../../../public/locales/en/tours/tour_order_history_page.json";
import tour_overview_page from "../../../../public/locales/en/tours/tour_overview_page.json";
import tour_pricing_review_page from "../../../../public/locales/en/tours/tour_pricing_review_page.json";
import tour_schedule_page from "../../../../public/locales/en/tours/tour_schedule_page.json";
import tour_settings_page from "../../../../public/locales/en/tours/tour_settings_page.json";
import tours_page from "../../../../public/locales/en/tours/tours_page.json";

import type { TNestedKeyOf } from "./i18n.types";

export type THeader = typeof header;
export type THome = typeof home;
export type TCommon = typeof common;
export type TSidebar = typeof sidebar;
export type TSecurityPage = typeof security_page;
export type TAccountSettingsPage = typeof account_settings_page;
export type TBusinessSettingsPage = typeof business_settings_page;
export type TStaffInformationPage = typeof staff_information_page;
export type TClientPaymentsPage = typeof client_payments_page;
export type TInvoicesPage = typeof invoices_page;
export type TInvoiceIdPage = typeof invoice_id_page;
export type TSupplierPaymentsPage = typeof supplier_payments_page;
export type TReconciliationPage = typeof reconciliation_page;
export type TReconciliationIdPage = typeof reconciliation_id_page;
export type TFinancialSettingsPage = typeof financial_settings_page;
export type TToursPage = typeof tours_page;
export type TTourOverviewPage = typeof tour_overview_page;
export type TTourSchedulePage = typeof tour_schedule_page;
export type TTourOrderHistoryPage = typeof tour_order_history_page;
export type TTourEventFlightEditPage = typeof flight_edit_page;
export type TTourEventTransportationEditPage = typeof transportation_edit_page;
export type TTourEventEditPage = typeof event_edit_page;
export type TTourInformationEditPage = typeof information_edit_page;
export type TTourDetailsEditPage = typeof tour_details_edit_page;
export type TTourEventMultiplyOptionEditPage = typeof multiply_option_edit_page;
export type TTourAccommodationEditPage = typeof accommodation_edit_page;
export type TTourItineraryPage = typeof tour_itinerary_page;
export type TCommonEvents = typeof common_events;
export type TLoginPage = typeof login_page;
export type TOrdersPage = typeof orders_page;
export type TTourActivityLogPage = typeof tour_activity_log_page;
export type TTourPricingReviewPage = typeof tour_pricing_review_page;
export type TTourSettingsPage = typeof tour_settings_page;

export type TOrderIdPage = typeof order_id_page;
export type TLandingPage = typeof landing_page;

export type TResources = {
	header: THeader;
	home: THome;
	common: TCommon;
	sidebar: TSidebar;
	security_page: TSecurityPage;
	account_settings_page: TAccountSettingsPage;
	business_settings_page: TBusinessSettingsPage;
	staff_information_page: TStaffInformationPage;
	client_payments_page: TClientPaymentsPage;
	invoices_page: TInvoicesPage;
	invoice_id_page: TInvoiceIdPage;
	supplier_payments_page: TSupplierPaymentsPage;
	reconciliation_page: TReconciliationPage;
	reconciliation_id_page: TReconciliationIdPage;
	financial_settings_page: TFinancialSettingsPage;
	tours_page: TToursPage;
	tour_overview_page: TTourOverviewPage;
	tour_schedule_page: TTourSchedulePage;
	tour_order_history_page: TTourOrderHistoryPage;
	tour_itinerary_page: TTourItineraryPage;
	flight_edit_page: TTourEventFlightEditPage;
	transportation_edit_page: TTourEventTransportationEditPage;
	event_edit_page: TTourEventEditPage;
	accommodation_edit_page: TTourAccommodationEditPage;
	information_edit_page: TTourInformationEditPage;
	tour_details_edit_page: TTourDetailsEditPage;
	multiply_option_edit_page: TTourEventMultiplyOptionEditPage;
	common_events: TCommonEvents;
	login_page: TLoginPage;
	orders_page: TOrdersPage;
	order_id_page: TOrderIdPage;
	tour_activity_log_page: TTourActivityLogPage;
	tour_pricing_review_page: TTourPricingReviewPage;
	tour_settings_page: TTourSettingsPage;
	landing_page: TLandingPage;
};

export const NS = [
	"header",
	"home",
	"common",
	"sidebar",
	"security_page",
	"account_settings_page",
	"business_settings_page",
	"staff_information_page",
	"client_payments_page",
	"invoices_page",
	"invoice_id_page",
	"supplier_payments_page",
	"reconciliation_page",
	"reconciliation_id_page",
	"financial_settings_page",
	"tours_page",
	"tour_overview_page",
	"tour_schedule_page",
	"tour_order_history_page",
	"tour_itinerary_page",
	"flight_edit_page",
	"transportation_edit_page",
	"event_edit_page",
	"accommodation_edit_page",
	"information_edit_page",
	"tour_details_edit_page",
	"multiply_option_edit_page",
	"common_events",
	"login_page",
	"orders_page",
	"order_id_page",
	"tour_activity_log_page",
	"tour_pricing_review_page",
	"tour_settings_page",
	"landing_page"
] as const;

export type TNS = (typeof NS)[number];

export type TSidebarKeys = TNestedKeyOf<TSidebar>;
export type THeaderKeys = TNestedKeyOf<THeader>;
export type THomeKeys = TNestedKeyOf<THome>;
export type TSecurityPageKeys = TNestedKeyOf<TSecurityPage>;
export type TStaffInformationPageKeys = TNestedKeyOf<TStaffInformationPage>;
export type TClientPaymentsPageKeys = TNestedKeyOf<TClientPaymentsPage>;
export type TInvoicesPageKeys = TNestedKeyOf<TInvoicesPage>;
export type TInvoiceIdPageKeys = TNestedKeyOf<TInvoiceIdPage>;
export type TSupplierPaymentsPageKeys = TNestedKeyOf<TSupplierPaymentsPage>;
export type TReconciliationPageKeys = TNestedKeyOf<TReconciliationPage>;
export type TReconciliationIdPageKeys = TNestedKeyOf<TReconciliationIdPage>;
export type TFinancialSettingsPageKeys = TNestedKeyOf<TFinancialSettingsPage>;
export type TAccountSettingsPageKeys = TNestedKeyOf<TAccountSettingsPage>;
export type TBusinessSettingsPageKeys = TNestedKeyOf<TBusinessSettingsPage>;
export type TToursPageKeys = TNestedKeyOf<TToursPage>;
export type TTourOverviewPageKeys = TNestedKeyOf<TTourOverviewPage>;
export type TTourSchedulePageKeys = TNestedKeyOf<TTourSchedulePage>;
export type TTourEventFlightEditPageKeys =
	TNestedKeyOf<TTourEventFlightEditPage>;

export type TTourOrderHistoryPageKeys = TNestedKeyOf<TTourOrderHistoryPage>;

export type TTourEventTransportationEditPageKeys =
	TNestedKeyOf<TTourEventTransportationEditPage>;

export type TTourEventEditPageKeys = TNestedKeyOf<TTourEventEditPage>;

export type TTourAccommodationEditPageKeys =
	TNestedKeyOf<TTourAccommodationEditPage>;

export type TTourInformationEditPageKeys =
	TNestedKeyOf<TTourInformationEditPage>;

export type TTourDetailsEditPageKeys = TNestedKeyOf<TTourDetailsEditPage>;

export type TTourEventMultiplyOptionEditPageKeys =
	TNestedKeyOf<TTourEventMultiplyOptionEditPage>;

export type TTourCommonEventsKeys = TNestedKeyOf<TCommonEvents>;

export type TLoginPageKeys = TNestedKeyOf<TLoginPage>;
export type TOrdersPageKeys = TNestedKeyOf<TOrdersPage>;
export type TOrderIdPageKeys = TNestedKeyOf<TOrderIdPage>;
export type TTourActivityLogPageKeys = TNestedKeyOf<TTourActivityLogPage>;
export type TTourPricingReviewPageKeys = TNestedKeyOf<TTourPricingReviewPage>;
export type TTourSettingsPageKeys = TNestedKeyOf<TTourSettingsPage>;
export type TLandingPageKeys = TNestedKeyOf<TLandingPage>;

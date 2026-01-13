import order_id_page_ru from "../../../../public/locales/ru/booking/order_id_page.json";
import orders_page_ru from "../../../../public/locales/ru/booking/orders_page.json";
import common_ru from "../../../../public/locales/ru/common.json";
import client_payments_page_ru from "../../../../public/locales/ru/finance/client_payments_page.json";
import invoice_id_page_ru from "../../../../public/locales/ru/finance/invoice_id_page.json";
import invoices_page_ru from "../../../../public/locales/ru/finance/invoices_page.json";
import reconciliation_id_page_ru from "../../../../public/locales/ru/finance/reconciliation_id_page.json";
import reconciliation_page_ru from "../../../../public/locales/ru/finance/reconciliation_page.json";
import supplier_payments_page_ru from "../../../../public/locales/ru/finance/supplier_payments_page.json";
import header_ru from "../../../../public/locales/ru/header.json";
import home_ru from "../../../../public/locales/ru/home.json";
import login_page_ru from "../../../../public/locales/ru/login_page.json";
import not_found_page_ru from "../../../../public/locales/ru/not_found_page.json";
import options_ru from "../../../../public/locales/ru/options.json";
import account_settings_page_ru from "../../../../public/locales/ru/settings/account_settings_page.json";
import business_settings_page_ru from "../../../../public/locales/ru/settings/business_settings_page.json";
import financial_settings_page_ru from "../../../../public/locales/ru/settings/financial_settings_page.json";
import security_page_ru from "../../../../public/locales/ru/settings/security_page.json";
import staff_information_page_ru from "../../../../public/locales/ru/settings/staff_information_page.json";
import sidebar_ru from "../../../../public/locales/ru/sidebar.json";
import common_tours_ru from "../../../../public/locales/ru/tours/common_tours.json";
import accommodation_edit_page_ru from "../../../../public/locales/ru/tours/events/accommodation_edit_page.json";
import common_events_ru from "../../../../public/locales/ru/tours/events/common_events.json";
import event_edit_page_ru from "../../../../public/locales/ru/tours/events/event_edit_page.json";
import flight_edit_page_ru from "../../../../public/locales/ru/tours/events/flight_edit_page.json";
import information_edit_page_ru from "../../../../public/locales/ru/tours/events/information_edit_page.json";
import multiply_option_edit_page_ru from "../../../../public/locales/ru/tours/events/multiply_option_edit_page.json";
import tour_details_edit_page_ru from "../../../../public/locales/ru/tours/events/tour_details_edit_page.json";
import transportation_edit_page_ru from "../../../../public/locales/ru/tours/events/transportation_edit_page.json";
import landing_page_ru from "../../../../public/locales/ru/tours/landing_page.json";
import tour_activity_log_page_ru from "../../../../public/locales/ru/tours/tour_activity_log_page.json";
import tour_itinerary_page_ru from "../../../../public/locales/ru/tours/tour_itinerary_page.json";
import tour_order_history_page_ru from "../../../../public/locales/ru/tours/tour_order_history_page.json";
import tour_overview_page_ru from "../../../../public/locales/ru/tours/tour_overview_page.json";
import tour_pricing_review_page_ru from "../../../../public/locales/ru/tours/tour_pricing_review_page.json";
import tour_schedule_page_ru from "../../../../public/locales/ru/tours/tour_schedule_page.json";
import tour_settings_page_ru from "../../../../public/locales/ru/tours/tour_settings_page.json";
import tours_catalog_page_ru from "../../../../public/locales/ru/tours/tours_catalog_page.json";
import tours_page_ru from "../../../../public/locales/ru/tours/tours_page.json";

import type { TResources } from "./i18n.config";

/**
 * Этот файл служит инструментом статической проверки (Type Checker)
 * для обеспечения соответствия ключей в русских переводах английским оригиналам.
 *
 * Если в русском JSON отсутствует ключ, который есть в английском,
 * TypeScript выдаст ошибку в соответствующей переменной ниже.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RU_TRANSLATION_CHECKER: TResources = {
	common: common_ru,
	header: header_ru,
	home: home_ru,
	login_page: login_page_ru,
	not_found_page: not_found_page_ru,
	options: options_ru,
	account_settings_page: account_settings_page_ru,
	business_settings_page: business_settings_page_ru,
	security_page: security_page_ru,
	sidebar: sidebar_ru,
	staff_information_page: staff_information_page_ru,
	accommodation_edit_page: accommodation_edit_page_ru,
	common_events: common_events_ru,
	event_edit_page: event_edit_page_ru,
	flight_edit_page: flight_edit_page_ru,
	transportation_edit_page: transportation_edit_page_ru,
	information_edit_page: information_edit_page_ru,
	multiply_option_edit_page: multiply_option_edit_page_ru,
	tour_details_edit_page: tour_details_edit_page_ru,
	landing_page: landing_page_ru,
	tour_activity_log_page: tour_activity_log_page_ru,
	tour_itinerary_page: tour_itinerary_page_ru,
	tour_order_history_page: tour_order_history_page_ru,
	tour_overview_page: tour_overview_page_ru,
	tour_pricing_review_page: tour_pricing_review_page_ru,
	tour_schedule_page: tour_schedule_page_ru,
	tour_settings_page: tour_settings_page_ru,
	common_tours: common_tours_ru,
	tours_catalog_page: tours_catalog_page_ru,
	tours_page: tours_page_ru,
	order_id_page: order_id_page_ru,
	orders_page: orders_page_ru,
	client_payments_page: client_payments_page_ru,
	invoice_id_page: invoice_id_page_ru,
	invoices_page: invoices_page_ru,
	reconciliation_id_page: reconciliation_id_page_ru,
	reconciliation_page: reconciliation_page_ru,
	supplier_payments_page: supplier_payments_page_ru,
	financial_settings_page: financial_settings_page_ru
};

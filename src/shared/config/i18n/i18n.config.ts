// относительные пути от этого файла к public/locales/en/*
// путь: src/types -> ../../public/...
import common from "../../../../public/locales/en/common.json";
import header from "../../../../public/locales/en/header.json";
import home from "../../../../public/locales/en/home.json";
import account_settings_page from "../../../../public/locales/en/settings/account_settings_page.json";
import business_settings_page from "../../../../public/locales/en/settings/business_settings_page.json";
import financial_settings_page from "../../../../public/locales/en/settings/financial_settings_page.json";
import security_page from "../../../../public/locales/en/settings/security_page.json";
import staff_information_page from "../../../../public/locales/en/settings/staff_information_page.json";
import sidebar from "../../../../public/locales/en/sidebar.json";
import tour_order_history_page from "../../../../public/locales/en/tours/tour_order_history_page.json";
import tour_overview_page from "../../../../public/locales/en/tours/tour_overview_page.json";
import tour_schedule_page from "../../../../public/locales/en/tours/tour_schedule_page.json";
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
export type TFinancialSettingsPage = typeof financial_settings_page;
export type TToursPage = typeof tours_page;
export type TTourOverviewPage = typeof tour_overview_page;
export type TTourSchedulePage = typeof tour_schedule_page;
export type TTourOrderHistoryPage = typeof tour_order_history_page;

export type TResources = {
	header: THeader;
	home: THome;
	common: TCommon;
	sidebar: TSidebar;
	security_page: TSecurityPage;
	account_settings_page: TAccountSettingsPage;
	business_settings_page: TBusinessSettingsPage;
	staff_information_page: TStaffInformationPage;
	financial_settings_page: TFinancialSettingsPage;
	tours_page: TToursPage;
	tour_overview_page: TTourOverviewPage;
	tour_schedule_page: TTourSchedulePage;
	tour_order_history_page: TTourOrderHistoryPage;
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
	"financial_settings_page",
	"tours_page",
	"tour_overview_page",
	"tour_schedule_page",
	"tour_order_history_page"
] as const;
export type TNS = (typeof NS)[number];

export type TSidebarKeys = TNestedKeyOf<TSidebar>;
export type THeaderKeys = TNestedKeyOf<THeader>;
export type THomeKeys = TNestedKeyOf<THome>;
export type TSecurityPageKeys = TNestedKeyOf<TSecurityPage>;
export type TAccountSettingsPageKeys = TNestedKeyOf<TAccountSettingsPage>;
export type TBusinessSettingsPageKeys = TNestedKeyOf<TBusinessSettingsPage>;
export type TToursPageKeys = TNestedKeyOf<TToursPage>;
export type TTourOverviewPageKeys = TNestedKeyOf<TTourOverviewPage>;
export type TTourSchedulePageKeys = TNestedKeyOf<TTourSchedulePage>;

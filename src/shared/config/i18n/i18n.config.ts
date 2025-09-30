// относительные пути от этого файла к public/locales/en/*
// путь: src/types -> ../../public/...
import common from "../../../../public/locales/en/common.json";
import header from "../../../../public/locales/en/header.json";
import home from "../../../../public/locales/en/home.json";
import account_settings_page from "../../../../public/locales/en/settings/account_settings_page.json";
import business_settings_page from "../../../../public/locales/en/settings/business_settings_page.json";
import security_page from "../../../../public/locales/en/settings/security_page.json";
import staff_information_page from "../../../../public/locales/en/settings/staff_information_page.json";
import sidebar from "../../../../public/locales/en/sidebar.json";

import type { TNestedKeyOf } from "./i18n.types";

export type THeader = typeof header;
export type THome = typeof home;
export type TCommon = typeof common;
export type TSidebar = typeof sidebar;
export type TSecurityPage = typeof security_page;
export type TAccountSettingsPage = typeof account_settings_page;
export type TBusinessSettingsPage = typeof business_settings_page;
export type TStaffInformationPage = typeof staff_information_page;

export type TResources = {
	header: THeader;
	home: THome;
	common: TCommon;
	sidebar: TSidebar;
	security_page: TSecurityPage;
	account_settings_page: TAccountSettingsPage;
	business_settings_page: TBusinessSettingsPage;
	staff_information_page: TStaffInformationPage;
};

export const NS = [
	"header",
	"home",
	"common",
	"sidebar",
	"security_page",
	"account_settings_page",
	"business_settings_page",
	"staff_information_page"
] as const;
export type TNS = (typeof NS)[number];

export type TSidebarKeys = TNestedKeyOf<TSidebar>;
export type THeaderKeys = TNestedKeyOf<THeader>;
export type THomeKeys = TNestedKeyOf<THome>;
export type TSecurityPageKeys = TNestedKeyOf<TSecurityPage>;
export type TAccountSettingsPageKeys = TNestedKeyOf<TAccountSettingsPage>;
export type TBusinessSettingsPageKeys = TNestedKeyOf<TBusinessSettingsPage>;

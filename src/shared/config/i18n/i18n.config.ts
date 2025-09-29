// относительные пути от этого файла к public/locales/en/*
// путь: src/types -> ../../public/...
import header from "../../../../public/locales/en/header.json";
import home from "../../../../public/locales/en/home.json";
import security_page from "../../../../public/locales/en/settings/security_page.json";
import sidebar from "../../../../public/locales/en/sidebar.json";

import type { TNestedKeyOf } from "./i18n.types";

export type THeader = typeof header;
export type THome = typeof home;
export type TSidebar = typeof sidebar;
export type TSecurityPage = typeof security_page;

export type TResources = {
	header: THeader;
	home: THome;
	sidebar: TSidebar;
	security_page: TSecurityPage;
};

export const NS = ["header", "home", "sidebar", "security_page"] as const;
export type TNS = (typeof NS)[number];

export type TSidebarKeys = TNestedKeyOf<TSidebar>;
export type THeaderKeys = TNestedKeyOf<THeader>;
export type TSecurityPageKeys = TNestedKeyOf<TSecurityPage>;

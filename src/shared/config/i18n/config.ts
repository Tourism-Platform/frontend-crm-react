// относительные пути от этого файла к public/locales/en/*
// путь: src/types -> ../../public/...
import header from "../../../../public/locales/en/header.json";
import home from "../../../../public/locales/en/home.json";
import sidebar from "../../../../public/locales/en/sidebar.json";

import type { TNestedKeyOf } from "./types";

export type THeader = typeof header;
export type THome = typeof home;
export type TSidebar = typeof sidebar;

export type TResources = {
	header: THeader;
	home: THome;
	sidebar: TSidebar;
};

export const NS = ["header", "footer", "home", "sidebar"] as const;

export type TSidebarKeys = TNestedKeyOf<TSidebar>;

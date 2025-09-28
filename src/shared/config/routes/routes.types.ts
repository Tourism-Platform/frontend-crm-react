import * as React from "react";

import type { ISidebarMenu } from "@/shared/ui";

import type { ENUM_PATH } from "./routes.config";
import { type ENUM_AUTH_TYPE, type ENUM_LAYOUT_TYPE } from "./routes.enum";

export interface IRouting {
	path: string;
	component: React.ComponentType;
	auth: ENUM_AUTH_TYPE;
	// roles?: ENUM_ROLES[];
	// authSidebar?: boolean;
	// nonAuthSidebar?: boolean;
	// adminSidebar?: boolean;
	sidebarMenu?: ISidebarMenu[];
	layout: ENUM_LAYOUT_TYPE;
}

export type TSettingsPath =
	(typeof ENUM_PATH.SETTINGS)[keyof typeof ENUM_PATH.SETTINGS];

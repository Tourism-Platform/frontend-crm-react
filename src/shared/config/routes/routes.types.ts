import * as React from "react";

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
	// useMainBreadcrumb?: boolean;
	// useTourEventBreadcrumb?: boolean;
	layout_cascade?: React.ComponentType<{ children: React.ReactNode }>[];
	layout: ENUM_LAYOUT_TYPE;
}

export type TSettingsPath =
	(typeof ENUM_PATH.SETTINGS)[keyof typeof ENUM_PATH.SETTINGS];

export type TToursPath = Omit<typeof ENUM_PATH.TOURS, "EVENTS">[keyof Omit<
	typeof ENUM_PATH.TOURS,
	"EVENTS"
>];

export type TTourEventsPath =
	(typeof ENUM_PATH.TOURS.EVENTS)[keyof typeof ENUM_PATH.TOURS.EVENTS];

export type TBookingPath =
	(typeof ENUM_PATH.BOOKING)[keyof typeof ENUM_PATH.BOOKING];

export type TTourEventPath =
	(typeof ENUM_PATH.TOURS.EVENTS)[keyof typeof ENUM_PATH.TOURS.EVENTS];

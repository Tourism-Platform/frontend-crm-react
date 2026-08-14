import * as React from "react";

import type { TTourSearchLocationQuery } from "./query.types";
import type { ENUM_PATH } from "./routes.config";
import { type ENUM_AUTH_TYPE, type ENUM_LAYOUT_TYPE } from "./routes.enum";

export interface IRouting {
	path: string;
	component: React.ComponentType;
	auth: ENUM_AUTH_TYPE;
	layout_cascade?: React.ComponentType<{ children: React.ReactNode }>[];
	layout: ENUM_LAYOUT_TYPE | null;
}

export type TOperatorSettingsPath =
	(typeof ENUM_PATH.OPERATOR.SETTINGS)[keyof typeof ENUM_PATH.OPERATOR.SETTINGS];

export type TAgencySettingsPath =
	(typeof ENUM_PATH.AGENCY.SETTINGS)[keyof typeof ENUM_PATH.AGENCY.SETTINGS];

export type TSettingsPath = TOperatorSettingsPath | TAgencySettingsPath;

export type TToursPath =
	| Omit<typeof ENUM_PATH.TOURS, "EVENTS" | "CATALOG">[keyof Omit<
			typeof ENUM_PATH.TOURS,
			"EVENTS" | "CATALOG"
	  >]
	| (typeof ENUM_PATH.TOURS.CATALOG)[keyof typeof ENUM_PATH.TOURS.CATALOG];

export type TTourEventsPath =
	(typeof ENUM_PATH.TOURS.EVENTS)[keyof typeof ENUM_PATH.TOURS.EVENTS];

export type TOperatorBookingPath =
	(typeof ENUM_PATH.OPERATOR.BOOKING)[keyof typeof ENUM_PATH.OPERATOR.BOOKING];

export type TAgencyBookingPath =
	(typeof ENUM_PATH.AGENCY.BOOKING)[keyof typeof ENUM_PATH.AGENCY.BOOKING];

export type TBookingPath = TOperatorBookingPath | TAgencyBookingPath;

export type TFinancePath =
	(typeof ENUM_PATH.FINANCE)[keyof typeof ENUM_PATH.FINANCE];

export type TLibraryPath =
	(typeof ENUM_PATH.LIBRARY)[keyof typeof ENUM_PATH.LIBRARY];

export type TTourEventPath =
	(typeof ENUM_PATH.TOURS.EVENTS)[keyof typeof ENUM_PATH.TOURS.EVENTS];

export type TQueryParams = {
	[ENUM_PATH.TOURS.SEARCH]: TTourSearchLocationQuery;
	[ENUM_PATH.TOURS.CATALOG.ROOT]: {
		page?: number;
		limit?: number;
	};
};

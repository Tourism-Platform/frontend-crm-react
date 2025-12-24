import { type TOrderIdPageKeys, type TOrdersPageKeys } from "@/shared/config";

import {
	ENUM_CLIENT_TYPE_OPTIONS,
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE
} from "../types";

export const CLIENT_TYPE_LABELS: Record<
	ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	TOrdersPageKeys
> = {
	[ENUM_CLIENT_TYPE_OPTIONS.AGENCY]: "table.clientTypes.agency",
	[ENUM_CLIENT_TYPE_OPTIONS.DIRECT]: "table.clientTypes.direct",
	[ENUM_CLIENT_TYPE_OPTIONS.CORPORATE]: "table.clientTypes.corporate"
};

export const CLIENT_TYPE_LABELS_ID: Record<
	ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_CLIENT_TYPE_OPTIONS.AGENCY]: "contact_info.types.agency",
	[ENUM_CLIENT_TYPE_OPTIONS.DIRECT]: "contact_info.types.direct",
	[ENUM_CLIENT_TYPE_OPTIONS.CORPORATE]: "contact_info.types.corporate"
};

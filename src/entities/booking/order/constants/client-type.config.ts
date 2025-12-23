import { type TOrdersPageKeys } from "@/shared/config";
import { valueToLabel } from "@/shared/utils";

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

export const CLIENT_TYPE_OPTIONS = valueToLabel(CLIENT_TYPE_LABELS);

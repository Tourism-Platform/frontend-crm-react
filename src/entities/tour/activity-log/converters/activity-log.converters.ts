import { formatDateTime } from "@/shared/utils";

import type { IActivityLogBackend, IActivityLogItem } from "../types";

export const mapActivityLogToFrontend = (
	item: IActivityLogBackend
): IActivityLogItem => {
	return {
		...item,
		date: formatDateTime(item.date)
	};
};

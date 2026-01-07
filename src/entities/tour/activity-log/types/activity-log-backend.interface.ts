import type { IActivityLogItem } from "./activity-log.interface";

export interface IActivityLogBackend extends IActivityLogItem {
	id: string;
}

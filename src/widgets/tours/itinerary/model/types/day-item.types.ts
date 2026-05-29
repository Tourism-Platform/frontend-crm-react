import type { ENUM_EVENT_TYPE } from "@/entities/tour";

export interface IDayItem {
	id: string;
	block_id: string; // e.g. 'day1-1'
	eventType: ENUM_EVENT_TYPE; // template key like 'flight'
	title: string;
	subtitle?: string;
	items?: IDayItem[];
	backendId?: string; // UUID из ответа бэкенда после создания
}

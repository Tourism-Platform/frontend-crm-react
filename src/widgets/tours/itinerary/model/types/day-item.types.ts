export interface IDayItem {
	id: string;
	block_id: string; // e.g. 'day1-1'
	event_type: string; // template key like 'flight'
	title: string;
	subtitle?: string;
	items?: IDayItem[];
}

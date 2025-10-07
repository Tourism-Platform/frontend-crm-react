export interface IDayItem {
	id: string; // e.g. 'day1-1'
	type: string; // template key like 'flight'
	title: string;
	subtitle?: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	color: string;
}

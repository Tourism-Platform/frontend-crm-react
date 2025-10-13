export const ENUM_EVENT_TYPE = {
	ACCOMMODATION: "accommodation",
	FLIGHT: "flight",
	INFORMATION: "information",
	TOUR_DETAILS: "tour-details",
	TRANSPORTATION: "transportation",
	MULTIPLY_OPTION: "multiply-option",
	INFO: "info",
	ACTIVITY: "activity",
	EVENT_LIBRARY: "event-library",
	ITINERARY_LIBRARY: "itinerary-library"
} as const;

export type TEventType = (typeof ENUM_EVENT_TYPE)[keyof typeof ENUM_EVENT_TYPE];

export interface ITemplateItem {
	id?: string;
	event_type: TEventType;
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	color: string;
}

export interface IEventTemplate {
	library: ITemplateItem[];
	components: ITemplateItem[];
}

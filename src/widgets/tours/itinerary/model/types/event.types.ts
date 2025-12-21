export const ENUM_EVENT = {
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

export type ENUM_EVENT_TYPE = (typeof ENUM_EVENT)[keyof typeof ENUM_EVENT];

export interface ITemplateItem {
	id?: string;
	event_type: ENUM_EVENT_TYPE;
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	color_text: string;
	color_bg: string;
}

export interface IEventTemplate {
	library: ITemplateItem[];
	components: ITemplateItem[];
}

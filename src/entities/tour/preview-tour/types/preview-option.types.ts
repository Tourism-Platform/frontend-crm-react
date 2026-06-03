import type { ENUM_EVENT_TYPE } from "@/entities/tour/tour/types/event.types";

export interface ISubOption {
	id: string;
	title: string;
	description: string;
	image: string;
	full_description: string;
}

export interface IOptionEvent {
	id: string;
	type: ENUM_EVENT_TYPE;
	title: string;
	description: string;
	full_description: string;
	image: string;
	sub_options?: ISubOption[];
}

export interface IOptionDay {
	id: string;
	day_number: number;
	location: string;
	events: IOptionEvent[];
}

export interface IOptionDetail {
	id: string;
	title: string;
	price: string;
	days: IOptionDay[];
}

export interface IPreviewOptionCard {
	id: string;
	title: string;
	description: string;
	price: string;
	image: string;
}

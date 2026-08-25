import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

/** Body link — maps to EventProductLink after converter */
export interface IEventProductLink {
	productId: string;
	/** null = all categories (audit); send null, do not omit */
	variantId?: string | null;
}

export interface IAttachSingleEventProduct {
	tourId: string;
	optionId: string;
	eventId: string;
	data: IEventProductLink;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IDetachSingleEventProduct {
	tourId: string;
	optionId: string;
	eventId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IAttachEventOptionProduct {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	data: IEventProductLink;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IDetachEventOptionProduct {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

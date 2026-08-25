import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

import type {
	IHotelPolicy,
	TAccommodationPricingSchema
} from "./accommodation";
import type { TFlightPricingSchema } from "./flight";

export interface IHousingEventOverride {
	typ: "housing";
	expenses: TAccommodationPricingSchema | null;
	policy: IHotelPolicy | null;
}

export interface ITrainEventOverride {
	typ: "train";
	expenses: TFlightPricingSchema | null;
}

export type TEventOverride = IHousingEventOverride | ITrainEventOverride;

export interface ISetSingleEventOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	data: TEventOverride;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IClearSingleEventOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface ISetEventOptionOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	data: TEventOverride;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IClearEventOptionOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

import type { TOUR_EVENTS_PATHS } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

import type { ENUM_EVENT_BACKEND_TYPE } from "./event-backend-enum.types";
import type { IEventProductLink } from "./event-product-link.types";

export interface IEventPoolMemberSummary {
	id: string;
	supplierLabel: string;
	isMain: boolean;
}

export type TEventPoolMemberNewBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.addPoolMember
>["_types"]["body"];

/** Domain intent for POST/PATCH pool add — mapped to body at the API boundary. */
export type TAddPoolMemberIntent =
	| { kind: "empty"; typ: ENUM_EVENT_BACKEND_TYPE }
	| {
			kind: "supplier";
			typ: ENUM_EVENT_BACKEND_TYPE;
			supplierId: string;
	  }
	| {
			kind: "product";
			typ: ENUM_EVENT_BACKEND_TYPE;
			link: IEventProductLink;
	  };

export interface IAddEventPoolMember {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	intent: TAddPoolMemberIntent;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IRemoveEventPoolMember {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	supplyId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface ISetEventPoolMemberMain {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	supplyId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

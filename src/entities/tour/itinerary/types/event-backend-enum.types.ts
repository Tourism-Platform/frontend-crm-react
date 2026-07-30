import { EventTypes } from "@/shared/api/generated/Api";

export const ENUM_EVENT_BACKEND = {
	FLIGHT: EventTypes.Flight,
	TRAIN: EventTypes.Train,
	BUS: EventTypes.Bus,
	TRANSFER: EventTypes.Transfer,
	HOUSING: EventTypes.Housing,
	ACTIVITY: EventTypes.Activity,
	REF: EventTypes.Ref,
	GUIDE: EventTypes.Guide,
	SUPPLEMENTARY: EventTypes.Supplementary,
	OPTIONS: EventTypes.Options
} as const;

export type ENUM_EVENT_BACKEND_TYPE =
	(typeof ENUM_EVENT_BACKEND)[keyof typeof ENUM_EVENT_BACKEND];

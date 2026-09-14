import { EventTypes } from "@/shared/api";

/**
 * Backend event discriminator — values are the generated `EventTypes` enum.
 * SCREAMING keys are local aliases so call sites stay readable; the runtime
 * value is always an `EventTypes` member.
 */
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

export type ENUM_EVENT_BACKEND_TYPE = EventTypes;

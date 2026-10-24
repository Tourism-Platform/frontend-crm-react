import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_EVENT_KIND,
	type ENUM_EVENT_TYPE
} from "../types";

import { eventBoardTypeMapper } from "./event-board-type.converters";
import { eventKindMapper } from "./event-kind.converters";

/** Все backend `typ`, которые на борде показываются как `type` (FLIGHT → flight, train, bus). */
export const mapEventTypeToBackendTyps = (
	type: ENUM_EVENT_TYPE
): ENUM_EVENT_BACKEND_TYPE[] =>
	eventKindMapper.toMany(
		Object.values(ENUM_EVENT_KIND).filter(
			(kind) => eventBoardTypeMapper.to(kind) === type
		)
	);

const EVENT_BACKEND_TYP_VALUES = new Set<string>(
	Object.values(ENUM_EVENT_BACKEND)
);

export const isEventBackendTyp = (
	value: unknown
): value is ENUM_EVENT_BACKEND_TYPE =>
	typeof value === "string" && EVENT_BACKEND_TYP_VALUES.has(value);

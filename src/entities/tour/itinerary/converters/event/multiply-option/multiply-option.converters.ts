import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ITourEventOption,
	type TMultiEventDetailBackend,
	type TMultiplyOptionEditSchema,
	type TTourEventBackendResponce
} from "../../../types";
import { eventBoardTypeMapper } from "../../event-board-type.converters";
import { eventKindMapper } from "../../event-kind.converters";
import { mapBackendEventToTimeSubtitle } from "../../event-time-range.converters";
import { isEventBackendTyp } from "../../event-type.converters";

export const mapMultiplyOptionDetailToOption = (
	detail: TMultiEventDetailBackend
): ITourEventOption | null => {
	if (!detail.id || !isEventBackendTyp(detail.typ)) return null;

	const backendTyp = detail.typ;

	return {
		id: detail.id,
		name: detail.name || "",
		description: detail.description || "",
		eventType:
			eventBoardTypeMapper.to(eventKindMapper.from(backendTyp)) ||
			ENUM_EVENT.TOUR_DETAILS,
		backendTyp,
		details: detail.details,
		timeSubtitle: mapBackendEventToTimeSubtitle(detail)
	};
};

export const mapMultiplyOptionEventToForm = (
	data: TTourEventBackendResponce
): TMultiplyOptionEditSchema => {
	const event = data?.event;

	if (event?.typ !== ENUM_EVENT_BACKEND.OPTIONS) {
		return { name: "", description: "", options: [] };
	}

	const options = (event.details ?? [])
		.map(mapMultiplyOptionDetailToOption)
		.filter((opt): opt is ITourEventOption => opt !== null);

	return {
		name: "",
		description: "",
		day: event.day,
		position: event.position,
		options
	};
};

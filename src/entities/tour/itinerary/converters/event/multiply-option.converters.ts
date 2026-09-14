import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type IEventOptionReorder,
	type ITourEventOption,
	type TMultiEventDetailBackend,
	type TMultiplyOptionEditSchema,
	type TTourEventBackendResponce
} from "../../types";
import { backendEventTypeMapper } from "../backend-event-type.converters";
import { mapBackendEventToTimeSubtitle } from "../event-time-range.converters";

export const mapMultiplyOptionDetailToOption = (
	detail: TMultiEventDetailBackend
): ITourEventOption | null => {
	if (!detail.id) return null;

	const backendTyp = detail.typ as ENUM_EVENT_BACKEND_TYPE;

	return {
		id: detail.id,
		name: detail.name || "",
		description: detail.description || "",
		eventType:
			backendEventTypeMapper.to(backendTyp) || ENUM_EVENT.TOUR_DETAILS,
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

/**
 * Reorder payload — the current option row IDs in the new order.
 * Contract 3.1: `order` is `string[]` of event option ids, not indices.
 */
export const mapMultiplyOptionReorderToBackend = (
	currentOptions: Pick<ITourEventOption, "id">[]
): IEventOptionReorder => ({
	order: currentOptions.map((option) => option.id)
});

export const hasMultiplyOptionsOrderChanged = (
	originalOptions: Pick<ITourEventOption, "id">[],
	currentOptions: Pick<ITourEventOption, "id">[]
): boolean =>
	originalOptions.length !== currentOptions.length ||
	originalOptions.some(
		(option, index) => option.id !== currentOptions[index]?.id
	);

export const getRemovedMultiplyOptions = (
	originalOptions: Pick<ITourEventOption, "id">[],
	currentOptions: Pick<ITourEventOption, "id">[]
): Pick<ITourEventOption, "id">[] => {
	const currentIds = new Set(currentOptions.map((option) => option.id));
	return originalOptions.filter((option) => !currentIds.has(option.id));
};

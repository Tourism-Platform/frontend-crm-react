import type { MultiEventReadOutput } from "@/shared/api";

import {
	ENUM_EVENT,
	type ENUM_EVENT_BACKEND_TYPE,
	type IEventOptionReorder,
	type ITourEventOption,
	type TMultiplyOptionEditSchema,
	type TTourEventBackendResponce
} from "../../types";
import { mapBackendEventToTimeSubtitle } from "../event-time-range.converters";
import { mapBackendTypToEventType } from "../event-type.converters";

type TMultiEventOptionDetail = NonNullable<
	MultiEventReadOutput["details"]
>[number];

export const mapMultiplyOptionDetailToOption = (
	detail: TMultiEventOptionDetail
): ITourEventOption | null => {
	if (!detail.id) return null;

	const backendTyp = detail.typ as ENUM_EVENT_BACKEND_TYPE | undefined;
	const details = (detail.details as Record<string, unknown>) || {};

	return {
		id: detail.id,
		name: detail.name || "",
		description: detail.description || "",
		eventType:
			mapBackendTypToEventType(backendTyp) || ENUM_EVENT.TOUR_DETAILS,
		details,
		timeSubtitle: mapBackendEventToTimeSubtitle(backendTyp, details)
		// isOptional: Boolean(detail.is_optional)
	};
};

export const mapMultiplyOptionEventToForm = (
	data: TTourEventBackendResponce
): TMultiplyOptionEditSchema => {
	const event = data?.event as MultiEventReadOutput;

	const options = (event?.details ?? [])
		.map(mapMultiplyOptionDetailToOption)
		.filter((opt): opt is ITourEventOption => opt !== null);

	return {
		name:
			"name" in event
				? ((event as { name?: string | null }).name ?? "")
				: "",
		description:
			"description" in event
				? ((event as { description?: string | null }).description ?? "")
				: "",
		day: event?.day,
		position: event?.position,
		options
	};
};

/** Builds 0-based position permutation for reorder-options API. */
export const mapMultiplyOptionReorderToBackend = (
	originalOptions: Pick<ITourEventOption, "id">[],
	currentOptions: Pick<ITourEventOption, "id">[]
): IEventOptionReorder => ({
	order: currentOptions.map((option) =>
		originalOptions.findIndex((item) => item.id === option.id)
	)
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

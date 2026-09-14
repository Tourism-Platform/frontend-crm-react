import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";

import { useGetTourEventQuery, useUpdateOptionMutation } from "../api";
import {
	ENUM_EVENT_MODE,
	type ENUM_EVENT_TYPE,
	type TTourEvent,
	type TTourEventUpdate
} from "../types";

import { useEventEditIds } from "./use-event-edit-ids";

export const useTourEventEdit = <T extends TTourEvent = TTourEvent>(
	type: ENUM_EVENT_TYPE
) => {
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();

	const eventQuery = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip: !tourId || !optionId || !eventId }
	);
	const { data, isRealError: isError } = useOptionalResourceQuery(eventQuery);

	const [updateOption, { isLoading: isUpdateLoading }] =
		useUpdateOptionMutation();

	const update = async (
		formData: TTourEventUpdate,
		language?: ENUM_LANGUAGES_TYPE
	) => {
		// Unified updateOption always addresses the option ROW:
		// multi — the URL param; single — `event.id` resolved by the read.
		const resolvedEventOptionId =
			mode === ENUM_EVENT_MODE.MULTI
				? eventOptionId
				: data?.eventOptionId;

		if (!resolvedEventOptionId) {
			throw new Error("Event option id is not resolved yet");
		}

		return updateOption({
			tourId,
			optionId,
			eventId,
			eventOptionId: resolvedEventOptionId,
			type,
			language,
			data: formData
		}).unwrap();
	};

	return {
		data: data?.form as T | undefined,
		details: data?.details,
		eventOptionId:
			mode === ENUM_EVENT_MODE.MULTI
				? eventOptionId
				: data?.eventOptionId,
		isError,
		isLoading: isUpdateLoading,
		update
	};
};

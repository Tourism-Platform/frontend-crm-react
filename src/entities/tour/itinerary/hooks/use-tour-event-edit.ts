import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import {
	useGetTourEventQuery,
	useUpdateEventOptionMutation,
	useUpdateTourEventMutation
} from "../api";
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

	const { data, isError } = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip: !tourId || !optionId || !eventId }
	);

	const [updateTourEvent, { isLoading: isUpdateLoading }] =
		useUpdateTourEventMutation();
	const [updateEventOption, { isLoading: isUpdateOptionLoading }] =
		useUpdateEventOptionMutation();

	const update = async (
		formData: TTourEventUpdate,
		language?: ENUM_LANGUAGES_TYPE
	) => {
		if (mode === ENUM_EVENT_MODE.MULTI) {
			return updateEventOption({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				type,
				language,
				data: formData
			}).unwrap();
		}

		return updateTourEvent({
			tourId,
			optionId,
			eventId,
			type,
			language,
			data: formData
		}).unwrap();
	};

	return {
		data: data as T | undefined,
		isError,
		isLoading: isUpdateLoading || isUpdateOptionLoading,
		update
	};
};

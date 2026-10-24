import { useState } from "react";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	useEventAutosaveParts,
	useGetTourEventQuery,
	useUpdateOptionMutation
} from "../api";
import { useGetTourEventReadQuery } from "../api/event-read.service";
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
	const [supplyId, setSupplyId] = useState<string | undefined>();
	const skip = !tourId || !optionId || !eventId;

	const eventQuery = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			supplyId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip }
	);
	const { data, isRealError: isError } = useOptionalResourceQuery(eventQuery);
	// Same request as `getTourEvent`: keeps the READ cached for the bodies.
	const { data: read } = useGetTourEventReadQuery(
		{ tourId, optionId, eventId },
		{ skip }
	);

	const [updateOption, { isLoading: isUpdateLoading }] =
		useUpdateOptionMutation();

	const resolvedEventOptionId =
		mode === ENUM_EVENT_MODE.MULTI ? eventOptionId : data?.eventOptionId;

	const update = async (
		formData: TTourEventUpdate,
		language?: ENUM_LANGUAGES_TYPE
	) => {
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

	const getAutosaveParts = useEventAutosaveParts<T>({
		type,
		tourId,
		optionId,
		eventId,
		eventOptionId: resolvedEventOptionId,
		read
	});

	return {
		data: data?.form as T | undefined,
		eventOptionId: resolvedEventOptionId,
		/** Edited record identity (option row + pool member); a new key is a new autosave baseline. */
		recordKey: resolvedEventOptionId
			? `${resolvedEventOptionId}:${supplyId ?? "main"}`
			: undefined,
		ids: { tourId, optionId, eventId },
		selectPoolMember: setSupplyId,
		isError,
		isLoading: isUpdateLoading,
		update,
		getAutosaveParts
	};
};

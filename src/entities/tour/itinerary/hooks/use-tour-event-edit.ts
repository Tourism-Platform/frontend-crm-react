import { useState } from "react";

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
	const [supplyId, setSupplyId] = useState<string | undefined>();

	const eventQuery = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			supplyId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip: !tourId || !optionId || !eventId }
	);
	const { data, isRealError: isError } = useOptionalResourceQuery(eventQuery);

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
			data: formData,
			currentDetails: data?.details
		}).unwrap();
	};

	return {
		data: data?.form as T | undefined,
		details: data?.details,
		eventOptionId: resolvedEventOptionId,
		selectPoolMember: setSupplyId,
		isError,
		isLoading: isUpdateLoading,
		update
	};
};

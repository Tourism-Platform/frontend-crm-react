import { useParams } from "react-router-dom";

import { ENUM_EVENT_MODE, type ENUM_EVENT_MODE_TYPE } from "../types";

export interface IEventEditIds {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	mode: ENUM_EVENT_MODE_TYPE;
}

export const useEventEditIds = (): IEventEditIds => {
	const {
		tourId = "",
		optionId = "",
		eventId = "",
		eventOptionId = ""
	} = useParams<{
		tourId: string;
		optionId: string;
		eventId: string;
		eventOptionId?: string;
	}>();

	return {
		tourId,
		optionId,
		eventId,
		eventOptionId,
		mode: eventOptionId ? ENUM_EVENT_MODE.MULTI : ENUM_EVENT_MODE.SINGLE
	};
};

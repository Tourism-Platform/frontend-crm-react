import type { FieldValues } from "react-hook-form";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import { mapEventUpdatePartsToBackend } from "../converters";
import type {
	ENUM_EVENT_TYPE,
	IEventAutosaveParts,
	TEventDetailsBackend,
	TTourEventUpdate
} from "../types";

import {
	useUpdateEventOptionMutation,
	useUpdateEventPoolMemberMutation
} from "./event.service";

interface IUseEventAutosavePartsParams {
	type: ENUM_EVENT_TYPE;
	tourId: string;
	optionId: string;
	eventId: string;
	/** Nothing is built until the option row id is resolved. */
	eventOptionId?: string;
	/** Current READ details — the member route echoes the supplier from it. */
	details?: TEventDetailsBackend;
}

/**
 * Event autosave parts over `PATCH O` / `PATCH M`. Bodies are built here, at
 * the API boundary, so `useAutosave` compares exactly what is sent.
 */
export const useEventAutosaveParts = <T extends FieldValues>({
	type,
	tourId,
	optionId,
	eventId,
	eventOptionId,
	details
}: IUseEventAutosavePartsParams) => {
	const [updateEventOption] = useUpdateEventOptionMutation();
	const [updateEventPoolMember] = useUpdateEventPoolMemberMutation();

	return (language?: ENUM_LANGUAGES_TYPE): IEventAutosaveParts<T> => {
		const build = (values: T) =>
			eventOptionId
				? mapEventUpdatePartsToBackend({
						type,
						data: values as TTourEventUpdate,
						language,
						currentDetails: details
					})
				: undefined;
		const target = {
			tourId,
			optionId,
			eventId,
			eventOptionId: eventOptionId!
		};

		return {
			option: {
				key: "option",
				build: (values) => build(values)?.option,
				save: (body) => updateEventOption({ ...target, body }).unwrap()
			},
			member: {
				key: "member",
				build: (values) => build(values)?.member,
				save: ({ supplyId, body }) =>
					updateEventPoolMember({ ...target, supplyId, body }).unwrap()
			}
		};
	};
};

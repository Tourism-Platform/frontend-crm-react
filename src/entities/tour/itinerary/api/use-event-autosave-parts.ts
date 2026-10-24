import type { FieldValues } from "react-hook-form";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import {
	mapEventUpdatePartsToBackend,
	mapTourEventDetailsFromBackend
} from "../converters";
import type {
	ENUM_EVENT_TYPE,
	IEventAutosaveParts,
	TTourEventBackendResponce,
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
	/** Current slot READ — the member route echoes the supplier from it. */
	read?: TTourEventBackendResponce;
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
	read
}: IUseEventAutosavePartsParams) => {
	const [updateEventOption] = useUpdateEventOptionMutation();
	const [updateEventPoolMember] = useUpdateEventPoolMemberMutation();

	return (language?: ENUM_LANGUAGES_TYPE): IEventAutosaveParts<T> => {
		if (!eventOptionId) {
			const idle = {
				build: () => undefined,
				save: async () => undefined
			};
			return {
				option: { key: "option", ...idle },
				member: { key: "member", ...idle }
			};
		}

		const details = read
			? mapTourEventDetailsFromBackend(read, eventOptionId)
			: undefined;
		const build = (values: T) =>
			mapEventUpdatePartsToBackend(
				{ type, data: values as TTourEventUpdate, language },
				details
			);
		const target = { tourId, optionId, eventId, eventOptionId };

		return {
			option: {
				key: "option",
				build: (values) => build(values).option,
				save: (body) => updateEventOption({ ...target, body }).unwrap()
			},
			member: {
				key: "member",
				build: (values) => build(values).member,
				save: ({ supplyId, body }) =>
					updateEventPoolMember({
						...target,
						supplyId,
						body
					}).unwrap()
			}
		};
	};
};

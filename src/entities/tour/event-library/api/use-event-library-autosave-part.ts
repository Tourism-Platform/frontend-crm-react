import type { FieldValues } from "react-hook-form";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type {
	ENUM_EVENT_TYPE,
	TTourEventUpdate
} from "@/entities/tour/itinerary";

import { mapEventLibraryUpdateToBackend } from "../converters";
import type { TEventLibraryAutosavePart } from "../types";

import { useGetEventLibraryReadQuery } from "./event-library-read.service";
import { useUpdateEventLibraryBodyMutation } from "./event-library.service";

interface IUseEventLibraryAutosavePartParams {
	type: ENUM_EVENT_TYPE;
	libraryId: string;
	language?: ENUM_LANGUAGES_TYPE;
	/** Off in create mode: there is no entry to write yet. */
	enabled: boolean;
}

/**
 * Autosave part of a library entry, built at the API boundary. The current
 * pool is read from the entry READ and echoed into the body (the library
 * has no member route).
 */
export const useEventLibraryAutosavePart = <T extends FieldValues>({
	type,
	libraryId,
	language,
	enabled
}: IUseEventLibraryAutosavePartParams): TEventLibraryAutosavePart<T> => {
	const { data: read } = useGetEventLibraryReadQuery(libraryId, {
		skip: !libraryId || !enabled
	});
	const [updateBody] = useUpdateEventLibraryBodyMutation();

	return {
		key: "entry",
		build: (values) =>
			mapEventLibraryUpdateToBackend(
				type,
				values as unknown as TTourEventUpdate,
				language,
				read?.event.details
			),
		save: (body) => updateBody({ libraryId, body }).unwrap()
	};
};

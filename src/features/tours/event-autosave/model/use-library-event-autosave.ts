import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import {
	type IUseAutosaveResult,
	mapApiErrorsToForm,
	useAutosave
} from "@/shared/lib";
import { useAutosaveToast } from "@/shared/ui";

import { type ENUM_EVENT_TYPE, useEventLibraryAutosavePart } from "@/entities/tour";

import { toEventFormPath } from "./to-event-form-path";

export interface ILibraryEventAutosaveEdit<T> {
	libraryId: string;
	/** Off in create mode: a new entry is created by its button first. */
	enabled: boolean;
	data: T | undefined;
	recordKey: string | undefined;
}

const ALL_SECTIONS = [
	"name",
	"general",
	"cars",
	"rooms",
	"items",
	"guides",
	"pricing"
];

/**
 * Library entry autosave: one part over the shared `useAutosave`. The library
 * has no member route — `PATCH /tour/event/library/{id}` writes the whole
 * entry (fe6.4 §14), so the body is the full converter output.
 */
export const useLibraryEventAutosave = <T extends FieldValues>(
	type: ENUM_EVENT_TYPE,
	form: UseFormReturn<T>,
	edit: ILibraryEventAutosaveEdit<T>
): IUseAutosaveResult => {
	const { t, i18n } = useTranslation("common_events");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const entry = useEventLibraryAutosavePart<T>({
		type,
		libraryId: edit.libraryId,
		language,
		enabled: edit.enabled
	});

	const autosave = useAutosave(form, {
		enabled: edit.enabled,
		server: { data: edit.data, recordKey: edit.recordKey },
		// Field issues go under the fields; the toast reports the failure.
		onError: (error) => mapApiErrorsToForm(error, form, toEventFormPath),
		parts: [{ ...entry, validate: ALL_SECTIONS as FieldPath<T>[] }]
	});

	useAutosaveToast(autosave.status, t("autosave.error"));

	return autosave;
};

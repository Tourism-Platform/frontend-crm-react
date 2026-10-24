import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE,
	i18nLanguageMapper
} from "@/shared/config";
import {
	type IUseAutosaveResult,
	mapApiErrorsToForm,
	useAutosave
} from "@/shared/lib";
import { useAutosaveToast } from "@/shared/ui";

import type { IEventAutosaveParts } from "@/entities/tour";

import { toEventFormPath } from "./to-event-form-path";

/** What `useTourEventEdit` exposes about the edited record. */
export interface IEventAutosaveEdit<T extends FieldValues> {
	data: T | undefined;
	eventOptionId?: string;
	recordKey?: string;
	getAutosaveParts: (language?: ENUM_LANGUAGES_TYPE) => IEventAutosaveParts<T>;
}

/** Sections the option part depends on (texts and plan). */
const OPTION_SECTIONS = ["name", "general"];
/** Sections the supplier spec depends on (missing ones are skipped by RHF). */
const MEMBER_SECTIONS = [
	"general",
	"cars",
	"rooms",
	"items",
	"guides",
	"pricing"
];

/**
 * Event autosave: two independent parts over the shared `useAutosave` —
 * `option` (`PATCH O`: texts, package, plan) and `member` (`PATCH M`: the
 * selected inline supplier spec). The entity builds and sends the bodies.
 */
export const useEventAutosave = <T extends FieldValues>(
	form: UseFormReturn<T>,
	edit: IEventAutosaveEdit<T>
): IUseAutosaveResult => {
	const { t, i18n } = useTranslation("common_events");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { option, member } = edit.getAutosaveParts(language);

	const autosave = useAutosave(form, {
		enabled: Boolean(edit.eventOptionId),
		server: { data: edit.data, recordKey: edit.recordKey },
		// Field issues go under the fields; the toast reports the failure.
		onError: (error) => mapApiErrorsToForm(error, form, toEventFormPath),
		parts: [
			{ ...option, validate: OPTION_SECTIONS as FieldPath<T>[] },
			{ ...member, validate: MEMBER_SECTIONS as FieldPath<T>[] }
		]
	});

	useAutosaveToast(autosave.status, t("autosave.error"));

	return autosave;
};

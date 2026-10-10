import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import {
	type IAutosavePart,
	type IUseAutosaveResult,
	mapApiErrorsToForm,
	useAutosave
} from "@/shared/lib";
import { useAutosaveToast } from "@/shared/ui";

import {
	type ENUM_EVENT_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	type TEventDetailsBackend,
	type TTourEventMemberUpdateBackend,
	type TTourEventOptionUpdateBackend,
	type TTourEventUpdate,
	mapEventUpdateToBackend,
	splitEventUpdate,
	useUpdateEventOptionMutation,
	useUpdateEventPoolMemberMutation,
	withIndividualPricing
} from "@/entities/tour";

import { toEventFormPath } from "./to-event-form-path";

/** What `useTourEventEdit` exposes about the edited record. */
export interface IEventAutosaveEdit<T> {
	data: T | undefined;
	details?: TEventDetailsBackend;
	eventOptionId?: string;
	recordKey?: string;
	ids: { tourId: string; optionId: string; eventId: string };
}

type TMemberBody = { supplyId: string; body: TTourEventMemberUpdateBackend };

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
 * selected inline supplier spec). Bodies come from the existing form
 * converters split by `splitEventUpdate`; the member is built with
 * individual pricing so a package never wipes supplier prices (fe6.4 §7).
 */
export const useEventAutosave = <T extends FieldValues>(
	type: ENUM_EVENT_TYPE,
	form: UseFormReturn<T>,
	edit: IEventAutosaveEdit<T>
): IUseAutosaveResult => {
	const { t, i18n } = useTranslation("common_events");
	const [updateOption] = useUpdateEventOptionMutation();
	const [updateMember] = useUpdateEventPoolMemberMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { eventOptionId, details, ids } = edit;

	const toBackend = (values: T, individual: boolean) => {
		const data = values as unknown as TTourEventUpdate;
		const supplyId = (values as Record<string, unknown>)[
			ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID
		] as string | undefined;
		return splitEventUpdate(
			mapEventUpdateToBackend(type, data, language, details),
			supplyId,
			details,
			individual
				? mapEventUpdateToBackend(
						type,
						withIndividualPricing(data),
						language,
						details
					)
				: undefined
		);
	};

	const optionPart: IAutosavePart<T, TTourEventOptionUpdateBackend> = {
		key: "option",
		validate: OPTION_SECTIONS as FieldPath<T>[],
		build: (values) =>
			eventOptionId ? toBackend(values, false).option : undefined,
		save: (body) =>
			updateOption({
				...ids,
				eventOptionId: eventOptionId!,
				body
			}).unwrap()
	};

	const memberPart: IAutosavePart<T, TMemberBody> = {
		key: "member",
		validate: MEMBER_SECTIONS as FieldPath<T>[],
		build: (values) =>
			eventOptionId ? toBackend(values, true).member : undefined,
		save: ({ supplyId, body }) =>
			updateMember({
				...ids,
				eventOptionId: eventOptionId!,
				supplyId,
				body
			}).unwrap()
	};

	const autosave = useAutosave(form, {
		enabled: Boolean(eventOptionId),
		server: { data: edit.data, recordKey: edit.recordKey },
		// Field issues go under the fields; the toast reports the failure.
		onError: (error) => mapApiErrorsToForm(error, form, toEventFormPath),
		parts: [optionPart, memberPart]
	});

	useAutosaveToast(autosave.status, t("autosave.error"));

	return autosave;
};

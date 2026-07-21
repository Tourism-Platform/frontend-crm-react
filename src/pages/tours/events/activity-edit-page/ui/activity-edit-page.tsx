import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ACTIVITY_EDIT_SCHEMA,
	ENUM_EVENT,
	type TActivityEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { ActivityEdit } from "@/widgets/tours";
import type { ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/activity-edit/model";

export const ActivityEditPage: FC = () => {
	const { t, i18n } = useTranslation("activity_edit_page");
	const {
		tourId = "",
		optionId = "",
		eventId = ""
	} = useParams<{
		tourId: string;
		eventId: string;
		optionId: string;
	}>();

	const { data: eventData, isError: isLoadError } = useGetTourEventQuery(
		{ tourId, optionId, eventId },
		{ skip: !tourId || !optionId || !eventId }
	);

	const [updateTourEvent, { isLoading: isUpdateLoading }] =
		useUpdateTourEventMutation();

	const form = useForm<TActivityEditSchema>({
		resolver: zodResolver(ACTIVITY_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TActivityEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			const isValid = await form.trigger(section);
			if (!isValid) return;

			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.ACTIVITY,
					language:
						i18nLanguageMapper.to(i18n.language) ??
						ENUM_LANGUAGES.EN,
					data: form.getValues()
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
			} catch (error) {
				toast.error(t("form.toasts.save.error"));
				console.log(error);
			}
		};

	return (
		<ActivityEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isUpdateLoading}
		/>
	);
};

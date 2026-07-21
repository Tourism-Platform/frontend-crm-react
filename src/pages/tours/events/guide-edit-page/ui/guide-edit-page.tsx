import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_EVENT,
	GUIDE_EDIT_SCHEMA,
	type TGuideEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { GuideEdit } from "@/widgets/tours";
import type { ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/guide-edit/model";

export const GuideEditPage: FC = () => {
	const { t, i18n } = useTranslation("guide_edit_page");
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

	const form = useForm<TGuideEditSchema>({
		resolver: zodResolver(GUIDE_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TGuideEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			if (!(await form.trigger(section))) {
				return;
			}

			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.GUIDE,
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
		<GuideEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isUpdateLoading}
		/>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ACCOMMODATION_EDIT_SCHEMA,
	ENUM_EVENT,
	type TAccommodationEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { AccommodationEdit } from "@/widgets/tours";

export const AccommodationEditPage: FC = () => {
	const { t, i18n } = useTranslation("accommodation_edit_page");
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

	const form = useForm<TAccommodationEditSchema>({
		resolver: zodResolver(ACCOMMODATION_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TAccommodationEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit = async () => {
		if (
			!(await validateFormWithSectionToast(form, t, {
				keyPrefix: "form.toasts.validation.error"
			}))
		) {
			return;
		}

		try {
			await updateTourEvent({
				tourId,
				optionId,
				eventId,
				type: ENUM_EVENT.ACCOMMODATION,
				language:
					i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN,
				data: form.getValues()
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.log(error);
		}
	};

	return (
		<AccommodationEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isUpdateLoading}
		/>
	);
};

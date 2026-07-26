import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ACTIVITY_EDIT_SCHEMA,
	ENUM_EVENT,
	type TActivityEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { ActivityEdit } from "@/widgets/tours";

export const ActivityEditPage: FC = () => {
	const { t, i18n } = useTranslation("activity_edit_page");
	const { data, isError, isLoading, update } =
		useTourEventEdit<TActivityEditSchema>(ENUM_EVENT.ACTIVITY);

	const form = useForm<TActivityEditSchema>({
		resolver: zodResolver(ACTIVITY_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isError, t]);

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data, form]);

	const createSectionSubmit = async () => {
		const isValid = await validateFormWithSectionToast(form, t, {
			keyPrefix: "form.toasts.validation.error"
		});
		if (!isValid) return;

		try {
			await update(
				form.getValues(),
				i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN
			);
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
			isLoading={isLoading}
		/>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ENUM_EVENT,
	SUPPLEMENT_EDIT_SCHEMA,
	type TSupplementEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { SupplementEdit } from "@/widgets/tours";
import type { ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/supplement-edit/model";

export const SupplementEditPage: FC = () => {
	const { t, i18n } = useTranslation("supplement_edit_page");
	const { data, isError, isLoading, update } =
		useTourEventEdit<TSupplementEditSchema>(ENUM_EVENT.SUPPLEMENT);

	const form = useForm<TSupplementEditSchema>({
		resolver: zodResolver(SUPPLEMENT_EDIT_SCHEMA),
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

	const createSectionSubmit = async (section?: ENUM_FORM_SECTION_TYPE) => {
		if (
			!(await validateFormWithSectionToast(form, t, {
				keyPrefix: "form.toasts.validation.error",
				...(section && { fields: section })
			}))
		) {
			return;
		}

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
		<SupplementEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
		/>
	);
};

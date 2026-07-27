import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ENUM_EVENT,
	TRANSPORTATION_EDIT_SCHEMA,
	type TTransportationEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { TransportationEdit } from "@/widgets/tours";
import type { ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/transportation-edit/model";

export const TransportationEditPage: FC = () => {
	const { t, i18n } = useTranslation("transportation_edit_page");
	const { data, isError, isLoading, update } =
		useTourEventEdit<TTransportationEditSchema>(ENUM_EVENT.TRANSPORTATION);

	const form = useForm<TTransportationEditSchema>({
		resolver: zodResolver(TRANSPORTATION_EDIT_SCHEMA),
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
		<TransportationEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
		/>
	);
};

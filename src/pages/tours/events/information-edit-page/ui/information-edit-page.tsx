import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ENUM_EVENT,
	INFO_EDIT_SCHEMA,
	type TInfoEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { InformationEdit } from "@/widgets/tours";

export const InformationEditPage: FC = () => {
	const { t } = useTranslation("information_edit_page");
	const { data, isError, isLoading, update } =
		useTourEventEdit<TInfoEditSchema>(ENUM_EVENT.INFO);

	const form = useForm<TInfoEditSchema>({
		resolver: zodResolver(INFO_EDIT_SCHEMA),
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
			await update(form.getValues());
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.log(error);
		}
	};

	return (
		<InformationEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
		/>
	);
};

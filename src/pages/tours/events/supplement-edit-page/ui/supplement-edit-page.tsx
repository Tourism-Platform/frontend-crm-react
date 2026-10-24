import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_EVENT,
	SUPPLEMENT_EDIT_SCHEMA,
	type TSupplementEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { ENUM_EVENT_POOL_VARIANT, useEventAutosave } from "@/features/tours";

import { SupplementEdit } from "@/widgets/tours";

export const SupplementEditPage: FC = () => {
	const { t } = useTranslation("supplement_edit_page");
	const edit = useTourEventEdit<TSupplementEditSchema>(ENUM_EVENT.SUPPLEMENT);

	const form = useForm<TSupplementEditSchema>({
		resolver: zodResolver(SUPPLEMENT_EDIT_SCHEMA),
		mode: "onChange"
	});

	// Saves on change (debounced), keeps the form in sync with the server.
	const autosave = useEventAutosave(form, edit);

	useEffect(() => {
		if (edit.isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [edit.isError, t]);

	// Pending edits belong to the current supplier: save them before switching.
	const handlePoolSelect = async (supplyId: string | undefined) => {
		await autosave.flush();
		edit.selectPoolMember(supplyId);
	};

	return (
		<SupplementEdit
			form={form}
			isLoading={false}
			onBlur={autosave.handleBlur}
			poolVariant={ENUM_EVENT_POOL_VARIANT.TOUR}
			onPoolSelect={handlePoolSelect}
		/>
	);
};

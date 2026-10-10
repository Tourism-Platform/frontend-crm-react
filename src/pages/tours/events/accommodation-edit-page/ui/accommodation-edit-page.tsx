import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ACCOMMODATION_EDIT_SCHEMA,
	ENUM_EVENT,
	type TAccommodationEditSchema,
	useTourEventEdit
} from "@/entities/tour";

import { ENUM_EVENT_POOL_VARIANT, useEventAutosave } from "@/features/tours";

import { AccommodationEdit } from "@/widgets/tours";

export const AccommodationEditPage: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
	const edit = useTourEventEdit<TAccommodationEditSchema>(
		ENUM_EVENT.ACCOMMODATION
	);

	const form = useForm<TAccommodationEditSchema>({
		resolver: zodResolver(ACCOMMODATION_EDIT_SCHEMA),
		mode: "onChange"
	});

	// Saves on change (debounced), keeps the form in sync with the server.
	const autosave = useEventAutosave(ENUM_EVENT.ACCOMMODATION, form, edit);

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
		<AccommodationEdit
			form={form}
			isLoading={false}
			onBlur={autosave.handleBlur}
			poolVariant={ENUM_EVENT_POOL_VARIANT.TOUR}
			onPoolSelect={handlePoolSelect}
		/>
	);
};

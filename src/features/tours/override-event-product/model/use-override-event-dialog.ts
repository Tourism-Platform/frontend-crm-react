import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type TEventOverride
} from "@/entities/tour";

import {
	mapFormValuesToOverride,
	mapOverrideToFormValues
} from "./map-override-form";
import type { TOverrideProductFormValues } from "./types";

interface IUseOverrideEventDialogParams {
	open: boolean;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	initialOverride?: TEventOverride | null;
	onConfirm: (data: TEventOverride) => void | Promise<void>;
}

export const useOverrideEventDialog = ({
	open,
	eventTyp,
	initialOverride,
	onConfirm
}: IUseOverrideEventDialogParams) => {
	const form = useForm<TOverrideProductFormValues>({
		defaultValues: mapOverrideToFormValues(eventTyp, initialOverride)
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		form.reset(mapOverrideToFormValues(eventTyp, initialOverride));
	}, [open, eventTyp, initialOverride, form]);

	const handleConfirm = form.handleSubmit(async (values) => {
		await onConfirm(mapFormValuesToOverride(eventTyp, values));
	});

	const isHousing = eventTyp === ENUM_EVENT_BACKEND.HOUSING;

	return {
		form,
		handleConfirm,
		showPolicy: isHousing,
		showChargeTyp: isHousing
	};
};

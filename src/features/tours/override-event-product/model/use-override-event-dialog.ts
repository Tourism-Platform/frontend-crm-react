import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { TEventOverride } from "@/entities/tour";

import {
	type TOverrideEventKind,
	mapFormValuesToOverride,
	mapOverrideToFormValues
} from "./map-override-form";
import type { TOverrideProductFormValues } from "./types";

interface IUseOverrideEventDialogParams {
	open: boolean;
	kind: TOverrideEventKind;
	initialOverride?: TEventOverride | null;
	onConfirm: (data: TEventOverride) => void | Promise<void>;
}

export const useOverrideEventDialog = ({
	open,
	kind,
	initialOverride,
	onConfirm
}: IUseOverrideEventDialogParams) => {
	const form = useForm<TOverrideProductFormValues>({
		defaultValues: mapOverrideToFormValues(kind, initialOverride)
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		form.reset(mapOverrideToFormValues(kind, initialOverride));
	}, [open, kind, initialOverride, form]);

	const handleConfirm = form.handleSubmit(async (values) => {
		await onConfirm(mapFormValuesToOverride(kind, values));
	});

	return {
		form,
		handleConfirm,
		showPolicy: kind === "housing",
		showChargeTyp: kind === "housing"
	};
};

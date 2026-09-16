import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type IOverrideUnitOption,
	type TEventOverrideInputBackend,
	type TOverrideProductFormValues,
	mapEventOverrideToForm
} from "@/entities/tour";

import { getUnitChargeOptions } from "./config/override-pricing.config";

interface IUseOverrideEventDialogParams {
	open: boolean;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	initialOverride?: TEventOverrideInputBackend | null;
	/** Units the per-unit arm can reprice — from the pool member's spec. */
	units: IOverrideUnitOption[];
	onConfirm: (values: TOverrideProductFormValues) => void | Promise<void>;
}

export const useOverrideEventDialog = ({
	open,
	eventTyp,
	initialOverride,
	units,
	onConfirm
}: IUseOverrideEventDialogParams) => {
	const form = useForm<TOverrideProductFormValues>({
		defaultValues: mapEventOverrideToForm(eventTyp, initialOverride, units)
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		form.reset(mapEventOverrideToForm(eventTyp, initialOverride, units));
	}, [open, eventTyp, initialOverride, units, form]);

	const handleConfirm = form.handleSubmit(async (values) => {
		await onConfirm(values);
	});

	const isHousing = eventTyp === ENUM_EVENT_BACKEND.HOUSING;
	const isActivity = eventTyp === ENUM_EVENT_BACKEND.ACTIVITY;

	return {
		form,
		handleConfirm,
		showPolicy: isHousing,
		showChargeTyp: isHousing,
		/** Activity prices per offering only — there is no whole arm. */
		showArmSelector: !isActivity,
		unitChargeOptions: getUnitChargeOptions(eventTyp)
	};
};

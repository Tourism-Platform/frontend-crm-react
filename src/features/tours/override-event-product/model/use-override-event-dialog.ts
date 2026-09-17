import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	type IOverrideUnitOption,
	type TEventOverrideInputBackend,
	type TOverridePerUnitPricing,
	type TOverrideProductFormValues,
	mapEventOverrideToForm
} from "@/entities/tour";

import {
	applyOverridePricingTab,
	createEmptyOverrideMarkup,
	getOverridePricingTab,
	getUnitChargeOptions
} from "./config";

interface IUseOverrideEventDialogParams {
	open: boolean;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	initialOverride?: TEventOverrideInputBackend | null;
	/** Units the per-unit arm can reprice — from the pool member's spec. */
	units: IOverrideUnitOption[];
	perUnitArm: TOverridePerUnitPricing;
	onConfirm: (values: TOverrideProductFormValues) => void | Promise<void>;
}

export const useOverrideEventDialog = ({
	open,
	eventTyp,
	initialOverride,
	units,
	perUnitArm,
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
	const pricingType = form.watch(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE);
	const arm = form.watch(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_ARM);

	const handleTabChange = (tab: string) => {
		const next = applyOverridePricingTab(tab, perUnitArm);
		form.setValue(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_ARM, next.pricing_arm);
		if (next.pricing_type) {
			form.setValue(
				ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE,
				next.pricing_type
			);
		}
	};

	const addMarginSeparately = form.watch(
		ENUM_FORM_OVERRIDE_PRODUCT.ADD_MARGIN_SEPARATELY
	);

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			ENUM_FORM_OVERRIDE_PRODUCT.ADD_MARGIN_SEPARATELY,
			checked
		);
		form.setValue(
			ENUM_FORM_OVERRIDE_PRODUCT.MARKUP,
			checked ? createEmptyOverrideMarkup() : null
		);
		form.getValues(ENUM_FORM_OVERRIDE_PRODUCT.UNITS).forEach((_, index) => {
			form.setValue(
				`${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}.markup`,
				checked ? createEmptyOverrideMarkup() : null
			);
		});
	};

	return {
		form,
		handleConfirm,
		showPolicy: isHousing,
		showChargeTyp: isHousing,
		/** Activity prices per offering only — there is no whole arm. */
		showArmSelector: !isActivity,
		unitChargeOptions: getUnitChargeOptions(eventTyp),
		activeTab: getOverridePricingTab(arm, pricingType, perUnitArm),
		handleTabChange,
		addMarginSeparately,
		handleAddMarginSeparatelyChange
	};
};

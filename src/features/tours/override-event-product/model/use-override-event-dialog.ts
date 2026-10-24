import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	ENUM_EVENT_KIND,
	type ENUM_EVENT_KIND_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	type TOverridePerUnitPricing,
	type TOverrideProductFormValues
} from "@/entities/tour";

import {
	applyOverridePricingTab,
	createEmptyOverrideMarkup,
	getOverridePricingTab,
	getUnitChargeOptions
} from "./config";

interface IUseOverrideEventDialogParams {
	open: boolean;
	eventKind: ENUM_EVENT_KIND_TYPE;
	/** Undefined until the event is loaded. */
	initialValues?: TOverrideProductFormValues;
	perUnitArm: TOverridePerUnitPricing;
	onConfirm: (values: TOverrideProductFormValues) => void | Promise<void>;
}

export const useOverrideEventDialog = ({
	open,
	eventKind,
	initialValues,
	perUnitArm,
	onConfirm
}: IUseOverrideEventDialogParams) => {
	const form = useForm<TOverrideProductFormValues>({
		defaultValues: initialValues
	});

	useEffect(() => {
		if (!open || !initialValues) {
			return;
		}

		form.reset(initialValues);
	}, [open, initialValues, form]);

	const handleConfirm = form.handleSubmit(async (values) => {
		await onConfirm(values);
	});

	const isHousing = eventKind === ENUM_EVENT_KIND.HOUSING;
	const isActivity = eventKind === ENUM_EVENT_KIND.ACTIVITY;
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
		unitChargeOptions: getUnitChargeOptions(eventKind),
		activeTab: getOverridePricingTab(arm, pricingType, perUnitArm),
		handleTabChange,
		addMarginSeparately,
		handleAddMarginSeparatelyChange
	};
};

import { type FC } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	LoaderButton,
	Separator
} from "@/shared/ui";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_PRICING_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_PRICING_ARM,
	type ENUM_OVERRIDE_PRICING_ARM_TYPE,
	type IOverrideUnitOption,
	type TEventOverrideInputBackend,
	type TOverrideProductFormValues
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	FORM_OVERRIDE_ARM_LIST,
	FORM_OVERRIDE_HOUSING_CHARGE_LIST,
	FORM_OVERRIDE_POLICY_LIST,
	FORM_OVERRIDE_PRICING_LIST,
	useOverrideEventDialog
} from "../model";

interface IOverrideEventDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	initialOverride?: TEventOverrideInputBackend | null;
	/** Units the per-unit arm can reprice — from the pool member's spec. */
	units: IOverrideUnitOption[];
	/** Backend pricing key of the per-unit arm for this event type. */
	perUnitArm: ENUM_OVERRIDE_PRICING_ARM_TYPE;
	isSubmitting?: boolean;
	onConfirm: (values: TOverrideProductFormValues) => void | Promise<void>;
}

export const OverrideEventDialog: FC<IOverrideEventDialogProps> = ({
	open,
	onOpenChange,
	eventTyp,
	initialOverride,
	units,
	perUnitArm,
	isSubmitting,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");
	const {
		form,
		handleConfirm,
		showPolicy,
		showChargeTyp,
		showArmSelector,
		unitChargeOptions
	} = useOverrideEventDialog({
		open,
		eventTyp,
		initialOverride,
		units,
		onConfirm
	});
	const { fields: unitFields } = useFieldArray({
		control: form.control,
		name: ENUM_FORM_OVERRIDE_PRODUCT.UNITS
	});

	const pricingType = form.watch(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE);
	const arm = form.watch(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_ARM);
	const showHousingCharge =
		showChargeTyp && pricingType === ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE;
	const showWholeArm =
		showArmSelector && arm === ENUM_OVERRIDE_PRICING_ARM.WHOLE;
	const showUnitArm =
		!showArmSelector || arm !== ENUM_OVERRIDE_PRICING_ARM.WHOLE;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[720px] max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{t("override_product.dialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("override_product.dialog.description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<div className="grid gap-4">
						{showArmSelector
							? FORM_OVERRIDE_ARM_LIST(perUnitArm).map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)
							: null}

						{showWholeArm ? (
							<>
								{FORM_OVERRIDE_PRICING_LIST.map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}
								{showHousingCharge
									? FORM_OVERRIDE_HOUSING_CHARGE_LIST().map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													control={form.control}
													name={key}
													t={t}
													{...item}
												/>
											)
										)
									: null}
								<FeeLinesField
									control={form.control}
									name={ENUM_FORM_OVERRIDE_PRODUCT.FEES}
								/>
							</>
						) : null}

						{showUnitArm ? (
							<div className="grid gap-3">
								<p className="text-sm font-medium">
									{t(
										"override_product.dialog.fields.units.label"
									)}
								</p>
								{unitFields.length === 0 ? (
									<p className="text-sm text-muted-foreground">
										{t(
											"override_product.dialog.fields.units.empty"
										)}
									</p>
								) : null}
								{unitFields.map((field, index) => (
									<div
										key={field.id}
										className="grid gap-2 rounded-md border p-3"
									>
										<p className="text-sm font-medium">
											{field.name}
										</p>
										{unitChargeOptions.length > 1 ? (
											<CustomField
												control={form.control}
												name={`${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}.charge_typ`}
												fieldType="select"
												options={unitChargeOptions}
												label="override_product.dialog.fields.unit_charge.label"
												t={t}
											/>
										) : null}
										<div className="grid grid-cols-2 gap-2">
											<CustomField
												control={form.control}
												name={`${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}.total_price`}
												fieldType="input"
												type="number"
												label="override_product.dialog.fields.total_price.label"
												t={t}
											/>
											<CustomField
												control={form.control}
												name={`${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}.currency`}
												fieldType="select"
												options={CURRENCY_OPTIONS}
												label="override_product.dialog.fields.currency.label"
												t={t}
											/>
										</div>
										<FeeLinesField
											control={form.control}
											name={`${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}.fees`}
										/>
									</div>
								))}
							</div>
						) : null}

						{showPolicy ? (
							<>
								<Separator />
								{FORM_OVERRIDE_POLICY_LIST.map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}
							</>
						) : null}
					</div>
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="outline"
							disabled={isSubmitting}
						>
							{t("override_product.dialog.cancel")}
						</Button>
					</DialogClose>
					<LoaderButton
						type="button"
						onClick={handleConfirm}
						isLoading={isSubmitting}
						label={t("override_product.dialog.confirm")}
						loadingLabel={t("override_product.dialog.confirming")}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

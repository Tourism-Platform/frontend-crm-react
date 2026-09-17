import { type FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Button,
	Checkbox,
	CustomField,
	CustomInputSelect,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	Label,
	LoaderButton,
	Separator
} from "@/shared/ui";

import {
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_PRICING_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	type IOverrideUnitOption,
	type TEventOverrideInputBackend,
	type TOverridePerUnitPricing,
	type TOverrideProductForm,
	type TOverrideProductFormValues
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	FORM_OVERRIDE_HOUSING_CHARGE_LIST,
	FORM_OVERRIDE_POLICY_LIST,
	OVERRIDE_MARKUP_FIELD,
	getOverridePricingTabsList,
	useOverrideEventDialog
} from "../model";

import { OverrideUnitDetails } from "./override-unit-details";

interface IOverrideEventDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	initialOverride?: TEventOverrideInputBackend | null;
	/** Units the per-unit arm can reprice — from the pool member's spec. */
	units: IOverrideUnitOption[];
	/** Backend pricing key of the per-unit arm for this event type. */
	perUnitArm: TOverridePerUnitPricing;
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
		unitChargeOptions,
		activeTab,
		handleTabChange,
		addMarginSeparately,
		handleAddMarginSeparatelyChange
	} = useOverrideEventDialog({
		open,
		eventTyp,
		initialOverride,
		units,
		perUnitArm,
		onConfirm
	});
	const { fields: unitFields } = useFieldArray({
		control: form.control,
		name: ENUM_FORM_OVERRIDE_PRODUCT.UNITS
	});
	const housingChargeList = FORM_OVERRIDE_HOUSING_CHARGE_LIST();
	const tabsList = getOverridePricingTabsList(perUnitArm);

	const renderWholeDetails = (
		priceDetailsList: TOverrideProductForm[],
		withHousingCharge: boolean,
		tabType: string
	) => {
		const detailsList = withHousingCharge
			? [...housingChargeList, ...priceDetailsList]
			: priceDetailsList;

		return (
			<div className="grid gap-4">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h3 className="text-lg">
						{t("override_product.dialog.pricing.details_title")}
					</h3>
					<div className="flex items-center gap-2">
						<Checkbox
							id={`add-margin-separately-${tabType}`}
							checked={Boolean(addMarginSeparately)}
							onCheckedChange={(checked) =>
								handleAddMarginSeparatelyChange(
									Boolean(checked)
								)
							}
						/>
						<Label htmlFor={`add-margin-separately-${tabType}`}>
							{t(
								"override_product.dialog.pricing.add_margin_separately"
							)}
						</Label>
					</div>
				</div>
				<div
					className={cn(
						"grid w-full min-w-0 gap-4",
						withHousingCharge &&
							addMarginSeparately &&
							"grid-cols-[0.5fr_1fr_0.5fr_0.5fr]",
						withHousingCharge &&
							!addMarginSeparately &&
							"grid-cols-[0.5fr_1fr_0.5fr]",
						!withHousingCharge &&
							addMarginSeparately &&
							"grid-cols-[1fr_0.5fr_0.5fr]",
						!withHousingCharge &&
							!addMarginSeparately &&
							"grid-cols-[1fr_0.5fr]"
					)}
				>
					{detailsList.map(({ key, ...item }, fieldIndex) => (
						<Fragment key={key}>
							{addMarginSeparately &&
							fieldIndex === detailsList.length - 1 ? (
								<CustomInputSelect
									control={form.control}
									name={OVERRIDE_MARKUP_FIELD.key}
									label={OVERRIDE_MARKUP_FIELD.label}
									placeholder={
										OVERRIDE_MARKUP_FIELD.placeholder
									}
									selectOptions={[
										...OVERRIDE_MARKUP_FIELD.selectOptions
									]}
									t={t}
								/>
							) : null}
							<CustomField
								control={form.control}
								name={key}
								t={t}
								{...item}
							/>
						</Fragment>
					))}
				</div>
				<FeeLinesField
					control={form.control}
					name={ENUM_FORM_OVERRIDE_PRODUCT.FEES}
				/>
			</div>
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[calc(100%-2rem)] w-full overflow-y-auto sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>
						{t("override_product.dialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("override_product.dialog.description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<div className="grid gap-5">
						{showArmSelector ? (
							<div className="grid gap-1">
								<h3 className="text-lg">
									{t("override_product.dialog.pricing.title")}
								</h3>
								<CustomOptionTabs
									value={activeTab}
									onValueChange={handleTabChange}
								>
									<CustomOptionTabsList className="grid grid-cols-3 w-fit">
										{tabsList.map((tab) => (
											<CustomOptionTabsTrigger
												key={tab.type}
												value={tab.type}
												variant={"outline"}
											>
												{t(tab.label)}
											</CustomOptionTabsTrigger>
										))}
									</CustomOptionTabsList>
									{tabsList.map((tab) => (
										<CustomOptionTabsContent
											key={tab.type}
											value={tab.type}
										>
											{tab.priceDetailsList ? (
												renderWholeDetails(
													tab.priceDetailsList,
													showChargeTyp &&
														tab.type ===
															ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
													tab.type
												)
											) : (
												<OverrideUnitDetails
													form={form}
													unitFields={unitFields}
													unitChargeOptions={
														unitChargeOptions
													}
													addMarginSeparately={Boolean(
														addMarginSeparately
													)}
													onAddMarginSeparatelyChange={
														handleAddMarginSeparatelyChange
													}
												/>
											)}
										</CustomOptionTabsContent>
									))}
								</CustomOptionTabs>
							</div>
						) : (
							<OverrideUnitDetails
								form={form}
								unitFields={unitFields}
								unitChargeOptions={unitChargeOptions}
								addMarginSeparately={Boolean(
									addMarginSeparately
								)}
								onAddMarginSeparatelyChange={
									handleAddMarginSeparatelyChange
								}
							/>
						)}

						{showPolicy ? (
							<>
								<Separator />
								<div className="grid w-full grid-cols-2 gap-4">
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
								</div>
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

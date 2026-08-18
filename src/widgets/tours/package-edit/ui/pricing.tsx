import { Loader } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
	Button,
	Checkbox,
	CustomField,
	CustomInputSelect,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Label,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_PACKAGE_FIELD,
	ENUM_PACKAGE_PRICING_TYPE,
	type TPackageEditSchema
} from "@/entities/tour";

import {
	PACKAGE_MARKUP_FIELD,
	PACKAGE_PRICING_TABS_LIST,
	createEmptyPackageMarkup
} from "../model";

interface IPackagePricingProps {
	form: UseFormReturn<TPackageEditSchema>;
	onSubmit: () => void | Promise<void>;
	isLoading: boolean;
	backToEventHref?: string;
}

const PackagePricingBase: FC<IPackagePricingProps> = ({
	form,
	onSubmit,
	isLoading,
	backToEventHref
}) => {
	const { t } = useTranslation("tour_package_edit_page");
	const pricingType = useWatch({
		control: form.control,
		name: ENUM_PACKAGE_FIELD.PRICING_TYPE
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: ENUM_PACKAGE_FIELD.ADD_MARGIN_SEPARATELY
	});

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(ENUM_PACKAGE_FIELD.ADD_MARGIN_SEPARATELY, checked);
		form.setValue(
			ENUM_PACKAGE_FIELD.MARKUP,
			checked ? createEmptyPackageMarkup() : null
		);
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.pricing.title")}</h2>
			<div className="grid gap-5">
				<div className="grid gap-1">
					<h3 className="text-lg">
						{t("form.pricing.pricing_type.title")}
					</h3>
					<CustomOptionTabs
						value={
							pricingType ?? ENUM_PACKAGE_PRICING_TYPE.FLAT_RATE
						}
						onValueChange={(val) =>
							form.setValue(
								ENUM_PACKAGE_FIELD.PRICING_TYPE,
								val as typeof ENUM_PACKAGE_PRICING_TYPE.FLAT_RATE
							)
						}
					>
						<CustomOptionTabsList className="grid grid-cols-2 w-70">
							{PACKAGE_PRICING_TABS_LIST.map(
								({ type, label }) => (
									<CustomOptionTabsTrigger
										key={type}
										value={type}
										variant={"outline"}
									>
										{t(label)}
									</CustomOptionTabsTrigger>
								)
							)}
						</CustomOptionTabsList>
						{PACKAGE_PRICING_TABS_LIST.map(
							({ type, priceDetailsList }) => (
								<CustomOptionTabsContent
									key={type}
									value={type}
								>
									<div className="grid gap-4 mb-8">
										<div className="flex flex-wrap items-center justify-between gap-4">
											<h3 className="text-lg">
												{t(
													"form.pricing.form.pricing_details.title"
												)}
											</h3>
											<div className="flex items-center gap-2">
												<Checkbox
													id={`package-add-margin-${type}`}
													checked={Boolean(
														addMarginSeparately
													)}
													onCheckedChange={(
														checked
													) =>
														handleAddMarginSeparatelyChange(
															Boolean(checked)
														)
													}
												/>
												<Label
													htmlFor={`package-add-margin-${type}`}
												>
													{t(
														"form.pricing.form.pricing_details.checkboxes.add_margin_separately"
													)}
												</Label>
											</div>
										</div>
										<div
											className={
												addMarginSeparately
													? "grid grid-cols-[1fr_1fr_1.5fr_0.5fr] gap-5"
													: "grid grid-cols-3 gap-5"
											}
										>
											{priceDetailsList.map(
												(
													{ key, ...item },
													fieldIndex
												) => (
													<>
														{addMarginSeparately &&
														fieldIndex ===
															priceDetailsList.length -
																1 ? (
															<CustomInputSelect
																key={`${key}-markup`}
																control={
																	form.control
																}
																name={
																	PACKAGE_MARKUP_FIELD.key
																}
																label={
																	PACKAGE_MARKUP_FIELD.label
																}
																placeholder={
																	PACKAGE_MARKUP_FIELD.placeholder
																}
																selectOptions={[
																	...PACKAGE_MARKUP_FIELD.selectOptions
																]}
																t={t}
															/>
														) : null}
														<CustomField
															key={key}
															name={key}
															control={
																form.control
															}
															t={t}
															{...item}
														/>
													</>
												)
											)}
										</div>
									</div>
								</CustomOptionTabsContent>
							)
						)}
					</CustomOptionTabs>
				</div>
				<div className="grid gap-1">
					<h3 className="text-lg">
						{t("form.pricing.form.booking_details.title")}
					</h3>
					<CustomField
						control={form.control}
						name={ENUM_PACKAGE_FIELD.SUPPLIER_ID}
						label="form.pricing.form.booking_details.fields.supplier.label"
						placeholder="form.pricing.form.booking_details.fields.supplier.placeholder"
						t={t}
					/>
				</div>
				<div
					className={
						backToEventHref
							? "flex justify-between"
							: "flex justify-end"
					}
				>
					{backToEventHref ? (
						<Button variant="outline" asChild>
							<Link to={backToEventHref}>
								{t("form.buttons.back_to_event")}
							</Link>
						</Button>
					) : null}
					<Button
						type="button"
						onClick={onSubmit}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.buttons.saving")
							: t("form.buttons.save")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const PackagePricing = withErrorBoundary(PackagePricingBase);

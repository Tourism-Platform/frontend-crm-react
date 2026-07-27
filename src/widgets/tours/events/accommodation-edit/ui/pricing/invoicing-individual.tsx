import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
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
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_TYPE
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PRICING_INDIVIDUAL_TABS_LIST,
	PRICING_MARKUP_FIELD,
	createEmptyPricingMarkup
} from "../../model";

import { PerRoomDetails } from "./per-room-details";

const InvoicingIndividualBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP}`,
			checked ? createEmptyPricingMarkup() : null
		);
	};

	return (
		<div className="grid gap-5">
			<div className="grid gap-1">
				<h3 className="text-lg">
					{t("form.pricing.pricing_type.title")}
				</h3>
				<CustomOptionTabs
					value={
						pricingType ?? ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE
					}
					onValueChange={(val) =>
						form.setValue(
							`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE}`,
							val as typeof ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE
						)
					}
				>
					<CustomOptionTabsList className="grid grid-cols-3 w-fit">
						{PRICING_INDIVIDUAL_TABS_LIST.map((tab) => (
							<CustomOptionTabsTrigger
								key={tab.type}
								value={tab.type}
								variant={"outline"}
							>
								{t(tab.label)}
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
					{PRICING_INDIVIDUAL_TABS_LIST.map((tab) => (
						<CustomOptionTabsContent
							key={tab.type}
							value={tab.type}
						>
							{tab.priceDetailsList ? (
								<div className="grid gap-4 mb-8">
									<div className="flex flex-wrap items-center justify-between gap-4">
										<h3 className="text-lg">
											{t(
												"form.pricing.form.pricing_details.title"
											)}
										</h3>
										<div className="flex items-center gap-2">
											<Checkbox
												id={`add-margin-separately-${tab.type}`}
												checked={Boolean(
													addMarginSeparately
												)}
												onCheckedChange={(checked) =>
													handleAddMarginSeparatelyChange(
														Boolean(checked)
													)
												}
											/>
											<Label
												htmlFor={`add-margin-separately-${tab.type}`}
											>
												{t(
													"form.pricing.form.per_room.checkboxes.add_margin_separately"
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
										{tab.priceDetailsList.map(
											({ key, ...item }, fieldIndex) => (
												<>
													{addMarginSeparately &&
													fieldIndex ===
														tab.priceDetailsList!
															.length -
															1 ? (
														<CustomInputSelect
															key={`${key}-markup`}
															control={
																form.control
															}
															name={`${ENUM_FORM_SECTION.PRICING}.${PRICING_MARKUP_FIELD.key}`}
															label={
																PRICING_MARKUP_FIELD.label
															}
															placeholder={
																PRICING_MARKUP_FIELD.placeholder
															}
															selectOptions={[
																...PRICING_MARKUP_FIELD.selectOptions
															]}
															t={t}
														/>
													) : null}
													<CustomField
														key={key}
														name={`${ENUM_FORM_SECTION.PRICING}.${key}`}
														control={form.control}
														t={t}
														{...item}
													/>
												</>
											)
										)}
									</div>
								</div>
							) : (
								<div className="mb-8">
									<PerRoomDetails form={form} />
								</div>
							)}
						</CustomOptionTabsContent>
					))}
				</CustomOptionTabs>
			</div>
		</div>
	);
};

export const InvoicingIndividual = withErrorBoundary(InvoicingIndividualBase);

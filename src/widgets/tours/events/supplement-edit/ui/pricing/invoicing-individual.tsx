import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomField,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_SUPPLEMENT_PRICING_FIELD,
	ENUM_SUPPLEMENT_PRICING_TYPE
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PRICING_INDIVIDUAL_TABS_LIST
} from "../../model";

import { PerItemDetails } from "./per-item-details";

const InvoicingIndividualBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("supplement_edit_page");
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE}`
	});

	return (
		<div className="grid gap-5">
			<div className="grid gap-1">
				<h3 className="text-lg">
					{t("form.pricing.pricing_type.title")}
				</h3>
				<CustomOptionTabs
					value={
						pricingType ?? ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE
					}
					onValueChange={(val) =>
						form.setValue(
							`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE}`,
							val as typeof ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE
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
								<div className="grid gap-1 mb-8">
									<h3 className="text-lg">
										{t(
											"form.pricing.form.pricing_details.title"
										)}
									</h3>
									<div className="grid grid-cols-3 gap-5">
										{tab.priceDetailsList.map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													name={`${ENUM_FORM_SECTION.PRICING}.${key}`}
													control={form.control}
													t={t}
													{...item}
												/>
											)
										)}
									</div>
								</div>
							) : (
								<div className="mb-8">
									<PerItemDetails form={form} />
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

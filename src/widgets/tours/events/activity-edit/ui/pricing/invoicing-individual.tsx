import { type FC } from "react";
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
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_TYPE
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PRICING_INDIVIDUAL_TABS_LIST,
	PRICING_PRICE_DETAILS_LIST
} from "../../model";

// import { BookingDetails } from "./booking-details";

const InvoicingIndividualBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("activity_edit_page");

	return (
		<div className="grid gap-5">
			<div className="grid gap-1">
				<h3 className="text-lg">
					{t("form.pricing.pricing_type.title")}
				</h3>
				<CustomOptionTabs
					defaultValue={
						form.getValues(
							`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACTIVITY_PRICING_FIELD.PRICING_TYPE}`
						) ?? ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE
					}
					onValueChange={(val) =>
						form.setValue(
							`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACTIVITY_PRICING_FIELD.PRICING_TYPE}`,
							val as typeof ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE
						)
					}
				>
					<CustomOptionTabsList className="grid grid-cols-2 w-70">
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
							<div className="grid gap-1 mb-8">
								<h3 className="text-lg">
									{t(
										"form.pricing.form.pricing_details.title"
									)}
								</h3>
								<div className="grid grid-cols-3 gap-5">
									{PRICING_PRICE_DETAILS_LIST(tab.type).map(
										({ key, ...item }) => (
											<CustomField
												key={key}
												name={`${ENUM_FORM_SECTION.PRICING}.${key}`}
												control={form?.control}
												t={t}
												{...item}
											/>
										)
									)}
								</div>
							</div>
						</CustomOptionTabsContent>
					))}
				</CustomOptionTabs>
			</div>
			{/* <Separator className="mb-12" />
			<BookingDetails form={form} className="mb-12" /> */}
		</div>
	);
};

export const InvoicingIndividual = withErrorBoundary(InvoicingIndividualBase);

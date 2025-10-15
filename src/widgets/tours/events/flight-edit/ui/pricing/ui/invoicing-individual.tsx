import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomField,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import {
	PRICE_DETAILS_DATA_LIST,
	PRICING_INDIVIDUAL_TABS_LIST,
	type TPricingSchema
} from "../model";

export interface IInvoicingIndividualProps {
	form: UseFormReturn<TPricingSchema>;
}

export const InvoicingIndividual: FC<IInvoicingIndividualProps> = ({
	form
}) => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className="grid gap-5">
			<div className="grid gap-1">
				<h3 className="text-lg">{t("pricing.pricing_type.title")}</h3>
				<CustomOptionTabs
					defaultValue={PRICING_INDIVIDUAL_TABS_LIST[0].type}
					// value={activeTab}
					// onValueChange={(val) =>
					// 	setActiveTab(val as ENUM_TOUR_STATUS_TYPE)
					// }
				>
					<CustomOptionTabsList className="grid grid-cols-2 w-70">
						{PRICING_INDIVIDUAL_TABS_LIST.map((tab) => (
							<CustomOptionTabsTrigger
								key={tab.type}
								value={tab.type}
								variant={"outline"}
							>
								{t(tab?.label)}
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
				</CustomOptionTabs>
			</div>
			<div className="grid gap-1">
				<h3 className="text-lg">
					{t("pricing.form.pricing_details.title")}
				</h3>
				<div className="grid grid-cols-3 gap-5">
					{PRICE_DETAILS_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
			</div>
			<Separator />
		</div>
	);
};

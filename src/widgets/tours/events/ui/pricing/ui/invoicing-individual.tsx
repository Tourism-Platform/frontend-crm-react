import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import { PRICING_INDIVIDUAL_TABS_LIST, type TPricingSchema } from "../model";

import { BookingDetails } from "./booking-details";
import { CommissionDetails } from "./commission-details";
import { PricingDetails } from "./pricing-details";

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
			<div>
				<PricingDetails form={form} className="mb-8" />
				<Separator className="mb-12" />
				<BookingDetails form={form} className="mb-12" />
				<Separator className="mb-12" />
				<CommissionDetails form={form} />
			</div>
		</div>
	);
};

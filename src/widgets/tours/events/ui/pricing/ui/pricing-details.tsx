import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { CustomField } from "@/shared/ui";

import { PRICE_DETAILS_DATA_LIST, type TPricingSchema } from "../model";

interface IPricingDetailsProps {
	form: UseFormReturn<TPricingSchema>;
	className?: string;
}

export const PricingDetails: FC<IPricingDetailsProps> = ({
	form,
	className
}) => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className={cn("grid gap-1 mb-8", className)}>
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
	);
};

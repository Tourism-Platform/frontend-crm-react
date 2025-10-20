import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { CustomField } from "@/shared/ui";

import { COMMISSION_DETAILS_DATA_LIST, type TPricingSchema } from "../model";

interface ICommissionDetailsProps {
	form: UseFormReturn<TPricingSchema>;
	className?: string;
}

export const CommissionDetails: FC<ICommissionDetailsProps> = ({
	form,
	className
}) => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className={cn("grid gap-6", className)}>
			<div className="grid">
				<h3 className="text-lg">
					{t("pricing.form.commissions.title")}
				</h3>
				<p className="text-sm text-muted-foreground">
					{t("pricing.form.commissions.description")}
				</p>
			</div>
			<div className="grid grid-cols-3 gap-5">
				{COMMISSION_DETAILS_DATA_LIST.map(({ key, ...item }) => (
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

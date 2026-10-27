import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, CustomField, Form } from "@/shared/ui";

import { type IPricingBreakdownParams } from "@/entities/tour";

import { PRICING_PARAMS_LIST } from "../model";

interface IPricingReviewParamsProps {
	form: UseFormReturn<IPricingBreakdownParams>;
	onReset: () => void;
}

export const PricingReviewParams: FC<IPricingReviewParamsProps> = ({
	form,
	onReset
}) => {
	const { t } = useTranslation("tour_pricing_review_page");

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<div className="flex flex-wrap items-end gap-4">
						{PRICING_PARAMS_LIST.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form.control}
								name={key}
								t={t}
								className="w-60"
								{...item}
							/>
						))}
						<Button
							type="button"
							variant="outline"
							className="mb-5"
							onClick={onReset}
						>
							{t("params.reset")}
						</Button>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
};

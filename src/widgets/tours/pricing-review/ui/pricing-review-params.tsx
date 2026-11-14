import { RestartIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomField,
	Form,
	LoaderButton
} from "@/shared/ui";

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
		<Card variant="glass">
			<CardContent>
				<Form {...form}>
					<div className="flex flex-wrap items-end gap-4">
						{PRICING_PARAMS_LIST.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form.control}
								name={key}
								t={t}
								className="w-full sm:w-72"
								{...item}
							/>
						))}
						<LoaderButton
							type="button"
							variant="glass"
							className="mb-5"
							onClick={onReset}
							icon={<RestartIcon />}
							label={t("params.reset")}
						/>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
};

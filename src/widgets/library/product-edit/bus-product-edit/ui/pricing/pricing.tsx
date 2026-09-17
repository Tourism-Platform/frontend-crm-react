import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { InvoicingIndividual } from "./invoicing-individual";

const PricingBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	disabled
}) => {
	const { t } = useTranslation("bus_product_edit_page");

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.pricing.title")}</h2>
			<InvoicingIndividual
				form={form}
				onSubmit={onSubmit}
				isLoading={isLoading}
			/>
			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.pricing.buttons.save")}
					loadingLabel={t("form.pricing.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);

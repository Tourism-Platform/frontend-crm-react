import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { CarsDetails } from "./cars-details";

const CarsInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	disabled,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("transfer_product_edit_page");

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-12">
			<CarsDetails
				form={form}
				supplierId={supplierId}
				productId={productId}
				product={product}
			/>

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.cars.buttons.save")}
					loadingLabel={t("form.cars.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const CarsInfo = withErrorBoundary(CarsInfoBase);

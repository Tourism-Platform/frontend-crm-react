import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { VehiclesDetails } from "./vehicles-details";

const VehiclesInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	disabled,
	supplierId,
	productId,
	product
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
		<div className="grid gap-12">
			<VehiclesDetails
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
					label={t("form.vehicles.buttons.save")}
					loadingLabel={t("form.vehicles.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const VehiclesInfo = withErrorBoundary(VehiclesInfoBase);

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { RoomsDetails } from "./rooms-details";

const RoomsInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	disabled,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("hotel_product_edit_page");

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-12">
			<RoomsDetails
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
					label={t("form.rooms.buttons.save")}
					loadingLabel={t("form.rooms.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const RoomsInfo = withErrorBoundary(RoomsInfoBase);

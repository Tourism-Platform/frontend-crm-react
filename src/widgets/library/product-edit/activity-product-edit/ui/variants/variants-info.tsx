import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { VariantsDetails } from "./variants-details";

const VariantsInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	disabled,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("activity_product_edit_page");

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-12">
			<VariantsDetails
				form={form}
				supplierId={supplierId}
				productId={productId}
			/>

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.variants.buttons.save")}
					loadingLabel={t("form.variants.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const VariantsInfo = withErrorBoundary(VariantsInfoBase);

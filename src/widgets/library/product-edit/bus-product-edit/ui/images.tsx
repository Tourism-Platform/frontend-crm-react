import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	CustomUploadImages,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import { useBusProductImages } from "../model";

interface IBusProductImagesProps {
	supplierId: string;
	productId: string;
	disabled?: boolean;
}

const BusProductImagesBase: FC<IBusProductImagesProps> = ({
	supplierId,
	productId,
	disabled = false
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const { productUpload } = useBusProductImages({
		supplierId,
		productId,
		disabled
	});

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	return (
		<div className="grid gap-6">
			<h3 className="text-base font-medium">
				{t("form.images.product_title")}
			</h3>
			<CustomUploadImages
				items={productUpload.items}
				onAdd={productUpload.handleAdd}
				onRemove={productUpload.handleRemove}
				onReorder={productUpload.handleReorder}
				maxFiles={10}
			/>
			<div className="flex justify-end">
				<LoaderButton
					size="lg"
					type="button"
					onClick={productUpload.handlePhotosSubmit}
					isLoading={productUpload.isLoading}
					label={t("form.images.buttons.save")}
					loadingLabel={t("form.images.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const BusProductImages = withErrorBoundary(BusProductImagesBase);

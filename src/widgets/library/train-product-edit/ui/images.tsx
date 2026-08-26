import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, CustomUploadImages, withErrorBoundary } from "@/shared/ui";

import { useTrainProductImages } from "../model";

interface ITrainProductImagesProps {
	supplierId: string;
	productId: string;
	disabled?: boolean;
}

const TrainProductImagesBase: FC<ITrainProductImagesProps> = ({
	supplierId,
	productId,
	disabled = false
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const { productUpload } = useTrainProductImages({
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
				<Button
					size="lg"
					type="button"
					onClick={productUpload.handlePhotosSubmit}
					disabled={productUpload.isLoading}
				>
					{productUpload.isLoading ? (
						<>
							<Loader className="mr-2 h-4 w-4 animate-spin" />
							{t("form.images.buttons.saving")}
						</>
					) : (
						t("form.images.buttons.save")
					)}
				</Button>
			</div>
		</div>
	);
};

export const TrainProductImages = withErrorBoundary(TrainProductImagesBase);

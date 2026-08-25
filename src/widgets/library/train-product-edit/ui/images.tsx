import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	CustomUploadImages,
	useCustomUploadImages,
	withErrorBoundary
} from "@/shared/ui";

import {
	useDeleteProductImageMutation,
	useListProductImagesQuery,
	useSetPrimaryProductImageMutation,
	useUploadProductImagesMutation
} from "@/entities/supplier";

const EMPTY_IMAGES: { id: string; imagePath: string; isPrimary: boolean }[] =
	[];

interface ITrainProductImagesProps {
	supplierId: string;
	productId: string;
}

const TrainProductImagesBase: FC<ITrainProductImagesProps> = ({
	supplierId,
	productId
}) => {
	const { t } = useTranslation("train_product_edit_page");

	const {
		data: serverImages = EMPTY_IMAGES,
		isLoading: isListLoading,
		isRealError: isError
	} = useOptionalResourceQuery(
		useListProductImagesQuery(
			{ supplierId, productId },
			{ skip: !supplierId || !productId }
		)
	);

	const [uploadProductImages, { isLoading: isUploading }] =
		useUploadProductImagesMutation();
	const [deleteProductImage, { isLoading: isDeleting }] =
		useDeleteProductImageMutation();
	const [setPrimaryProductImage, { isLoading: isSettingPrimary }] =
		useSetPrimaryProductImageMutation();

	const isMutating = isUploading || isDeleting || isSettingPrimary;

	const {
		items,
		isLoading,
		handleAdd,
		handleRemove,
		handleReorder,
		handlePhotosSubmit
	} = useCustomUploadImages({
		images: serverImages,
		isServerLoading: isListLoading || isMutating,
		addImages: (files) =>
			uploadProductImages({ supplierId, productId, files }).unwrap(),
		removeImage: (imageId) =>
			deleteProductImage({ supplierId, productId, imageId }).unwrap(),
		setPrimaryImage: (imageId) =>
			setPrimaryProductImage({
				supplierId,
				productId,
				imageId
			}).unwrap(),
		onSuccess: () => toast.success(t("form.toasts.save.success")),
		onError: () => toast.error(t("form.toasts.save.error"))
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-6">
			<h3 className="text-base font-medium">
				{t("form.images.product_title")}
			</h3>
			<CustomUploadImages
				items={items}
				onAdd={handleAdd}
				onRemove={handleRemove}
				onReorder={handleReorder}
				maxFiles={10}
			/>
			<div className="flex justify-end">
				<Button
					size="lg"
					type="button"
					onClick={handlePhotosSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
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

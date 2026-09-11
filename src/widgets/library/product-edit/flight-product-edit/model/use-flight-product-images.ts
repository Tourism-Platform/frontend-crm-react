import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { useCustomUploadImages } from "@/shared/ui";

import {
	useDeleteProductImageMutation,
	useListProductImagesQuery,
	useSetPrimaryProductImageMutation,
	useUploadProductImagesMutation
} from "@/entities/supplier";

const EMPTY_IMAGES: { id: string; imagePath: string; isPrimary: boolean }[] =
	[];

export interface IUseFlightProductImagesParams {
	supplierId: string;
	productId: string;
	disabled?: boolean;
}

export const useFlightProductImages = ({
	supplierId,
	productId,
	disabled = false
}: IUseFlightProductImagesParams) => {
	const { t } = useTranslation("flight_product_edit_page");

	const {
		data: serverImages = EMPTY_IMAGES,
		isLoading: isListLoading,
		isRealError: isError
	} = useOptionalResourceQuery(
		useListProductImagesQuery(
			{ supplierId, productId },
			{ skip: disabled || !supplierId || !productId }
		)
	);

	const [uploadProductImages, { isLoading: isUploading }] =
		useUploadProductImagesMutation();
	const [deleteProductImage, { isLoading: isDeleting }] =
		useDeleteProductImageMutation();
	const [setPrimaryProductImage, { isLoading: isSettingPrimary }] =
		useSetPrimaryProductImageMutation();

	const isMutating = isUploading || isDeleting || isSettingPrimary;

	const productUpload = useCustomUploadImages({
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

	return { productUpload };
};

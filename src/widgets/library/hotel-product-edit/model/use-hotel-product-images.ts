import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { useCustomUploadImages } from "@/shared/ui";

import {
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	type IHotelVariant,
	type ISupplierNodeImage,
	useDeleteNodeImageMutation,
	useDeleteProductImageMutation,
	useListProductImagesQuery,
	useSetPrimaryNodeImageMutation,
	useSetPrimaryProductImageMutation,
	useUploadNodeImagesMutation,
	useUploadProductImagesMutation
} from "@/entities/supplier";

const EMPTY_PRODUCT_IMAGES: {
	id: string;
	imagePath: string;
	isPrimary: boolean;
}[] = [];

export interface IUseHotelProductImagesParams {
	supplierId: string;
	productId: string;
	variants?: IHotelVariant[];
	disabled?: boolean;
}

export interface IHotelProductImageRoomOption {
	variantId: string;
	variantName: string;
	roomId: string;
	roomTyp: ENUM_HOTEL_ROOM_TYPE_TYPE | null;
	images: ISupplierNodeImage[];
}

export const useHotelProductImages = ({
	supplierId,
	productId,
	variants = [],
	disabled = false
}: IUseHotelProductImagesParams) => {
	const { t } = useTranslation("hotel_product_edit_page");

	const roomsWithId = useMemo(
		(): IHotelProductImageRoomOption[] =>
			variants.flatMap((variant) =>
				variant.rooms
					.filter((room) => room.id)
					.map((room) => ({
						variantId: variant.id,
						variantName: variant.name,
						roomId: room.id as string,
						roomTyp: room.typ,
						images: room.images ?? []
					}))
			),
		[variants]
	);

	const [selectedRoomKey, setSelectedRoomKey] = useState<string>("");

	useEffect(() => {
		if (!roomsWithId.length) {
			setSelectedRoomKey("");
			return;
		}
		const exists = roomsWithId.some(
			(room) => `${room.variantId}:${room.roomId}` === selectedRoomKey
		);
		if (!exists) {
			setSelectedRoomKey(
				`${roomsWithId[0].variantId}:${roomsWithId[0].roomId}`
			);
		}
	}, [roomsWithId, selectedRoomKey]);

	const selectedRoom = roomsWithId.find(
		(room) => `${room.variantId}:${room.roomId}` === selectedRoomKey
	);

	const {
		data: serverImages = EMPTY_PRODUCT_IMAGES,
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

	const [uploadNodeImages, { isLoading: isUploadingNode }] =
		useUploadNodeImagesMutation();
	const [deleteNodeImage, { isLoading: isDeletingNode }] =
		useDeleteNodeImageMutation();
	const [setPrimaryNodeImage, { isLoading: isSettingPrimaryNode }] =
		useSetPrimaryNodeImageMutation();

	const isMutating = isUploading || isDeleting || isSettingPrimary;
	const isNodeMutating =
		isUploadingNode || isDeletingNode || isSettingPrimaryNode;

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

	const nodeImages: ISupplierNodeImage[] = selectedRoom?.images ?? [];

	const nodeUpload = useCustomUploadImages({
		images: nodeImages,
		isServerLoading: isNodeMutating,
		addImages: async (files) => {
			if (!selectedRoom) return [];
			return uploadNodeImages({
				supplierId,
				productId,
				variantId: selectedRoom.variantId,
				nodeId: selectedRoom.roomId,
				files
			}).unwrap();
		},
		removeImage: async (imageId) => {
			if (!selectedRoom) return;
			await deleteNodeImage({
				supplierId,
				productId,
				variantId: selectedRoom.variantId,
				nodeId: selectedRoom.roomId,
				imageId
			}).unwrap();
		},
		setPrimaryImage: async (imageId) => {
			if (!selectedRoom) return;
			await setPrimaryNodeImage({
				supplierId,
				productId,
				variantId: selectedRoom.variantId,
				nodeId: selectedRoom.roomId,
				imageId
			}).unwrap();
		},
		onSuccess: () => toast.success(t("form.toasts.save.success")),
		onError: () => toast.error(t("form.toasts.save.error"))
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isError, t]);

	return {
		productUpload,
		nodeUpload,
		roomsWithId,
		selectedRoomKey,
		setSelectedRoomKey
	};
};

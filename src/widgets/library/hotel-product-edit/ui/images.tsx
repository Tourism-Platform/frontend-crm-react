import { Loader } from "lucide-react";
import { type FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	CustomUploadImages,
	SelectPicker,
	useCustomUploadImages,
	withErrorBoundary
} from "@/shared/ui";

import {
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

interface IHotelProductImagesProps {
	supplierId: string;
	productId: string;
	variants?: IHotelVariant[];
}

const HotelProductImagesBase: FC<IHotelProductImagesProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("hotel_product_edit_page");

	const roomsWithId = useMemo(
		() =>
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
			{ skip: !supplierId || !productId }
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

	return (
		<div className="grid gap-8">
			<div className="grid gap-4">
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

			{roomsWithId.length ? (
				<div className="grid gap-4">
					<h3 className="text-base font-medium">
						{t("form.images.node_title")}
					</h3>
					<SelectPicker
						options={roomsWithId.map((room) => ({
							value: `${room.variantId}:${room.roomId}`,
							label: `${room.variantName} · ${room.roomTyp ?? room.roomId}`
						}))}
						value={selectedRoomKey}
						onChange={setSelectedRoomKey}
						placeholder={t("form.images.select_room")}
					/>
					<CustomUploadImages
						items={nodeUpload.items}
						onAdd={nodeUpload.handleAdd}
						onRemove={nodeUpload.handleRemove}
						onReorder={nodeUpload.handleReorder}
						maxFiles={5}
					/>
					<div className="flex justify-end">
						<Button
							size="lg"
							type="button"
							onClick={nodeUpload.handlePhotosSubmit}
							disabled={nodeUpload.isLoading}
						>
							{nodeUpload.isLoading ? (
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
			) : null}
		</div>
	);
};

export const HotelProductImages = withErrorBoundary(HotelProductImagesBase);

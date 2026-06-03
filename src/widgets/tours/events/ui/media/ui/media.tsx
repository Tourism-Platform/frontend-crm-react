import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";

import type { TResources } from "@/shared/config";
import {
	Button,
	CustomUploadImages,
	useCustomUploadImages,
	withErrorBoundary
} from "@/shared/ui";

import {
	useDeleteEventImageMutation,
	useListEventImagesQuery,
	useUpdateEventImageMutation,
	useUploadEventImagesMutation
} from "@/entities/tour";

export interface IMediaProps {
	ns?: keyof TResources;
}

const MediaBase: FC<IMediaProps> = ({ ns = "flight_edit_page" }) => {
	const { t } = useTranslation(ns);
	const { tourId = "", eventId = "" } = useParams<{
		tourId: string;
		eventId: string;
	}>();

	const {
		data: serverImages = [],
		isLoading: isListLoading,
		isError
	} = useListEventImagesQuery(
		{ tourId, eventId },
		{ skip: !tourId || !eventId }
	);

	const [uploadImagesMutation, { isLoading: isUploading }] =
		useUploadEventImagesMutation();
	const [deleteImageMutation, { isLoading: isDeleting }] =
		useDeleteEventImageMutation();
	const [setPrimaryImageMutation, { isLoading: isSettingPrimary }] =
		useUpdateEventImageMutation();

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
			uploadImagesMutation({ tourId, eventId, files }).unwrap(),
		removeImage: (imageId) =>
			deleteImageMutation({ tourId, eventId, imageId }).unwrap(),
		setPrimaryImage: (imageId) =>
			setPrimaryImageMutation({ tourId, eventId, imageId }).unwrap(),
		onSuccess: () => toast.success(t("form.toasts.save.success")),
		onError: () => toast.error(t("form.toasts.save.error"))
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-6">
			{/* <h2 className="text-xl">{t("media.title")}</h2> */}
			<CustomUploadImages
				items={items}
				onAdd={handleAdd}
				onRemove={handleRemove}
				onReorder={handleReorder}
				maxFiles={5}
			/>
			<div className="flex justify-end mt-6">
				<Button
					size="lg"
					type="button"
					onClick={handlePhotosSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader className="mr-2 h-4 w-4 animate-spin" />
							{t("form.media.buttons.saving")}
						</>
					) : (
						t("form.media.buttons.save")
					)}
				</Button>
			</div>
		</div>
	);
};

export const Media = withErrorBoundary(MediaBase);

import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TResources } from "@/shared/config";
import {
	CustomUploadImages,
	LoaderButton,
	useCustomUploadImages,
	withErrorBoundary
} from "@/shared/ui";

import { useEventMedia } from "./use-event-media";

export interface IMediaProps {
	ns?: keyof TResources;
}

const MediaBase: FC<IMediaProps> = ({ ns = "flight_edit_page" }) => {
	const { t } = useTranslation(ns);
	const {
		serverImages,
		isListLoading,
		isError,
		isMutating,
		addImages,
		removeImage,
		setPrimaryImage
	} = useEventMedia();

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
		addImages,
		removeImage,
		setPrimaryImage,
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
			<CustomUploadImages
				items={items}
				onAdd={handleAdd}
				onRemove={handleRemove}
				onReorder={handleReorder}
				maxFiles={5}
			/>
			<div className="flex justify-end mt-6">
				<LoaderButton
					size="lg"
					type="button"
					onClick={handlePhotosSubmit}
					isLoading={isLoading}
					label={t("form.media.buttons.save")}
					loadingLabel={t("form.media.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const Media = withErrorBoundary(MediaBase);

import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TResources } from "@/shared/config";
import {
	CustomUploadImages,
	useAutosaveToast,
	useAutosaveUploadImages,
	withErrorBoundary
} from "@/shared/ui";

import { useEventMedia } from "./use-event-media";

export interface IMediaProps {
	ns?: keyof TResources;
}

/** Event photos, saved on every action (no submit button). */
const MediaBase: FC<IMediaProps> = ({ ns = "flight_edit_page" }) => {
	const { t } = useTranslation(ns);
	const { t: tEvents } = useTranslation("common_events");
	const {
		canUpload,
		serverImages,
		isListLoading,
		isError,
		addImages,
		removeImage,
		setPrimaryImage
	} = useEventMedia();

	const { items, status, isBusy, handleAdd, handleRemove, handleReorder } =
		useAutosaveUploadImages({
			images: serverImages,
			isServerLoading: isListLoading,
			addImages,
			removeImage,
			setPrimaryImage,
			enabled: canUpload
		});

	useAutosaveToast(status, t("form.toasts.save.error"));

	useEffect(() => {
		if (isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-6">
			<CustomUploadImages
				items={items}
				isBusy={isBusy}
				disabled={!canUpload}
				onAdd={handleAdd}
				onRemove={handleRemove}
				onReorder={handleReorder}
				maxFiles={5}
			/>
			{!canUpload ? (
				<p className="text-sm text-muted-foreground">
					{tEvents("media.create_first")}
				</p>
			) : null}
		</div>
	);
};

export const Media = withErrorBoundary(MediaBase);

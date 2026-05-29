// use-media-data.hook.ts
import { useEffect, useRef, useState } from "react";

import { type TUploadImageItem, getUploadItemId } from "@/shared/ui";

export interface IUploadResult {
	id: string;
}

interface ICustomUploadImagesParams {
	images?: { id: string; imagePath: string; isPrimary: boolean }[];
	isServerLoading?: boolean;
	addImages: (files: File[]) => Promise<IUploadResult[]>;
	setPrimaryImage: (imageId: string) => Promise<void>;
	removeImage: (imageId: string) => Promise<void>;
	onSuccess?: () => void;
	onError?: (error: unknown) => void;
}

export const useCustomUploadImages = ({
	images,
	isServerLoading = false,
	addImages,
	removeImage,
	setPrimaryImage,
	onSuccess,
	onError
}: ICustomUploadImagesParams) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [items, setItems] = useState<TUploadImageItem[]>([]);
	const toDeleteRef = useRef<string[]>([]);

	useEffect(() => {
		if (!images?.length) {
			setItems([]);
			return;
		}

		const sorted = [...images].sort((a, b) =>
			a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1
		);

		setItems(
			sorted.map((img) => ({
				kind: "uploaded",
				id: img.id,
				src: img.imagePath
			}))
		);
		toDeleteRef.current = [];
	}, [images]);

	const handleAdd = (files: File[]) => {
		const pending: TUploadImageItem[] = files.map((file) => ({
			kind: "pending",
			tempId: `pending-${crypto.randomUUID()}`,
			file,
			preview: URL.createObjectURL(file)
		}));
		setItems((prev) => [...prev, ...pending]);
	};

	const handleRemove = (id: string) => {
		setItems((prev) => {
			const item = prev.find((i) => getUploadItemId(i) === id);
			if (item?.kind === "uploaded") {
				toDeleteRef.current = [...toDeleteRef.current, item.id];
			} else if (item?.kind === "pending") {
				URL.revokeObjectURL(item.preview);
			}
			return prev.filter((i) => getUploadItemId(i) !== id);
		});
	};

	const handleReorder = (reordered: TUploadImageItem[]) => {
		setItems(reordered);
	};

	const handlePhotosSubmit = async () => {
		try {
			setIsSubmitting(true);

			const toDelete = toDeleteRef.current;
			const uploadedItems = items.filter(
				(i): i is Extract<TUploadImageItem, { kind: "uploaded" }> =>
					i.kind === "uploaded"
			);
			const pendingItems = items.filter(
				(i): i is Extract<TUploadImageItem, { kind: "pending" }> =>
					i.kind === "pending"
			);

			const toUpload = pendingItems.map((i) => i.file);
			const primaryId = uploadedItems[0]?.id ?? null;
			const hasDeletes = toDelete.length > 0;
			const hasPending = toUpload.length > 0;

			// Case 1: only deletions
			if (hasDeletes && !hasPending) {
				await Promise.all(toDelete.map((id) => removeImage(id)));

				if (primaryId) {
					const wasPrimaryDeleted = toDelete.some(
						(id) => id === primaryId
					);
					if (!wasPrimaryDeleted) {
						await setPrimaryImage(primaryId);
					}
				}

				onSuccess?.();
				return;
			}

			// Case 2: new files added
			if (hasPending) {
				const idsToDeleteAll = [
					...new Set([...toDelete, ...uploadedItems.map((i) => i.id)])
				];

				await Promise.all(idsToDeleteAll.map((id) => removeImage(id)));

				const filesToUpload = await Promise.all(
					items.map(async (item) => {
						if (item.kind === "pending") return item.file;
						const res = await fetch(item.src);
						const blob = await res.blob();
						const name = item.src.split("/").pop() ?? "image";
						return new File([blob], name, { type: blob.type });
					})
				);

				const newImages = await addImages(filesToUpload);
				const firstId = newImages[0]?.id;
				if (firstId) await setPrimaryImage(firstId);

				onSuccess?.();
				return;
			}

			// Case 3: only reorder / primary change
			if (primaryId) await setPrimaryImage(primaryId);

			onSuccess?.();
		} catch (error) {
			onError?.(error);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		items,
		isLoading: isServerLoading || isSubmitting,
		handleAdd,
		handleRemove,
		handleReorder,
		handlePhotosSubmit
	};
};

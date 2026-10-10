import { useCallback, useEffect, useRef, useState } from "react";

import type { TAutosaveStatus } from "@/shared/lib";
import { type TUploadImageItem, getUploadItemId } from "@/shared/ui";

import { fetchImageAsFile } from "./fetch-image-as-file";
import type { IUploadResult } from "./use-custom-upload";

interface IAutosaveUploadImagesParams {
	images?: { id: string; imagePath: string; isPrimary: boolean }[];
	isServerLoading?: boolean;
	/** `POST` appends to the set (verified on the backend). */
	addImages: (files: File[]) => Promise<IUploadResult[]>;
	setPrimaryImage: (imageId: string) => Promise<void>;
	removeImage: (imageId: string) => Promise<void>;
	/** Off while the owner does not exist yet: nothing is sent. */
	enabled?: boolean;
	reorderDebounceMs?: number;
	onError?: (error: unknown) => void;
}

const DEFAULT_REORDER_DEBOUNCE_MS = 1000;

type TImage = NonNullable<IAutosaveUploadImagesParams["images"]>[number];

/** Server images as grid items, primary first. */
const toItems = (images: TImage[] = []): TUploadImageItem[] =>
	[...images]
		.sort((a, b) =>
			a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1
		)
		.map((image) => ({
			kind: "uploaded",
			id: image.id,
			src: image.imagePath
		}));

const toPending = (files: File[]): TUploadImageItem[] =>
	files.map((file) => ({
		kind: "pending",
		tempId: `pending-${crypto.randomUUID()}`,
		file,
		preview: URL.createObjectURL(file)
	}));

const isSameOrder = (a: TUploadImageItem[], b: TUploadImageItem[]) =>
	a.length === b.length &&
	a.every(
		(item, index) => getUploadItemId(item) === getUploadItemId(b[index])
	);

const revokePreviews = (items: TUploadImageItem[]) =>
	items.forEach((item) => {
		if (item.kind === "pending") URL.revokeObjectURL(item.preview);
	});

/**
 * Event images saved per action, no submit button:
 * - add → `POST` of the new files only; the first image of an empty set is
 *   made primary (the backend never sets it itself);
 * - remove → `DELETE` of that image; a removed primary passes to the next one;
 * - reorder → debounced re-upload in a safe order: the new set is `POST`ed
 *   first and the old images are deleted after, so a failure leaves
 *   duplicates, never a loss (the backend has no order field — order is the
 *   upload order).
 * One operation at a time: the grid is locked (`isBusy`) while it runs.
 */
export const useAutosaveUploadImages = ({
	images,
	isServerLoading = false,
	addImages,
	removeImage,
	setPrimaryImage,
	enabled = true,
	reorderDebounceMs = DEFAULT_REORDER_DEBOUNCE_MS,
	onError
}: IAutosaveUploadImagesParams) => {
	const [items, setItems] = useState<TUploadImageItem[]>(() =>
		toItems(images)
	);
	const [status, setStatus] = useState<TAutosaveStatus>("idle");

	const reorderTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	);
	const pendingOrder = useRef<TUploadImageItem[] | null>(null);
	const latest = useRef({
		images,
		addImages,
		removeImage,
		setPrimaryImage,
		onError
	});
	latest.current = {
		images,
		addImages,
		removeImage,
		setPrimaryImage,
		onError
	};

	const isSaving = status === "saving";

	// Server → grid whenever nothing is in flight or waiting to be sent.
	useEffect(() => {
		if (isSaving || isServerLoading || pendingOrder.current) return;
		setItems((prev) => {
			revokePreviews(prev);
			return toItems(images);
		});
	}, [images, isSaving, isServerLoading]);

	const run = useCallback(async (operation: () => Promise<void>) => {
		setStatus("saving");
		try {
			await operation();
			setStatus("saved");
		} catch (error) {
			// Back to what the server has; the next refetch confirms it.
			setItems(toItems(latest.current.images));
			setStatus("error");
			latest.current.onError?.(error);
		}
	}, []);

	/** Safe order: new set first, old ones after. */
	const reuploadInOrder = useCallback(async (ordered: TUploadImageItem[]) => {
		const {
			addImages: add,
			removeImage: remove,
			setPrimaryImage: setPrimary
		} = latest.current;
		const oldIds = ordered.flatMap((item) =>
			item.kind === "uploaded" ? [item.id] : []
		);
		const files = await Promise.all(
			ordered.map((item) =>
				item.kind === "pending"
					? Promise.resolve(item.file)
					: fetchImageAsFile(item.src)
			)
		);
		const created = await add(files);
		await Promise.all(oldIds.map((id) => remove(id)));
		if (created[0]) await setPrimary(created[0].id);
	}, []);

	const sendPendingOrder = useCallback(() => {
		clearTimeout(reorderTimer.current);
		const ordered = pendingOrder.current;
		pendingOrder.current = null;
		if (!ordered || isSameOrder(ordered, toItems(latest.current.images))) {
			return Promise.resolve();
		}
		return run(() => reuploadInOrder(ordered));
	}, [reuploadInOrder, run]);

	const handleAdd = (files: File[]) => {
		if (!enabled || !files.length) return;
		const hadImages = items.some((item) => item.kind === "uploaded");
		setItems((prev) => [...prev, ...toPending(files)]);

		run(async () => {
			const created = await latest.current.addImages(files);
			if (!hadImages && created[0]) {
				await latest.current.setPrimaryImage(created[0].id);
			}
		});
	};

	const handleRemove = (id: string) => {
		if (!enabled) return;
		const wasPrimary = items[0] && getUploadItemId(items[0]) === id;
		const rest = items.filter((item) => getUploadItemId(item) !== id);
		setItems(rest);

		run(async () => {
			await latest.current.removeImage(id);
			const nextPrimary = rest[0];
			if (wasPrimary && nextPrimary?.kind === "uploaded") {
				await latest.current.setPrimaryImage(nextPrimary.id);
			}
		});
	};

	const handleReorder = (reordered: TUploadImageItem[]) => {
		setItems(reordered);
		if (!enabled) return;
		pendingOrder.current = reordered;
		clearTimeout(reorderTimer.current);
		reorderTimer.current = setTimeout(() => {
			sendPendingOrder();
		}, reorderDebounceMs);
	};

	// Leaving the page with a reorder still waiting: send it, do not drop it.
	useEffect(
		() => () => {
			if (pendingOrder.current) sendPendingOrder();
		},
		[sendPendingOrder]
	);

	return {
		items,
		status,
		isBusy: isSaving || isServerLoading,
		handleAdd,
		handleRemove,
		handleReorder
	};
};

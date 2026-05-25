"use client";

import { type FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import {
	CustomUploadImages,
	type TUploadImageItem,
	getUploadItemId
} from "@/shared/ui";

import { useListLandingImagesQuery } from "@/entities/tour";

// ─── Types ────────────────────────────────────────────────────────────────────

// Pending changes accumulated locally — consumed by Landing on submit
export interface IPhotosChanges {
	// Uploaded image ids to delete on save
	toDelete: string[];
	// New files to upload (in final order)
	toUpload: File[];
	// Full final order of items (uploaded ids + pending tempIds in order)
	// Used to re-upload all in correct order when needed
	orderedItems: TUploadImageItem[];
	// Id of the primary image (first uploaded item after save, if any)
	// null if first item is pending (will be set after upload resolves)
	primaryId: string | null;
}

interface IPhotosInfoProps {
	tourId: string;
	// Called on every local change so Landing can collect changes for submit
	onChanges: (changes: IPhotosChanges) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PhotosInfoBase: FC<IPhotosInfoProps> = ({ tourId, onChanges }) => {
	const { t } = useTranslation("landing_page");

	const { data: serverImages = [] } = useListLandingImagesQuery(tourId, {
		skip: !tourId
	});

	const [items, setItems] = useState<TUploadImageItem[]>([]);
	const toDeleteRef = useRef<string[]>([]);

	// ── Sync server → local ───────────────────────────────────────────────────

	useEffect(() => {
		if (!serverImages.length) {
			setItems([]);
			return;
		}

		const sorted = [...serverImages].sort((a, b) =>
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
	}, [serverImages]);

	// ── Notify parent of current diff ─────────────────────────────────────────

	const notifyChanges = (
		nextItems: TUploadImageItem[],
		toDelete: string[]
	) => {
		const pendingItems = nextItems.filter(
			(i): i is Extract<TUploadImageItem, { kind: "pending" }> =>
				i.kind === "pending"
		);
		const firstUploaded = nextItems.find(
			(i): i is Extract<TUploadImageItem, { kind: "uploaded" }> =>
				i.kind === "uploaded"
		);

		onChanges({
			toDelete,
			toUpload: pendingItems.map((i) => i.file),
			orderedItems: nextItems,
			// If first item is uploaded — we know the primaryId now
			// If first item is pending — primaryId is resolved after upload
			primaryId: firstUploaded?.id ?? null
		});
	};

	// ── Handlers ──────────────────────────────────────────────────────────────

	const handleAdd = (files: File[]) => {
		const pending: TUploadImageItem[] = files.map((file) => ({
			kind: "pending",
			tempId: `pending-${crypto.randomUUID()}`,
			file,
			preview: URL.createObjectURL(file)
		}));

		setItems((prev) => {
			const next = [...prev, ...pending];
			notifyChanges(next, toDeleteRef.current);
			return next;
		});
	};

	const handleRemove = (id: string) => {
		setItems((prev) => {
			const item = prev.find((i) => getUploadItemId(i) === id);

			if (item?.kind === "uploaded") {
				toDeleteRef.current = [...toDeleteRef.current, item.id];
			} else if (item?.kind === "pending") {
				URL.revokeObjectURL(item.preview);
			}

			const next = prev.filter((i) => getUploadItemId(i) !== id);
			notifyChanges(next, toDeleteRef.current);
			return next;
		});
	};

	const handleReorder = (reordered: TUploadImageItem[]) => {
		setItems(reordered);
		notifyChanges(reordered, toDeleteRef.current);
	};

	// ─────────────────────────────────────────────────────────────────────────

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg">{t("form.photos.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("form.photos.description")}
			</p>

			<CustomUploadImages
				items={items}
				onAdd={handleAdd}
				onRemove={handleRemove}
				onReorder={handleReorder}
			/>
		</div>
	);
};

export const PhotosInfo = withErrorBoundary(PhotosInfoBase);

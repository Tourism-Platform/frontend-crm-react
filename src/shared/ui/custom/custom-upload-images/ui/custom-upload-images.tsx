"use client";

import {
	DndContext,
	type DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Star, Trash2, Upload, ZoomInIcon } from "lucide-react";
import { type FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { formatBytes } from "@/shared/utils";

import {
	UPLOAD_IMAGES_GRID_HEIGHT,
	getUploadImagesLayout
} from "../model/upload-images-layout";

import { UploadImagesLightbox } from "./previewer-upload-images";

// ─── Public Types ─────────────────────────────────────────────────────────────

export type TUploadImageItem =
	| { kind: "uploaded"; id: string; src: string }
	| { kind: "pending"; tempId: string; file: File; preview: string };

export const getUploadItemId = (item: TUploadImageItem): string =>
	item.kind === "uploaded" ? item.id : item.tempId;

// ─── Sortable Card ────────────────────────────────────────────────────────────

interface ISortableCardProps {
	item: TUploadImageItem;
	isPrimary: boolean;
	gridArea?: string;
	onRemove: (id: string) => void;
	onPreview: (src: string) => void;
}

const SortableCard: FC<ISortableCardProps> = ({
	item,
	isPrimary,
	gridArea,
	onRemove,
	onPreview
}) => {
	const id = getUploadItemId(item);
	const src = item.kind === "uploaded" ? item.src : item.preview;
	const name =
		item.kind === "uploaded"
			? (item.src.split("/").pop() ?? "")
			: item.file.name;
	const size = item.kind === "pending" ? item.file.size : null;

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
		cursor: isDragging ? "grabbing" : "grab",
		zIndex: isDragging ? 10 : undefined,
		gridArea
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"group relative rounded-lg overflow-hidden",
				!gridArea && "h-[200px]"
			)}
		>
			{isPrimary && (
				<div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-semibold text-yellow-900">
					<Star className="h-2.5 w-2.5 fill-yellow-900" />
					Primary
				</div>
			)}

			{item.kind === "pending" && (
				<div className="absolute right-2 top-2 z-10 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white">
					New
				</div>
			)}

			<img
				src={src}
				alt={name}
				className={cn(
					"h-full w-full rounded-lg border object-cover transition-transform group-hover:scale-105",
					isPrimary && "ring-2 ring-yellow-400"
				)}
				draggable={false}
			/>

			<div className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
				<Button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onPreview(src);
					}}
					variant="secondary"
					size="icon"
					className="size-7"
				>
					<ZoomInIcon className="h-3.5 w-3.5" />
				</Button>

				<Button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onRemove(id);
					}}
					variant="secondary"
					size="icon"
					className="size-7"
				>
					<Trash2 className="h-3.5 w-3.5" />
				</Button>
			</div>

			<div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
				<p className="truncate text-xs font-medium">{name}</p>
				{size !== null && (
					<p className="text-xs text-gray-300">{formatBytes(size)}</p>
				)}
			</div>
		</div>
	);
};

// ─── CustomUploadImages ───────────────────────────────────────────────────────

interface ICustomUploadImagesProps {
	items?: TUploadImageItem[];
	maxFiles?: number;
	accept?: string;
	className?: string;
	onAdd?: (files: File[]) => void;
	onRemove?: (id: string) => void;
	onReorder?: (items: TUploadImageItem[]) => void;
}

export const CustomUploadImages: FC<ICustomUploadImagesProps> = ({
	items = [],
	maxFiles = 10,
	accept = "image/*",
	className,
	onAdd = () => {},
	onRemove = () => {},
	onReorder = () => {}
}) => {
	const { t } = useTranslation("common");
	const [previewSrc, setPreviewSrc] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const layout = getUploadImagesLayout(items.length);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.findIndex(
			(i) => getUploadItemId(i) === active.id
		);
		const newIndex = items.findIndex((i) => getUploadItemId(i) === over.id);
		onReorder(arrayMove(items, oldIndex, newIndex));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? [])?.slice(0, maxFiles);
		if (files.length) onAdd(files);
		e.target.value = "";
	};

	return (
		<div className={cn("w-full", className)}>
			{items.length < maxFiles && (
				<div
					className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50 mb-4"
					onClick={() => fileInputRef.current?.click()}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept={accept}
						multiple
						className="sr-only"
						onChange={handleFileChange}
					/>
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Upload className="h-5 w-5 text-muted-foreground" />
						</div>
						<p className="text-sm font-medium">
							{t("upload_images.title")}
						</p>
						<p className="text-xs text-muted-foreground">
							{t("upload_images.description")}
						</p>
					</div>
				</div>
			)}

			{items.length > 0 && (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={items.map(getUploadItemId)}
						strategy={rectSortingStrategy}
					>
						<div className="flex flex-col gap-4 w-full">
							<div
								className="grid gap-2 w-full"
								style={{
									height: UPLOAD_IMAGES_GRID_HEIGHT,
									...layout?.style
								}}
							>
								{items.slice(0, 5).map((item, idx) => (
									<SortableCard
										key={getUploadItemId(item)}
										item={item}
										isPrimary={idx === 0}
										gridArea={layout?.areas[idx]}
										onRemove={onRemove}
										onPreview={setPreviewSrc}
									/>
								))}
							</div>

							{items.length > 5 && (
								<div className="grid gap-4 w-full grid-cols-3">
									{items.slice(5).map((item) => (
										<SortableCard
											key={getUploadItemId(item)}
											item={item}
											isPrimary={false}
											onRemove={onRemove}
											onPreview={setPreviewSrc}
										/>
									))}
								</div>
							)}
						</div>
					</SortableContext>
				</DndContext>
			)}

			<UploadImagesLightbox
				src={previewSrc}
				onClose={() => setPreviewSrc(null)}
			/>
		</div>
	);
};

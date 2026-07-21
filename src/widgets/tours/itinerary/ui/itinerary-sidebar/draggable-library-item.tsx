import { useDraggable } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import { Button, Card, CardContent } from "@/shared/ui";

import { EVENT_METADATA, type IEventLibraryItem } from "@/entities/tour";

import { libraryId } from "../../model";

const variants = cva("py-2 bg-background", {
	variants: {
		dragging: {
			over: "opacity-50",
			overlay: "ring-2 ring-primary"
		}
	}
});

export const DraggableLibraryItem: FC<{
	item: IEventLibraryItem;
	isOverlay?: boolean;
	disabled?: boolean;
}> = ({ item, isOverlay, disabled }) => {
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: libraryId(item.id),
		data: {
			type: "event-library",
			templateId: item.id
		},
		disabled
	});

	const meta = EVENT_METADATA[item.eventType];
	const Icon = meta?.icon;

	return (
		<Card
			ref={setNodeRef}
			className={variants({
				dragging: isOverlay
					? "overlay"
					: isDragging
						? "over"
						: undefined
			})}
		>
			<CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pr-1 relative">
				<div className="flex items-center justify-center">
					{Icon ? (
						<Icon
							className={cn(
								"size-4",
								meta?.color_text ?? "text-muted-foreground"
							)}
						/>
					) : null}
				</div>
				<span className="text-sm font-medium truncate">
					{item.name || "Untitled"}
				</span>
				<Button
					variant="ghost"
					size="icon"
					{...attributes}
					{...listeners}
					className="cursor-grab"
					disabled={disabled}
				>
					<GripVertical className="w-5 h-5 text-muted-foreground" />
				</Button>
			</CardContent>
		</Card>
	);
};

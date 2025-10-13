import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";

import { Button, Card, CardContent } from "@/shared/ui";

import { EVENT_TYPE_TO_PATH, type IDayItem, itemId } from "../model";

const variants = cva(" p-3 bg-background hover:text-primary", {
	variants: {
		dragging: {
			over: "opacity-50",
			overlay: "ring-2 ring-primary"
		}
	}
});

export const DraggableDayItem: FC<{
	item: IDayItem;
	isOverlay?: boolean;
}> = ({ item, isOverlay }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: itemId(item.block_id) });
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition
	};
	const Icon = item.icon;
	const { tourId } = useParams<{ tourId: string }>();
	const href = EVENT_TYPE_TO_PATH[item.event_type]
		.replace(":tourId", tourId || "")
		.replace(":eventId", item.id);

	return (
		<Link to={href}>
			<Card
				ref={setNodeRef}
				style={style}
				className={variants({
					dragging: isOverlay
						? "overlay"
						: isDragging
							? "over"
							: undefined
				})}
			>
				<CardContent className="flex items-start gap-3 p-0 justify-between">
					<div
						className={`${item.color} rounded-full p-2 flex items-center`}
					>
						<Icon className="size-6 text-white" />
					</div>
					<div className="flex-1">
						<h4 className="font-medium">{item.title}</h4>
						{item.subtitle && (
							<p className="text-xs text-muted-foreground">
								{item.subtitle}
							</p>
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						{...attributes}
						{...listeners}
						className="cursor-grab"
					>
						<GripVertical className="w-5 h-5 text-muted-foreground" />
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
};

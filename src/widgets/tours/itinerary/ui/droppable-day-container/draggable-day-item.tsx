import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";

import { InfoCircleIcon } from "@/shared/assets";
import { Button, Card, CardContent } from "@/shared/ui";

import {
	EVENT_TEMPLATES_LIST,
	EVENT_TYPE_TO_PATH,
	type IDayItem,
	itemId
} from "../../model";

import { DraggableDayItemMenu } from "./draggable-day-item-menu";

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
	onRemove?: () => void;
}> = ({ item, isOverlay, onRemove }) => {
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
	const template = EVENT_TEMPLATES_LIST.components.find(
		(tpl) => tpl.event_type === item.event_type
	);
	const Icon = template?.icon || InfoCircleIcon;
	const color = template?.color || "gray-500";

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
				<CardContent className="flex items-start gap-3 p-0 justify-between relative">
					<div
						className={`bg-${color} rounded-full p-2.5 flex items-center`}
					>
						<Icon className="size-4 text-white" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">{item.title}</p>
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
						className="cursor-grab mt-2"
					>
						<GripVertical className="w-5 h-5 text-muted-foreground" />
					</Button>
					<div className="absolute -right-3 -top-4">
						<DraggableDayItemMenu onRemove={onRemove} />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

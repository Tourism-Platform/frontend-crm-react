import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";

import { InfoCircleIcon } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { Button, Card, CardContent } from "@/shared/ui";

import {
	ENUM_EVENT,
	EVENT_TEMPLATES_LIST,
	EVENT_TYPE_TO_PATH,
	type ITemplateItem
} from "@/entities/tour";

import { type IDayItem, itemId } from "../../model";

import { DraggableDayItemMenu } from "./draggable-day-item-menu";
import { DroppableNestedContainer } from "./droppable-nested-container";

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
	onRemoveNested?: (nestedIndex: number) => void;
}> = ({ item, isOverlay, onRemove, onRemoveNested }) => {
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
	const template =
		EVENT_TEMPLATES_LIST.components.find(
			(tpl: ITemplateItem) => tpl.event_type === item.event_type
		) ||
		EVENT_TEMPLATES_LIST.library.find(
			(tpl: ITemplateItem) => tpl.event_type === item.event_type
		);
	const Icon = template?.icon || InfoCircleIcon;
	const colorBg = template?.color_bg || "bg-gray-500";

	const isMultiplyOption = item.event_type === ENUM_EVENT.MULTIPLY_OPTION;

	const { tourId } = useParams<{ tourId: string }>();
	const href = (EVENT_TYPE_TO_PATH[item.event_type] || "")
		.replace(":tourId", tourId || "")
		.replace(":eventId", item.id);

	const content = (
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
			<CardContent className="flex flex-col gap-3 p-0 relative">
				<div className="flex items-start gap-3 justify-between w-full">
					<div
						className={cn(
							"rounded-full p-2.5 flex items-center shadow-sm",
							colorBg
						)}
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
						className="cursor-grab mr-3"
					>
						<GripVertical className="w-5 h-5 text-muted-foreground" />
					</Button>
					<div className="absolute -right-3 -top-4">
						<DraggableDayItemMenu onRemove={onRemove} />
					</div>
				</div>

				{isMultiplyOption && (
					<DroppableNestedContainer
						items={item.items || []}
						parentBlockId={item.block_id}
						onRemoveNested={onRemoveNested || (() => {})}
					/>
				)}
			</CardContent>
		</Card>
	);

	return <Link to={href}>{content}</Link>;
};

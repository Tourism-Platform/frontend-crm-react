import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { type CSSProperties, type FC } from "react";

import { Button, Card, CardContent } from "@/shared/ui";

import { type ITemplateItem, templateId } from "../model";

const variants = cva("py-2 bg-background", {
	variants: {
		dragging: {
			over: "opacity-50",
			overlay: "ring-2 ring-primary"
		}
	}
});

export const DraggableTemplateItem: FC<{
	template: ITemplateItem;
	isOverlay?: boolean;
}> = ({ template, isOverlay }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: templateId(template.event_type) });
	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition
	};
	const Icon = template.icon;

	return (
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
			<CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pr-1">
				<div className={`${template.color} rounded p-1.5`}>
					<Icon className="w-4 h-4 text-white" />
				</div>
				<span className="text-sm font-medium truncate">
					{template.title}
				</span>
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
	);
};

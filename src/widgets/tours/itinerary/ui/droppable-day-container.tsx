import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import { Button, Card, CardContent, CardHeader, Separator } from "@/shared/ui";

import { type IDayItem, itemId } from "../model";

import { DraggableDayItem } from "./draggable-day-item";

export const DroppableDayContainer: FC<{
	items: IDayItem[];
	day: number;
	containerId: string;
}> = ({ items, containerId }) => {
	const { setNodeRef, isOver } = useDroppable({ id: containerId });
	return (
		<Card
			ref={setNodeRef}
			className={cn(
				"min-h-[400px] rounded-lg border-2 border-dashed gap-3 pt-2",
				isOver ? "ring-2 ring-primary" : ""
			)}
		>
			<CardHeader className="flex justify-end pr-2">
				<Button variant={"ghost"} size={"icon"} className="cursor-grab">
					<GripVertical />
				</Button>
			</CardHeader>
			<Separator />
			<CardContent className="px-3">
				<SortableContext
					items={items.map((it) => itemId(it.id))}
					strategy={verticalListSortingStrategy}
				>
					{items.length === 0 ? (
						<div className="h-32 flex items-center justify-center text-gray-400 text-sm">
							Drag & drop Event here
						</div>
					) : (
						items.map((item) => (
							<div key={item.id} className="mb-2">
								<DraggableDayItem item={item} />
							</div>
						))
					)}
				</SortableContext>
			</CardContent>
		</Card>
	);
};

import { type DraggableAttributes, useDroppable } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button, Card, CardContent, CardHeader, Separator } from "@/shared/ui";

import { type IBaseDnDProps, type IDayItem, itemId } from "../../model";

import { DraggableDayItem } from "./draggable-day-item";

interface IDroppableDayContainerProps extends IBaseDnDProps {
	items: IDayItem[];
	day: number;
	containerId: string;
	sortableProps?: {
		attributes: DraggableAttributes | undefined;
		listeners: SyntheticListenerMap | undefined;
	};
}

export const DroppableDayContainer: FC<IDroppableDayContainerProps> = ({
	items,
	day,
	containerId,
	sortableProps,
	optionId,
	onRemoveItem
}) => {
	const { t } = useTranslation("tour_itinerary_page");
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
				<Button
					variant={"ghost"}
					size={"icon"}
					className="cursor-grab"
					{...sortableProps?.attributes}
					{...sortableProps?.listeners}
				>
					<GripVertical />
				</Button>
			</CardHeader>
			<Separator />
			<CardContent className="px-3">
				<SortableContext
					items={items.map((it) => itemId(it.block_id))}
					strategy={verticalListSortingStrategy}
				>
					{items.length === 0 ? (
						<div className="h-32 flex items-center justify-center text-gray-400 text-sm">
							{t("day_details.container.empty")}
						</div>
					) : (
						items.map((item, index) => (
							<div key={item.block_id} className="mb-2">
								<DraggableDayItem
									item={item}
									onRemove={() =>
										onRemoveItem({
											optionId,
											location: "day",
											day,
											index
										})
									}
									onRemoveNested={(nestedIdx) =>
										onRemoveItem({
											optionId,
											location: "day",
											day,
											index,
											nestedIndex: nestedIdx
										})
									}
								/>
							</div>
						))
					)}
				</SortableContext>
			</CardContent>
		</Card>
	);
};

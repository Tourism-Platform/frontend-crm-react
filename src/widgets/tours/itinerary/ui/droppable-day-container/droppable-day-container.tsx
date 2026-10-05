import {
	type DraggableAttributes,
	useDndContext,
	useDroppable
} from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CustomScroll,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

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

const DroppableDayContainerBase: FC<IDroppableDayContainerProps> = ({
	items,
	day,
	containerId,
	sortableProps,
	optionId,
	onRemoveItem
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const { setNodeRef, isOver } = useDroppable({ id: containerId });
	const { over } = useDndContext();

	const isOverItem = items.some((item) => itemId(item.block_id) === over?.id);
	const isOverContainer = isOver || isOverItem;

	return (
		<Card
			ref={setNodeRef}
			className={cn(
				"h-full min-h-0 gap-0 overflow-hidden rounded-lg pt-2 pb-0",
				isOverContainer ? "ring-2 ring-primary" : ""
			)}
		>
			<CardHeader className="flex shrink-0 justify-end pr-2 pb-3">
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
			<CardContent className="min-h-0 flex-1 overflow-hidden p-0">
				<CustomScroll className="h-full px-3">
					<SortableContext
						items={items.map((it) => itemId(it.block_id))}
						strategy={verticalListSortingStrategy}
					>
						{items.length === 0 ? (
							<div className="flex h-32 items-center justify-center text-sm text-gray-400">
								{t("day_details.container.empty")}
							</div>
						) : (
							items.map((item, index) => (
								<div
									key={item.block_id}
									className="mt-2 last:mb-2"
								>
									<DraggableDayItem
										item={item}
										optionId={optionId}
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
				</CustomScroll>
			</CardContent>
		</Card>
	);
};

export const DroppableDayContainer = withErrorBoundary(
	DroppableDayContainerBase
);

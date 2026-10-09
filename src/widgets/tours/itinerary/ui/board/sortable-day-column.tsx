import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type FC } from "react";

import { withErrorBoundary } from "@/shared/ui";

import { type IBaseDnDProps, type IDayItem, columnId } from "../../model";

import { DayColumn } from "./day-column";

interface ISortableDayColumnProps extends IBaseDnDProps {
	day: number;
	items: IDayItem[];
	isLoading?: boolean;
}

const SortableDayColumnBase: FC<ISortableDayColumnProps> = ({
	day,
	items,
	optionId,
	isLoading,
	onRemoveItem,
	onDuplicateItem,
	onSaveItemToLibrary
}) => {
	const id = columnId(day);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex min-h-0 flex-1 flex-col"
		>
			<DayColumn
				day={day}
				items={items}
				isDragging={isDragging}
				attributes={attributes}
				listeners={listeners}
				optionId={optionId}
				isLoading={isLoading}
				onRemoveItem={onRemoveItem}
				onDuplicateItem={onDuplicateItem}
				onSaveItemToLibrary={onSaveItemToLibrary}
			/>
		</div>
	);
};

export const SortableDayColumn = withErrorBoundary(SortableDayColumnBase);

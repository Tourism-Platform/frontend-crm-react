import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type FC } from "react";

import { type IDayItem, columnId } from "../../model";

import { DayColumn } from "./day-column";

interface ISortableDayColumnProps {
	day: number;
	items: IDayItem[];
	optionId: number;
	onRemoveItem: (loc: {
		optionId: number;
		location: "tripDetails" | "day";
		day?: number;
		index: number;
		nestedIndex?: number;
	}) => void;
}

export const SortableDayColumn: FC<ISortableDayColumnProps> = ({
	day,
	items,
	optionId,
	onRemoveItem
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
		<div ref={setNodeRef} style={style}>
			<DayColumn
				day={day}
				items={items}
				isDragging={isDragging}
				attributes={attributes}
				listeners={listeners}
				optionId={optionId}
				onRemoveItem={onRemoveItem}
			/>
		</div>
	);
};

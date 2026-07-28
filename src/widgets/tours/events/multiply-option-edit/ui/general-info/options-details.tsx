import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import type { ITourEventOption } from "@/entities/tour";

import { OptionCard } from "./option-card";

interface IOptionsDetailsProps {
	options: ITourEventOption[];
	onReorder: (options: ITourEventOption[]) => void;
	onToggleOptional: (optionId: string, isOptional: boolean) => void;
	onRemove: (optionId: string) => void;
}

const OptionsDetailsBase: FC<IOptionsDetailsProps> = ({
	options,
	onReorder,
	onToggleOptional,
	onRemove
}) => {
	const { t } = useTranslation("multiply_option_edit_page");
	const [activeOption, setActiveOption] = useState<ITourEventOption | null>(
		null
	);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 }
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		const option = options.find(
			(item) => String(item.id) === String(event.active.id)
		);
		setActiveOption(option ?? null);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveOption(null);

		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = options.findIndex(
			(item) => String(item.id) === String(active.id)
		);
		const newIndex = options.findIndex(
			(item) => String(item.id) === String(over.id)
		);
		if (oldIndex < 0 || newIndex < 0) return;

		onReorder(arrayMove(options, oldIndex, newIndex));
	};

	const handleDragCancel = () => {
		setActiveOption(null);
	};

	return (
		<div className="grid gap-4">
			<h3 className="text-lg font-medium">
				{t("general.options.title")}
			</h3>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<SortableContext
					items={options.map((option) => option.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="grid gap-4">
						{options.map((option) => (
							<OptionCard
								key={option.id}
								option={option}
								onToggleOptional={onToggleOptional}
								onRemove={onRemove}
							/>
						))}
					</div>
				</SortableContext>
				<DragOverlay adjustScale={false}>
					{!!activeOption && (
						<OptionCard option={activeOption} isOverlay />
					)}
				</DragOverlay>
			</DndContext>
		</div>
	);
};

export const OptionsDetails = withErrorBoundary(OptionsDetailsBase);

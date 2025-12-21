import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ITINERARY_ROUTES_MOCK, ITINERARY_TABS_MOCK } from "@/shared/config";
import { Separator } from "@/shared/ui";

import {
	type IDayItem,
	type IItemLocation,
	type IOption,
	type ITemplateItem,
	type TOptionsData,
	customCollisionDetection,
	handleDragEnd,
	handleDragOver,
	handleDragStart,
	removeItemFromData
} from "./model";
import {
	BoardColumns,
	BoardTabs,
	DayColumn,
	DraggableDayItem,
	DraggableTemplateItem,
	ItinerarySidebar
} from "./ui";

export const Itinerary: React.FC = () => {
	// tabs state (mocks "loading" tabs list)
	const [options, setOptions] = useState<IOption[]>(ITINERARY_TABS_MOCK);
	const [activeOption, setActiveOption] = useState<number>(
		options[0]?.id || 1
	);

	const { watch, setValue } = useForm<{ optionsData: TOptionsData }>({
		defaultValues: {
			optionsData: ITINERARY_ROUTES_MOCK
		}
	});

	const optionsData = watch("optionsData");

	// dnd-kit sensors
	const sensors = useSensors(useSensor(PointerSensor));

	const [activeDayItem, setActiveDayItem] = useState<IDayItem | null>(null);
	const [activeTemplateItem, setActiveTemplateItem] =
		useState<ITemplateItem | null>(null);
	const [activeColumn, setActiveColumn] = useState<number | null>(null);

	const handleRemoveItem = (loc: IItemLocation) => {
		const resultData = removeItemFromData(optionsData, loc);
		setValue("optionsData", resultData);
	};

	const onDragStart = (event: DragEndEvent) => {
		const state = handleDragStart(event, optionsData);
		setActiveDayItem(state.activeDayItem);
		setActiveTemplateItem(state.activeTemplateItem);
		setActiveColumn(state.activeColumn);
	};

	const onDragEnd = (event: DragEndEvent) => {
		const result = handleDragEnd(event, optionsData, activeOption);

		if (result.shouldUpdate && result.newData) {
			setValue("optionsData", result.newData);
		}

		if (result.clearState) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			setActiveColumn(null);
		}
	};

	const onDragOver = (event: DragEndEvent) => {
		const newData = handleDragOver(event, optionsData, activeOption);
		if (newData) {
			setValue("optionsData", newData, { shouldValidate: false });
		}
	};

	const currentData = optionsData[activeOption] ?? {
		tripDetails: [],
		days: { 1: [], 2: [], 3: [], 4: [] },
		dayOrder: []
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={customCollisionDetection}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDragEnd={onDragEnd}
		>
			<div className="h-full flex flex-col">
				<BoardTabs
					optionsData={optionsData}
					setOptionsData={(v: TOptionsData) =>
						setValue("optionsData", v as TOptionsData)
					}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					options={options}
					setOptions={setOptions}
				/>

				<Separator />

				{/* board + sidebar */}
				<div className="flex-1 flex overflow-hidden">
					<BoardColumns
						data={currentData}
						optionId={activeOption}
						onRemoveItem={handleRemoveItem}
					/>
					<ItinerarySidebar />
				</div>

				{/* Drag overlay - visual floating card while dragging */}
				<DragOverlay adjustScale={false}>
					{!!activeDayItem && (
						<DraggableDayItem item={activeDayItem} isOverlay />
					)}
					{!!activeTemplateItem && (
						<DraggableTemplateItem
							template={activeTemplateItem}
							isOverlay
						/>
					)}
					{!!activeColumn && (
						<DayColumn
							day={activeColumn}
							items={currentData.days[activeColumn]}
							isOverlay
							optionId={activeOption}
							onRemoveItem={handleRemoveItem}
						/>
					)}
				</DragOverlay>
			</div>
		</DndContext>
	);
};

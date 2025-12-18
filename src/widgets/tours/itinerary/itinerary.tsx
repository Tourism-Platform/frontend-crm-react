import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	PointerSensor,
	closestCorners,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
	ITINERARY_ROUTES_MOCK,
	ITINERARY_TABS_MOCK
} from "@/shared/config/mocks";
import { Separator } from "@/shared/ui";

import {
	ENUM_EVENT,
	EVENT_TEMPLATES_LIST,
	type IDayItem,
	type IItemLocation,
	type IOption,
	type ITemplateItem,
	type TOptionsData,
	addItemToData,
	containerIdTrip,
	findItemLocation,
	moveItemInData,
	removeItemFromData,
	reorderDaysInData
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

	console.log("optionsData", optionsData);
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

	// onDragStart — capture active id and snapshot (for overlay)
	const handleDragStart = (event: DragEndEvent) => {
		const id = event.active.id as string;

		if (id.startsWith("item:")) {
			const rawId = id.replace("item:", "");
			const loc = findItemLocation(optionsData, rawId);
			if (loc) {
				let item: IDayItem;
				if (loc.location === "tripDetails") {
					item = optionsData[loc.optionId].tripDetails[loc.index];
					if (loc.nestedIndex !== undefined) {
						item = item.items![loc.nestedIndex];
					}
				} else {
					item =
						optionsData[loc.optionId].days[loc.day as number][
							loc.index
						];
					if (loc.nestedIndex !== undefined) {
						item = item.items![loc.nestedIndex];
					}
				}
				setActiveDayItem(item);
			}
		} else if (id.startsWith("template:")) {
			const raw = id.replace("template:", "");
			const found = [
				...EVENT_TEMPLATES_LIST.library,
				...EVENT_TEMPLATES_LIST.components
			].find((t) => t.event_type === raw);
			if (found) {
				setActiveTemplateItem(found);
			}
		} else if (id.startsWith("column:")) {
			const day = Number(id.replace("column:", ""));
			setActiveColumn(day);
		}
	};

	// onDragEnd — main logic: move existing item or create from template
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			setActiveColumn(null);
			return;
		}

		const activeIdStr = active.id as string;
		const overIdStr = over.id as string;

		// Column reordering
		if (
			activeIdStr.startsWith("column:") &&
			overIdStr.startsWith("column:")
		) {
			const activeDay = Number(activeIdStr.replace("column:", ""));
			const overDay = Number(overIdStr.replace("column:", ""));

			if (activeDay !== overDay) {
				const resultData = reorderDaysInData(
					optionsData,
					activeOption,
					activeDay,
					overDay
				);
				setValue("optionsData", resultData);
			}
			setActiveColumn(null);
			return;
		}

		// Determine target container and insertion index
		let targetContainer: {
			location: "tripDetails" | "day";
			day?: number;
			nestedIndex?: number;
		} | null = null;
		let toIndex = 0;

		if (overIdStr === containerIdTrip()) {
			targetContainer = { location: "tripDetails" };
			toIndex = optionsData[activeOption].tripDetails.length;
		} else if (overIdStr.startsWith("container:day-")) {
			const day = Number(overIdStr.replace("container:day-", ""));
			targetContainer = { location: "day", day };
			toIndex = (optionsData[activeOption].days[day] || []).length;
		} else if (overIdStr.startsWith("item:")) {
			const rawOver = overIdStr.replace("item:", "");
			const loc = findItemLocation(optionsData, rawOver);
			if (loc) {
				const isNested = loc.nestedIndex !== undefined;
				targetContainer =
					loc.location === "tripDetails"
						? {
								location: "tripDetails",
								nestedIndex: isNested ? loc.index : undefined
							}
						: {
								location: "day",
								day: loc.day,
								nestedIndex: isNested ? loc.index : undefined
							};
				toIndex = isNested ? loc.nestedIndex! : loc.index;
			}
		} else if (overIdStr.startsWith("container:nested:")) {
			const parentBlockId = overIdStr.replace("container:nested:", "");
			const loc = findItemLocation(optionsData, parentBlockId);
			if (loc) {
				targetContainer =
					loc.location === "tripDetails"
						? { location: "tripDetails", nestedIndex: loc.index }
						: {
								location: "day",
								day: loc.day,
								nestedIndex: loc.index
							};
				const parent =
					loc.location === "tripDetails"
						? optionsData[loc.optionId].tripDetails[loc.index]
						: optionsData[loc.optionId].days[loc.day as number][
								loc.index
							];
				toIndex = (parent.items || []).length;
			}
		}

		if (!targetContainer) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			setActiveColumn(null);
			return;
		}

		// Template -> create new item
		if (activeIdStr.startsWith("template:")) {
			const tplId = activeIdStr.replace("template:", "");
			const tpl = [
				...EVENT_TEMPLATES_LIST.library,
				...EVENT_TEMPLATES_LIST.components
			].find((t) => t.event_type === tplId);
			if (!tpl) return;

			const newItem: IDayItem = {
				id: uuidv4(),
				block_id: `${tpl.event_type}-${Date.now()}`,
				event_type: tpl.event_type,
				title: tpl.title,
				subtitle: "Information"
			};

			if (
				newItem.event_type === ENUM_EVENT.MULTIPLY_OPTION &&
				targetContainer.nestedIndex !== undefined
			) {
				setActiveDayItem(null);
				setActiveTemplateItem(null);
				return;
			}

			const resultData = addItemToData(
				optionsData,
				targetContainer,
				toIndex,
				newItem,
				activeOption
			);
			setValue("optionsData", resultData);
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			return;
		}

		// Existing item move
		if (activeIdStr.startsWith("item:")) {
			const rawActive = activeIdStr.replace("item:", "");
			const from = findItemLocation(optionsData, rawActive);
			if (!from) {
				setActiveDayItem(null);
				setActiveTemplateItem(null);
				setActiveColumn(null);
				return;
			}

			// capture moved item before mutating
			let movedItem: IDayItem;
			if (from.location === "tripDetails") {
				const parent =
					optionsData[from.optionId].tripDetails[from.index];
				movedItem =
					from.nestedIndex !== undefined
						? parent.items![from.nestedIndex]
						: parent;
			} else {
				const parent =
					optionsData[from.optionId].days[from.day as number][
						from.index
					];
				movedItem =
					from.nestedIndex !== undefined
						? parent.items![from.nestedIndex]
						: parent;
			}

			// 0. Prevent nesting MULTIPLY_OPTION into another MULTIPLY_OPTION
			if (
				movedItem.event_type === ENUM_EVENT.MULTIPLY_OPTION &&
				targetContainer.nestedIndex !== undefined
			) {
				setActiveDayItem(null);
				setActiveTemplateItem(null);
				setActiveColumn(null);
				return;
			}

			const resultData = moveItemInData(
				optionsData,
				from,
				targetContainer,
				toIndex,
				movedItem,
				activeOption
			);
			setValue("optionsData", resultData);
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			return;
		}
	};

	// onDragOver handles visual swapping during drag
	const handleDragOver = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeIdStr = active.id as string;
		const overIdStr = over.id as string;

		// Column reordering during drag
		if (activeIdStr.startsWith("column:")) {
			let overDay: number | null = null;
			if (overIdStr.startsWith("column:")) {
				overDay = Number(overIdStr.replace("column:", ""));
			} else if (overIdStr.startsWith("container:day-")) {
				overDay = Number(overIdStr.replace("container:day-", ""));
			} else if (overIdStr.startsWith("item:")) {
				const loc = findItemLocation(
					optionsData,
					overIdStr.replace("item:", "")
				);
				if (loc && loc.location === "day") overDay = loc.day!;
			}

			if (overDay !== null) {
				const activeDay = Number(activeIdStr.replace("column:", ""));
				if (activeDay !== overDay) {
					const resultData = reorderDaysInData(
						optionsData,
						activeOption,
						activeDay,
						overDay
					);
					setValue("optionsData", resultData, {
						shouldValidate: false
					});
				}
			}
			return;
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
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
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

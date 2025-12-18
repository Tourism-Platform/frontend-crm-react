import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	PointerSensor,
	closestCorners,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
	ITINERARY_ROUTES_MOCK,
	ITINERARY_TABS_MOCK
} from "@/shared/config/mocks";
import { Separator } from "@/shared/ui";

import {
	EVENT_TEMPLATES_LIST,
	type IDayItem,
	type IOption,
	type ITemplateItem,
	type TOptionsData,
	containerIdTrip
} from "./model";
import {
	BoardColumns,
	BoardTabs,
	DayColumn,
	DraggableDayItem,
	DraggableTemplateItem,
	ItinerarySidebar
} from "./ui";

function findItemLocation(
	optionsData: TOptionsData,
	itemIdRaw: string
): {
	optionId: number;
	location: "tripDetails" | "day";
	day?: number;
	index: number;
} | null {
	for (const key of Object.keys(optionsData)) {
		const optionKey = Number(key);
		const data = optionsData[optionKey];
		const tdIndex = data.tripDetails.findIndex(
			(it) => it.block_id === itemIdRaw
		);
		if (tdIndex !== -1)
			return {
				optionId: optionKey,
				location: "tripDetails",
				index: tdIndex
			};
		for (const dayKey of Object.keys(data.days)) {
			const day = Number(dayKey);
			const idx = data.days[day].findIndex(
				(it) => it.block_id === itemIdRaw
			);
			if (idx !== -1)
				return {
					optionId: optionKey,
					location: "day",
					day,
					index: idx
				};
		}
	}
	return null;
}

export const Itinerary: React.FC = () => {
	// tabs state (mocks "loading" tabs list)
	const [options, setOptions] = useState<IOption[]>(ITINERARY_TABS_MOCK);
	const [activeOption, setActiveOption] = useState<number>(
		options[0]?.id || 1
	);

	const { control, watch, setValue } = useForm<{ optionsData: TOptionsData }>(
		{
			defaultValues: {
				optionsData: ITINERARY_ROUTES_MOCK
			}
		}
	);

	const optionsData = watch("optionsData");

	console.log("optionsData", optionsData);
	// dnd-kit sensors
	const sensors = useSensors(useSensor(PointerSensor));
	// const [activeId, setActiveId] = useState<string | null>(null);

	const [activeDayItem, setActiveDayItem] = useState<IDayItem | null>(null);
	const [activeTemplateItem, setActiveTemplateItem] =
		useState<ITemplateItem | null>(null);
	const [activeColumn, setActiveColumn] = useState<number | null>(null);

	// helpers to read/write containers
	const getContainerItems = (
		optId: number,
		container: "tripDetails" | "day",
		day?: number
	) => {
		const data = optionsData[optId];
		if (!data) return [] as IDayItem[];
		return container === "tripDetails"
			? data.tripDetails
			: (data.days[day as number] ?? []);
	};

	const setContainerItems = (
		optId: number,
		container: "tripDetails" | "day",
		items: IDayItem[],
		day?: number
	) => {
		const copy = { ...optionsData };
		const current = copy[optId] ?? {
			tripDetails: [],
			days: { 1: [], 2: [], 3: [], 4: [] }
		};
		if (container === "tripDetails") current.tripDetails = items;
		else current.days = { ...current.days, [day as number]: items };
		copy[optId] = current;
		setValue("optionsData", copy);
	};

	// onDragStart — capture active id and snapshot (for overlay)
	const handleDragStart = (event: DragEndEvent) => {
		const id = event.active.id as string;

		if (id.startsWith("item:")) {
			const rawId = id.replace("item:", "");
			const loc = findItemLocation(optionsData, rawId);
			if (loc) {
				const item =
					loc.location === "tripDetails"
						? optionsData[loc.optionId].tripDetails[loc.index]
						: optionsData[loc.optionId].days[loc.day as number][
								loc.index
							];
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
				const copy = { ...optionsData };
				const current = copy[activeOption];
				if (current) {
					const oldIndex = current.dayOrder.indexOf(activeDay);
					const newIndex = current.dayOrder.indexOf(overDay);
					current.dayOrder = arrayMove(
						current.dayOrder,
						oldIndex,
						newIndex
					);
					copy[activeOption] = { ...current };
					setValue("optionsData", copy);
				}
			}
			setActiveColumn(null);
			return;
		}

		// Determine target container
		let targetContainer: {
			type: "tripDetails" | "day";
			day?: number;
		} | null = null;
		if (overIdStr === containerIdTrip())
			targetContainer = { type: "tripDetails" };
		else if (overIdStr.startsWith("container:day-")) {
			const day = Number(overIdStr.replace("container:day-", ""));
			targetContainer = { type: "day", day };
		} else if (overIdStr.startsWith("item:")) {
			const rawOver = overIdStr.replace("item:", "");
			const loc = findItemLocation(optionsData, rawOver);
			if (loc) {
				targetContainer =
					loc.location === "tripDetails"
						? { type: "tripDetails" }
						: { type: "day", day: loc.day };
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

			const container = targetContainer ?? { type: "tripDetails" };
			if (container.type === "tripDetails") {
				const arr = getContainerItems(activeOption, "tripDetails");
				setContainerItems(activeOption, "tripDetails", [
					...arr,
					newItem
				]);
			} else {
				const arr = getContainerItems(
					activeOption,
					"day",
					container.day
				);
				setContainerItems(
					activeOption,
					"day",
					[...arr, newItem],
					container.day
				);
			}

			setActiveDayItem(null);
			setActiveTemplateItem(null);
			return;
		}

		// Existing item move
		if (activeIdStr.startsWith("item:")) {
			const rawActive = activeIdStr.replace("item:", "");
			const from = findItemLocation(optionsData, rawActive);
			if (!from) return;

			// capture moved item before mutating
			const movedItem: IDayItem =
				from.location === "tripDetails"
					? optionsData[from.optionId].tripDetails[from.index]
					: optionsData[from.optionId].days[from.day as number][
							from.index
						];

			// compute insertion index
			let toIndex = 0;
			if (overIdStr.startsWith("item:")) {
				const rawOver = overIdStr.replace("item:", "");
				const overLoc = findItemLocation(optionsData, rawOver);
				if (!overLoc) return;

				// same list reorder
				if (
					from.optionId === overLoc.optionId &&
					from.location === overLoc.location &&
					(from.location === "tripDetails" ||
						from.day === overLoc.day)
				) {
					if (from.location === "tripDetails") {
						const list = [
							...optionsData[from.optionId].tripDetails
						];
						const [removed] = list.splice(from.index, 1);
						list.splice(overLoc.index, 0, removed);
						setContainerItems(from.optionId, "tripDetails", list);
						setActiveDayItem(null);
						setActiveTemplateItem(null);
						return;
					} else {
						const list = [
							...optionsData[from.optionId].days[
								from.day as number
							]
						];
						const [removed] = list.splice(from.index, 1);
						list.splice(overLoc.index, 0, removed);
						setContainerItems(from.optionId, "day", list, from.day);
						setActiveDayItem(null);
						setActiveTemplateItem(null);
						return;
					}
				}

				// different container: insert before overLoc.index
				targetContainer =
					overLoc.location === "tripDetails"
						? { type: "tripDetails" }
						: { type: "day", day: overLoc.day };
				toIndex = overLoc.index;
			} else if (overIdStr === containerIdTrip()) {
				targetContainer = { type: "tripDetails" };
				toIndex = getContainerItems(activeOption, "tripDetails").length;
			} else if (overIdStr.startsWith("container:day-")) {
				const day = Number(overIdStr.replace("container:day-", ""));
				targetContainer = { type: "day", day };
				toIndex = getContainerItems(activeOption, "day", day).length;
			}

			if (!targetContainer) return;

			// remove from source
			if (from.location === "tripDetails") {
				const src = [...optionsData[from.optionId].tripDetails];
				src.splice(from.index, 1);
				setContainerItems(from.optionId, "tripDetails", src);
			} else {
				const src = [
					...optionsData[from.optionId].days[from.day as number]
				];
				src.splice(from.index, 1);
				setContainerItems(from.optionId, "day", src, from.day);
			}

			// insert into target (we insert movedItem captured earlier)
			if (targetContainer.type === "tripDetails") {
				const trg = [...getContainerItems(activeOption, "tripDetails")];
				trg.splice(toIndex, 0, movedItem);
				setContainerItems(activeOption, "tripDetails", trg);
			} else {
				const trg = [
					...getContainerItems(
						activeOption,
						"day",
						targetContainer.day
					)
				];
				trg.splice(toIndex, 0, movedItem);
				setContainerItems(
					activeOption,
					"day",
					trg,
					targetContainer.day
				);
			}

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
					const copy = { ...optionsData };
					const current = copy[activeOption];
					if (current) {
						const oldIndex = current.dayOrder.indexOf(activeDay);
						const newIndex = current.dayOrder.indexOf(overDay);
						if (oldIndex !== -1 && newIndex !== -1) {
							current.dayOrder = arrayMove(
								current.dayOrder,
								oldIndex,
								newIndex
							);
							copy[activeOption] = { ...current };
							setValue("optionsData", copy, {
								shouldValidate: false
							});
						}
					}
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
						control={control}
						optionId={activeOption}
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
							control={control}
							isOverlay
							optionId={activeOption}
						/>
					)}
				</DragOverlay>
			</div>
		</DndContext>
	);
};

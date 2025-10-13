import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { Plane } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Separator } from "@/shared/ui";

import {
	ENUM_EVENT_TYPE,
	EVENT_TEMPLATES_LIST,
	type IDayItem,
	type ITemplateItem,
	type TOptionsData,
	containerIdTrip
} from "./model";
import {
	BoardColumns,
	BoardTabs,
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
	const [activeOption, setActiveOption] = useState<number>(1);

	// options data
	const [optionsData, setOptionsData] = useState<TOptionsData>({
		1: {
			tripDetails: [],
			days: {
				1: [
					{
						id: uuidv4(),
						block_id: "day1-1",
						event_type: ENUM_EVENT_TYPE.FLIGHT,
						title: "DOM - TAS",
						subtitle: "7:30 AM (UTC +5) - 12:30 AM (UTC +5)",
						icon: Plane,
						color: "bg-blue-500"
					}
				],
				2: [],
				3: [],
				4: []
			}
		},
		2: { tripDetails: [], days: { 1: [], 2: [], 3: [], 4: [] } }
	});
	console.log("optionsData", optionsData);
	// dnd-kit sensors
	const sensors = useSensors(useSensor(PointerSensor));
	// const [activeId, setActiveId] = useState<string | null>(null);

	const [activeDayItem, setActiveDayItem] = useState<IDayItem | null>(null);
	const [activeTemplateItem, setActiveTemplateItem] =
		useState<ITemplateItem | null>(null);

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
		setOptionsData((prev) => {
			const copy = { ...prev };
			const current = copy[optId] ?? {
				tripDetails: [],
				days: { 1: [], 2: [], 3: [], 4: [] }
			};
			if (container === "tripDetails") current.tripDetails = items;
			else current.days = { ...current.days, [day as number]: items };
			copy[optId] = current;
			return copy;
		});
	};

	// onDragStart — capture active id and snapshot (for overlay)
	const handleDragStart = (event: DragEndEvent) => {
		const id = event.active.id as string;
		// setActiveId(id);

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
		}
	};

	// onDragEnd — main logic: move existing item or create from template
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		// setActiveId(null);

		if (!over) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			return;
		}

		const activeIdStr = active.id as string;
		const overIdStr = over.id as string;

		// Determine target container
		let targetContainer: {
			type: "tripDetails" | "day";
			day?: number;
		} | null = null;
		console.log(overIdStr);
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
				subtitle: "Information",
				icon: tpl.icon,
				color: tpl.color
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

	const currentData = optionsData[activeOption] ?? {
		tripDetails: [],
		days: { 1: [], 2: [], 3: [], 4: [] }
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="h-full flex flex-col">
				<BoardTabs
					optionsData={optionsData}
					setOptionsData={setOptionsData}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
				/>

				<Separator />

				{/* board + sidebar */}
				<div className="flex-1 flex overflow-hidden">
					<BoardColumns data={currentData} />
					<ItinerarySidebar />
				</div>

				{/* Drag overlay - visual floating card while dragging */}
				<DragOverlay>
					{(!!activeDayItem || !!activeTemplateItem) &&
						(activeDayItem ? (
							<DraggableDayItem item={activeDayItem} isOverlay />
						) : (
							!!activeTemplateItem && (
								<DraggableTemplateItem
									template={activeTemplateItem}
									isOverlay
								/>
							)
						))}
				</DragOverlay>
			</div>
		</DndContext>
	);
};

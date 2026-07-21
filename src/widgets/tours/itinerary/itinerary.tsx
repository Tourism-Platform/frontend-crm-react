import { DndContext, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Separator, withErrorBoundary } from "@/shared/ui";

import { customCollisionDetection } from "./model";
import {
	useItineraryDnd,
	useItineraryEvents,
	useItineraryOptions
} from "./model/hooks";
import {
	BoardColumns,
	BoardTabs,
	DayColumn,
	DraggableDayItem,
	DraggableLibraryItem,
	DraggableTemplateItem,
	ItinerarySidebar
} from "./ui";

const ItineraryBase: React.FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [librarySheetOpen, setLibrarySheetOpen] = useState(false);

	const {
		options,
		activeOption,
		setActiveOption,
		isLoading,
		handleOptionDeleted
	} = useItineraryOptions(tourId);

	const { eventsAsOptionData, EMPTY_OPTION_DATA } = useItineraryEvents(
		tourId,
		activeOption
	);

	const {
		sensors,
		currentData,
		activeDayItem,
		activeTemplateItem,
		activeLibraryItem,
		activeColumn,
		libraryItems,
		onDragStart,
		onDragEnd,
		onDragOver,
		handleRemoveItem
	} = useItineraryDnd({
		tourId,
		activeOption,
		eventsAsOptionData,
		emptyOptionData: EMPTY_OPTION_DATA
	});

	const handleDragStart = (event: DragStartEvent) => {
		onDragStart(event);
		if (String(event.active.id).startsWith("library:")) {
			setLibrarySheetOpen(false);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={customCollisionDetection}
			onDragStart={handleDragStart}
			onDragOver={onDragOver}
			onDragEnd={onDragEnd}
		>
			<div className="h-full flex flex-col">
				<BoardTabs
					tourId={tourId}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					options={options}
					onOptionDeleted={handleOptionDeleted}
				/>

				<Separator />

				<div className="flex-1 flex overflow-hidden">
					<BoardColumns
						data={currentData}
						optionId={activeOption}
						onRemoveItem={handleRemoveItem}
					/>
					<ItinerarySidebar
						libraryItems={libraryItems}
						librarySheetOpen={librarySheetOpen}
						onLibrarySheetOpenChange={setLibrarySheetOpen}
					/>
				</div>

				<DragOverlay adjustScale={false}>
					{!!activeDayItem && (
						<DraggableDayItem
							item={activeDayItem}
							optionId={activeOption}
							isOverlay
						/>
					)}
					{!!activeTemplateItem && (
						<DraggableTemplateItem
							template={activeTemplateItem}
							isOverlay
						/>
					)}
					{!!activeLibraryItem && (
						<DraggableLibraryItem
							item={activeLibraryItem}
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

export const Itinerary = withErrorBoundary(ItineraryBase);

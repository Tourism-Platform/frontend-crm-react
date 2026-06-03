import { DndContext, DragOverlay } from "@dnd-kit/core";
import React from "react";
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
	DraggableTemplateItem,
	ItinerarySidebar
} from "./ui";

const ItineraryBase: React.FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();

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
		activeColumn,
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

	if (isLoading) {
		return <div>Loading...</div>;
	}

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
					<ItinerarySidebar />
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

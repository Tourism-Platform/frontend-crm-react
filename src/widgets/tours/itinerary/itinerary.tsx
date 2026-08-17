import { DndContext, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Separator, withErrorBoundary } from "@/shared/ui";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

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
import { ItineraryLoadingSkeleton } from "./ui/itinerary-loading-skeleton";

const ItineraryBase: FC = () => {
	const { t } = useTranslation("tour_itinerary_page");
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

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	if (isLoading) {
		return (
			<section className="flex flex-col gap-6 container">
				<ConnectedTourHeader
					title={t("page_name")}
					actions={actionsJsx}
				/>
				<ItineraryLoadingSkeleton />
			</section>
		);
	}

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />
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
		</section>
	);
};

export const Itinerary = withErrorBoundary(ItineraryBase);

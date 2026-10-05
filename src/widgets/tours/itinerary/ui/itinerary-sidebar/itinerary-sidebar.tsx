import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CustomScroll,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_EVENT,
	EVENT_METADATA,
	EVENT_TEMPLATES_LIST
} from "@/entities/tour";

import { DraggableTemplateItem } from "./draggable-template-item";
import { EventLibrarySheet } from "./event-library-sheet";

interface IItinerarySidebarProps {
	librarySheetOpen: boolean;
	onLibrarySheetOpenChange: (open: boolean) => void;
}

const ItinerarySidebarBase: FC<IItinerarySidebarProps> = ({
	librarySheetOpen,
	onLibrarySheetOpenChange
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const libraryMeta = EVENT_METADATA[ENUM_EVENT.EVENT_LIBRARY];
	const LibraryIcon = libraryMeta.icon;

	return (
		<>
			<Card
				className={cn(
					"flex h-full min-h-0 shrink-0 flex-col gap-0 overflow-hidden rounded-none py-0 transition-all duration-300",
					sidebarOpen ? "w-80" : "w-12"
				)}
			>
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="p-3 hover:bg-accent border-b flex items-center justify-between gap-2 cursor-pointer"
				>
					{sidebarOpen ? (
						<>
							<p className="text-lg font-semibold truncate">
								{t("sidebar.title")}
							</p>
							<ChevronRight className="w-5 h-5" />
						</>
					) : (
						<ChevronLeft className="w-5 h-5" />
					)}
				</button>

				{sidebarOpen && (
					<CustomScroll className="flex-1 p-4">
						<div className="mb-6">
							<h3 className="text-sm font-medium text-gray-500 mb-3 truncate">
								{t("sidebar.library")}
							</h3>
							<button
								type="button"
								className="w-full text-left"
								onClick={() => onLibrarySheetOpenChange(true)}
							>
								<Card className="py-2 bg-background transition-colors hover:bg-accent cursor-pointer">
									<CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pr-1 relative">
										<div className="flex items-center justify-center">
											<LibraryIcon
												className={cn(
													"size-4",
													libraryMeta.color_text
												)}
											/>
										</div>
										<span className="text-sm font-medium truncate">
											{t("sidebar.event_library.entry")}
										</span>
										<span className="inline-flex size-9 items-center justify-center">
											<ChevronRight className="size-5 text-muted-foreground" />
										</span>
									</CardContent>
								</Card>
							</button>
						</div>

						<div>
							<h3 className="text-sm font-medium text-gray-500 mb-3 truncate">
								{t("sidebar.components")}
							</h3>
							<div className="space-y-2">
								{[...EVENT_TEMPLATES_LIST.components].map(
									(template) => (
										<DraggableTemplateItem
											key={template.eventType}
											template={template}
										/>
									)
								)}
							</div>
						</div>
					</CustomScroll>
				)}
			</Card>

			<EventLibrarySheet
				open={librarySheetOpen}
				onOpenChange={onLibrarySheetOpenChange}
			/>
		</>
	);
};

export const ItinerarySidebar = withErrorBoundary(ItinerarySidebarBase);

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card, withErrorBoundary } from "@/shared/ui";

import { EVENT_TEMPLATES_LIST, type IEventLibraryItem } from "@/entities/tour";

import { DraggableLibraryItem } from "./draggable-library-item";
import { DraggableTemplateItem } from "./draggable-template-item";

interface IItinerarySidebarProps {
	libraryItems?: IEventLibraryItem[];
}

const ItinerarySidebarBase: FC<IItinerarySidebarProps> = ({
	libraryItems = []
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<Card
			className={cn(
				"py-0  transition-all duration-300 flex flex-col rounded-none gap-0",
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
				<div className="flex-1 overflow-y-auto p-4">
					<div className="mb-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3 truncate">
							{t("sidebar.library")}
						</h3>
						<div className="space-y-2">
							{libraryItems.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									—
								</p>
							) : (
								libraryItems.map((item) => (
									<DraggableLibraryItem
										key={item.id}
										item={item}
									/>
								))
							)}
						</div>
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
				</div>
			)}
		</Card>
	);
};

export const ItinerarySidebar = withErrorBoundary(ItinerarySidebarBase);

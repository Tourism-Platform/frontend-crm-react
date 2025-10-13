import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui";

import { EVENT_TEMPLATES_LIST } from "../model";

import { DraggableTemplateItem } from "./draggable-template-item";

export const ItinerarySidebar: FC = () => {
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
				<div className="flex-1  p-4">
					<div className="mb-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3 truncate">
							{t("sidebar.library")}
						</h3>
						<div className="space-y-2">
							{[...EVENT_TEMPLATES_LIST.library].map(
								(template) => (
									<DraggableTemplateItem
										key={template.event_type}
										template={template}
									/>
								)
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
										key={template.event_type}
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

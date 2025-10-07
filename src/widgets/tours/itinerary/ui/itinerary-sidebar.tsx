import {
	Calendar,
	Car,
	ChevronLeft,
	ChevronRight,
	Hotel,
	Info,
	List,
	MapPin,
	Plane
} from "lucide-react";
import { type FC, useState } from "react";

import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui";

import type { ITemplateItem } from "../model";

import { DraggableTemplateItem } from "./draggable-template-item";

const COMPONENT_TEMPLATES: {
	library: ITemplateItem[];
	components: ITemplateItem[];
} = {
	library: [
		{
			id: "event-library",
			title: "Event library",
			icon: Calendar,
			color: "bg-blue-500"
		},
		{
			id: "itinerary-library",
			title: "Itinerary library",
			icon: MapPin,
			color: "bg-blue-500"
		}
	],
	components: [
		{
			id: "trip-details",
			title: "Trip details",
			icon: List,
			color: "bg-red-500"
		},
		{ id: "flight", title: "Flight", icon: Plane, color: "bg-blue-500" },
		{
			id: "activity",
			title: "Activity",
			icon: Calendar,
			color: "bg-blue-500"
		},
		{
			id: "accommodation",
			title: "Accommodation",
			icon: Hotel,
			color: "bg-blue-500"
		},
		{
			id: "transportation",
			title: "Transportation",
			icon: Car,
			color: "bg-green-500"
		},
		{
			id: "multiply-option",
			title: "Multiply-option",
			icon: List,
			color: "bg-gray-700"
		},
		{ id: "info", title: "Info", icon: Info, color: "bg-gray-900" }
	]
};

export const ItinerarySidebar: FC = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	return (
		<Card
			className={cn(
				"py-0  transition-all duration-300 flex flex-col rounded-none",
				sidebarOpen ? "w-80" : "w-12"
			)}
		>
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className="p-3 hover:bg-accent border-b flex items-center justify-center cursor-pointer"
			>
				{sidebarOpen ? (
					<ChevronRight className="w-5 h-5" />
				) : (
					<ChevronLeft className="w-5 h-5" />
				)}
			</button>

			{sidebarOpen && (
				<div className="flex-1 overflow-y-auto p-4">
					<h2 className="text-lg font-semibold mb-4">
						Let's build your tour
					</h2>

					<div className="mb-6">
						<h3 className="text-sm font-medium text-gray-500 mb-3">
							Library
						</h3>
						<div className="space-y-2">
							{[...COMPONENT_TEMPLATES.library].map(
								(template) => (
									<DraggableTemplateItem
										key={template.id}
										template={template}
									/>
								)
							)}
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-3">
							Components
						</h3>
						<div className="space-y-2">
							{[...COMPONENT_TEMPLATES.components].map(
								(template) => (
									<DraggableTemplateItem
										key={template.id}
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

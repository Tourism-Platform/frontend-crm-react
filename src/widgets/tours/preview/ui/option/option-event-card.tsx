import {
	Bed,
	Bus,
	FolderOpen,
	Info,
	List,
	Map,
	MoreHorizontal,
	Plane
} from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import type { IOptionEvent } from "@/entities/tour/preview-tour/types";
import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";

import { OptionEventDetailSheet } from "./option-event-detail-sheet";

const getEventIcon = (type: string) => {
	switch (type) {
		case ENUM_EVENT.ACCOMMODATION:
			return <Bed className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.FLIGHT:
			return <Plane className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.TOUR_DETAILS:
		case ENUM_EVENT.ACTIVITY:
			return <Map className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.TRANSPORTATION:
			return <Bus className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.MULTIPLY_OPTION:
			return <MoreHorizontal className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.INFO:
			return <Info className="w-5 h-5 text-primary" />;
		case ENUM_EVENT.EVENT_LIBRARY:
		case ENUM_EVENT.ITINERARY_LIBRARY:
			return <FolderOpen className="w-5 h-5 text-primary" />;
		default:
			return <List className="w-5 h-5 text-primary" />;
	}
};

interface IOptionEventCardProps {
	event: IOptionEvent;
	index: number;
}

const OptionEventCardBase: FC<IOptionEventCardProps> = ({ event, index }) => {
	const { t } = useTranslation("preview_option_page");
	const [sheetOpen, setSheetOpen] = useState(false);

	const isReversed = index % 2 !== 0;

	return (
		<>
			<div className="grid grid-cols-2 gap-0 bg-white rounded-xl border overflow-hidden shadow-sm">
				<div
					className={`${isReversed ? "order-2" : "order-1"} flex flex-col gap-4 p-6`}
				>
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
							{getEventIcon(event.type)}
						</div>
						<h4 className="font-semibold">{event.title}</h4>
					</div>

					<p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
						{event.description}
					</p>

					<button
						type="button"
						onClick={() => setSheetOpen(true)}
						className="text-sm text-primary hover:underline underline-offset-4 w-fit"
					>
						{t("sections.option.view_details")}
					</button>
				</div>

				<div className={`${isReversed ? "order-1" : "order-2"}`}>
					<img
						src={event.image}
						alt={event.title}
						className="w-full h-full min-h-[240px] object-cover"
					/>
				</div>
			</div>

			<OptionEventDetailSheet
				open={sheetOpen}
				onOpenChange={setSheetOpen}
				title={event.title}
				image={event.image}
				description={event.full_description}
			/>
		</>
	);
};

export const OptionEventCard = withErrorBoundary(OptionEventCardBase);

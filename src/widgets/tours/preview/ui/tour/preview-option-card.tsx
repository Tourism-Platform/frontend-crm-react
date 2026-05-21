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
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router";

import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	Separator,
	withErrorBoundary
} from "@/shared/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/shared/ui/shadcn-ui/accordion";
import { Badge } from "@/shared/ui/shadcn-ui/badge";
import { Button } from "@/shared/ui/shadcn-ui/button";
import {
	Timeline,
	TimelineContent,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle
} from "@/shared/ui/shadcn-ui/timeline";

import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";

interface IEvent {
	id: string;
	type: string;
	title: string;
	description: string;
}

interface IDay {
	id: string;
	day_number: number;
	location: string;
	events: IEvent[];
}

export interface IPreviewOption {
	id: string;
	title: string;
	description: string;
	price: string;
	image: string;
	days: IDay[];
}

interface IPreviewOptionCardProps {
	option: IPreviewOption;
}

const getEventIcon = (type: string) => {
	switch (type) {
		case ENUM_EVENT.ACCOMMODATION:
			return <Bed className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.FLIGHT:
			return <Plane className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.TOUR_DETAILS:
		case ENUM_EVENT.ACTIVITY:
			return <Map className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.TRANSPORTATION:
			return <Bus className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.MULTIPLY_OPTION:
			return <MoreHorizontal className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.INFO:
		case ENUM_EVENT.INFORMATION:
			return <Info className="w-4 h-4 text-primary" />;
		case ENUM_EVENT.EVENT_LIBRARY:
		case ENUM_EVENT.ITINERARY_LIBRARY:
			return <FolderOpen className="w-4 h-4 text-primary" />;
		default:
			return <List className="w-4 h-4 text-primary" />;
	}
};

export const PreviewOptionCardBase: FC<IPreviewOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation("preview_tour_page");
	const navigate = useNavigate();
	const { tourId = "" } = useParams<{ tourId: string }>();
	const handleNavigate = () => {
		const path = generatePath(ENUM_PATH.TOURS.CATALOG.PREVIEW_OPTION, {
			tourId,
			optionId: option.id
		});
		navigate(path);
	};

	return (
		<Accordion type="single" collapsible>
			<Card>
				<CardContent>
					<AccordionItem value={option.id} className="border-none">
						<div className="flex flex-col lg:flex-row gap-6">
							<div className="flex-1 flex flex-col gap-4">
								<div className="gap-3 grid">
									<Badge>
										<CardTitle>{option.title}</CardTitle>
									</Badge>
									<CardDescription>
										{option.description}
									</CardDescription>
								</div>

								<div className="mt-auto flex items-end justify-between">
									<div>
										<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
											{t("sections.itinerary.card.from")}
										</p>
										<p className="text-xl font-bold">
											{option.price}{" "}
											<span className="text-base font-normal">
												{t(
													"sections.itinerary.card.per_person"
												)}
											</span>
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											{t(
												"sections.itinerary.card.price_depends"
											)}
										</p>
									</div>

									<AccordionTrigger className="text-sm text-primary hover:no-underline py-0 h-auto font-medium">
										{t(
											"sections.itinerary.card.view_itinerary"
										)}
									</AccordionTrigger>
								</div>
							</div>

							<div className="w-full lg:w-[320px] shrink-0">
								<img
									src={option.image}
									alt={option.title}
									className="w-full h-[240px] object-cover rounded-xl"
								/>
							</div>
						</div>

						<AccordionContent className="px-6 pb-6">
							<PreviewOptionItinerary
								option={option}
								handleNavigate={handleNavigate}
							/>
						</AccordionContent>
					</AccordionItem>
				</CardContent>
			</Card>
		</Accordion>
	);
};

interface IPreviewOptionItineraryProps {
	option: IPreviewOption;
	handleNavigate: () => void;
}

const PreviewOptionItinerary: FC<IPreviewOptionItineraryProps> = ({
	option,
	handleNavigate
}) => {
	const { t } = useTranslation("preview_tour_page");

	return (
		<div className="flex flex-col gap-6 pt-6">
			{option.days.map((day) => (
				<div key={day.id} className="grid gap-4">
					<div className="flex items-start gap-2  items-center">
						<Badge size={"md"} className="text-base">
							{day.day_number}
						</Badge>
						<div className="flex items-center gap-2 self-center">
							<span className="font-semibold">
								{t("sections.itinerary.card.day")}
							</span>
							<span className="w-1 h-1 rounded-full bg-primary" />
							<span className="text-muted-foreground">
								{day.location}
							</span>
						</div>
						<Separator className="w-full self-center" />
					</div>
					<div className="flex-1 pb-8">
						<Timeline defaultValue={2} className="w-full">
							{day.events.map((event, index) => (
								<TimelineItem
									key={event.id}
									step={index}
									className="group-data-[orientation=vertical]/timeline:not-last:pb-8"
								>
									<TimelineHeader className="relative flex items-center gap-3">
										<TimelineSeparator />
										<TimelineIndicator className="size-8 top-0 flex items-center justify-center bg-blue-50 border-none text-primary rounded-full">
											{getEventIcon(event.type)}
										</TimelineIndicator>
										<TimelineTitle className="font-semibold text-base leading-none -mt-0.5 pl-2">
											{event.title}
										</TimelineTitle>
									</TimelineHeader>
									<TimelineContent className="mt-2 text-sm text-muted-foreground pl-2">
										<p className="mb-2">
											{event.description}
										</p>
										<button className="text-sm text-primary underline-offset-4 hover:underline">
											{t(
												"sections.itinerary.card.read_more"
											)}
										</button>
									</TimelineContent>
								</TimelineItem>
							))}
						</Timeline>
					</div>
				</div>
			))}

			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
						{t("sections.itinerary.card.from")}
					</p>
					<p className="text-xl font-bold">
						{option.price}{" "}
						<span className="text-base font-normal">
							{t("sections.itinerary.card.per_person")}
						</span>
					</p>
				</div>
				<Button
					onClick={handleNavigate}
					className="bg-blue-400 hover:bg-blue-500 text-white"
				>
					{t("sections.itinerary.card.book_package")}{" "}
					<span className="ml-2">→</span>
				</Button>
			</div>
		</div>
	);
};

export const PreviewOptionCard = withErrorBoundary(PreviewOptionCardBase);

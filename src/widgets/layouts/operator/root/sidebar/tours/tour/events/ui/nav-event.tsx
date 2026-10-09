import { ChevronRight } from "lucide-react";
import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { InfoCircleIcon } from "@/shared/assets";
import { buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from "@/shared/ui";

import {
	type ENUM_EVENT_TYPE,
	EVENT_METADATA,
	EVENT_TYPE_TO_OPTION_PATH,
	EVENT_TYPE_TO_PATH,
	EVENT_TYPE_TO_TABS,
	type ITourEvent
} from "@/entities/tour";

import { useAutoOpen } from "../../../../model/use-auto-open";
import { isMultiplyOptionEvent } from "../model/use-event-nav-days";

interface INavEventNodeProps {
	title: string;
	eventType: ENUM_EVENT_TYPE;
	eventId: string;
	/** Set for an alternative inside a multiply-option slot. */
	eventOptionId?: string;
	children?: ReactNode;
}

const NavEventNode: FC<INavEventNodeProps> = ({
	title,
	eventType,
	eventId,
	eventOptionId,
	children
}) => {
	const { t } = useTranslation("common_events");
	const params = useParams();
	const [searchParams] = useSearchParams();

	const isCurrent = eventOptionId
		? params.eventOptionId === eventOptionId
		: params.eventId === eventId && !params.eventOptionId;
	// A multi slot also stays open while one of its alternatives is opened.
	const isOnPath = isCurrent || (!!children && params.eventId === eventId);
	const [open, setOpen] = useAutoOpen(isOnPath);

	const path = eventOptionId
		? EVENT_TYPE_TO_OPTION_PATH[eventType]
		: EVENT_TYPE_TO_PATH[eventType];
	const tabs = EVENT_TYPE_TO_TABS[eventType] ?? [];
	const activeTab = searchParams.get("tab") ?? tabs[0];

	const meta = EVENT_METADATA[eventType];
	const Icon = meta?.icon ?? InfoCircleIcon;

	const buildTabHref = (tab: string) =>
		buildRoute(
			path,
			{
				tourId: params.tourId ?? "",
				optionId: params.optionId ?? "",
				eventId,
				...(eventOptionId && { eventOptionId })
			},
			{ tab }
		);

	const rowContent = (
		<>
			<span className="flex shrink-0">
				<Icon
					className={cn(
						"size-4",
						meta?.color_text ?? "text-muted-foreground"
					)}
				/>
			</span>
			<span className="flex-1 truncate text-left">
				{title || t("event_nav.untitled")}
			</span>
		</>
	);

	return (
		<Collapsible open={open} onOpenChange={setOpen} asChild>
			<SidebarMenuSubItem>
				<div className="flex items-center gap-0.5">
					<SidebarMenuSubButton
						asChild
						isActive={isCurrent}
						className="flex-1 cursor-pointer"
					>
						{path ? (
							<Link
								to={buildTabHref(tabs[0])}
								onClick={(e) => {
									// Already on this event: keep the selected tab, just expand.
									if (isCurrent) e.preventDefault();
									setOpen(true);
								}}
							>
								{rowContent}
							</Link>
						) : (
							<button
								type="button"
								onClick={() => setOpen((prev) => !prev)}
							>
								{rowContent}
							</button>
						)}
					</SidebarMenuSubButton>
					<CollapsibleTrigger asChild>
						<button
							type="button"
							className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent"
						>
							<ChevronRight
								className={cn(
									"size-4 transition-transform duration-200",
									open && "rotate-90"
								)}
							/>
						</button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<SidebarMenuSub className="mr-0 pr-0">
						{path
							? tabs.map((tab) => (
									<SidebarMenuSubItem key={tab}>
										<SidebarMenuSubButton
											asChild
											size="sm"
											isActive={
												isCurrent && activeTab === tab
											}
										>
											<Link to={buildTabHref(tab)}>
												<span>
													{t(
														`event_nav.tabs.${tab}` as never
													)}
												</span>
											</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))
							: null}
						{children}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuSubItem>
		</Collapsible>
	);
};

export const NavEvent: FC<{ event: ITourEvent }> = ({ event }) => (
	<NavEventNode
		title={event.name}
		eventType={event.eventType}
		eventId={event.id}
	>
		{isMultiplyOptionEvent(event)
			? event.options?.map((option) => (
					<NavEventNode
						key={option.id}
						title={option.name}
						eventType={option.eventType}
						eventId={event.id}
						eventOptionId={option.id}
					/>
				))
			: null}
	</NavEventNode>
);

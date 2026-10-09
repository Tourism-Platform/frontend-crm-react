import { ArrowLeft, ChevronRightCircleIcon, Loader2 } from "lucide-react";
import { type FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import {
	CustomScroll,
	NavRichItem,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarRail,
	SidebarTrigger,
	useSidebar
} from "@/shared/ui";

import { useEventLibrarySearchOptions } from "@/entities/tour";

import { NavLibraryEvent } from "./nav-library-event";

/** Start loading the next page this far before the list end. */
const LOAD_MORE_MARGIN_PX = 300;

export const LibraryEventNavSidebar: FC = () => {
	const { t } = useTranslation("event_templates_page");
	const { state, isMobile } = useSidebar();
	const { items, isLoading, isLoadingMore, hasMore, loadMore } =
		useEventLibrarySearchOptions();
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const backLabel = t("event_nav.back");

	useEffect(() => {
		const node = loadMoreRef.current;
		if (!node || !hasMore || isLoading || isLoadingMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) loadMore();
			},
			{
				root: scrollRef.current,
				rootMargin: `0px 0px ${LOAD_MORE_MARGIN_PX}px 0px`
			}
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [hasMore, isLoading, isLoadingMore, items.length, loadMore]);

	return (
		<Sidebar collapsible="icon">
			<SidebarTrigger
				className="absolute top-2 right-2 z-30"
				icon={
					<ChevronRightCircleIcon
						size={20}
						className="group-data-[state=expanded]:rotate-180 transition-transform duration-200 ease-linear text-muted-foreground"
					/>
				}
			/>
			<SidebarHeader className="pt-10 group-data-[state=expanded]:pt-5 transition-[padding] duration-200 ease-linear">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip={backLabel}
							size="lg"
							asChild
							className="h-auto min-h-12 py-2"
						>
							<Link to={ENUM_PATH.LIBRARY.EVENTS}>
								<NavRichItem
									icon={<ArrowLeft />}
									title={backLabel}
									iconOnly={
										state === "collapsed" && !isMobile
									}
									className="items-center"
								/>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="overflow-hidden">
				<CustomScroll
					ref={scrollRef}
					className="flex min-h-0 flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden"
				>
					<SidebarGroup>
						<SidebarGroupLabel>
							{t("event_nav.title")}
						</SidebarGroupLabel>
						<SidebarMenu>
							{isLoading ? (
								Array.from({ length: 5 }, (_, i) => (
									<SidebarMenuItem key={i}>
										<SidebarMenuSkeleton showIcon />
									</SidebarMenuItem>
								))
							) : items.length ? (
								items.map((item) => (
									<NavLibraryEvent
										key={item.id}
										item={item}
									/>
								))
							) : (
								<li className="px-2 py-1 text-xs text-muted-foreground">
									{t("event_nav.empty")}
								</li>
							)}
						</SidebarMenu>
						{hasMore && !isLoading ? (
							<div
								ref={loadMoreRef}
								className="flex justify-center py-2"
							>
								{isLoadingMore ? (
									<Loader2 className="size-4 animate-spin text-muted-foreground" />
								) : null}
							</div>
						) : null}
					</SidebarGroup>
				</CustomScroll>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};

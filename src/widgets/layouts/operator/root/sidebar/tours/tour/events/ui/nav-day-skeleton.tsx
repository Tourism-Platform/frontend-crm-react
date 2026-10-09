import { type FC } from "react";

import {
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	Skeleton
} from "@/shared/ui";

const EVENT_TITLE_WIDTHS = ["70%", "55%", "80%"];

/** Mirrors a NavEvent row: type icon + title + expand chevron. */
const NavEventSkeleton: FC<{ width: string }> = ({ width }) => (
	<SidebarMenuSubItem>
		<div className="flex items-center gap-0.5">
			<div className="flex h-7 flex-1 items-center gap-2 px-2">
				<Skeleton className="size-4 shrink-0 rounded-md" />
				<Skeleton
					className="h-3.5 flex-1"
					style={{ maxWidth: width }}
				/>
			</div>
			<div className="flex size-6 shrink-0 items-center justify-center">
				<Skeleton className="size-4 rounded-md" />
			</div>
		</div>
	</SidebarMenuSubItem>
);

/** Mirrors a NavDay row (size="lg" button with NavRichItem icon), optionally expanded with events. */
export const NavDaySkeleton: FC<{ eventsCount?: number }> = ({
	eventsCount = 0
}) => (
	<SidebarMenuItem>
		<div className="flex min-h-12 items-center gap-2 rounded-md p-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:min-h-0 group-data-[collapsible=icon]:p-0">
			<Skeleton className="size-8 shrink-0 rounded-lg" />
			<Skeleton className="h-3.5 w-14 group-data-[collapsible=icon]:hidden" />
			<Skeleton className="ml-auto size-4 shrink-0 rounded-md group-data-[collapsible=icon]:hidden" />
		</div>
		{eventsCount > 0 ? (
			<SidebarMenuSub>
				{Array.from({ length: eventsCount }, (_, i) => (
					<NavEventSkeleton
						key={i}
						width={
							EVENT_TITLE_WIDTHS[i % EVENT_TITLE_WIDTHS.length]
						}
					/>
				))}
			</SidebarMenuSub>
		) : null}
	</SidebarMenuItem>
);

import { type FC } from "react";

import { SidebarMenuItem, Skeleton } from "@/shared/ui";

/** Mirrors a NavLibraryEvent row: type icon + title + expand action. */
export const NavLibraryEventSkeleton: FC<{ width?: string }> = ({
	width = "70%"
}) => (
	<SidebarMenuItem>
		<div className="flex h-8 items-center gap-2 rounded-md p-2 pr-8 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2">
			<Skeleton className="size-4 shrink-0 rounded-md" />
			<Skeleton
				className="h-3.5 flex-1 group-data-[collapsible=icon]:hidden"
				style={{ maxWidth: width }}
			/>
		</div>
		<div className="absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center group-data-[collapsible=icon]:hidden">
			<Skeleton className="size-4 rounded-md" />
		</div>
	</SidebarMenuItem>
);

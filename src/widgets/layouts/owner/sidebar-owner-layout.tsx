import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib";
import {
	CustomBreadcrumb,
	CustomSidebar,
	type ISidebarMenu,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

interface ISideBarOwnerLayoutProps extends PropsWithChildren {
	items: ISidebarMenu[];
	useBreadcrumb?: boolean;
}

export const SideBarOwnerLayout = ({
	children,
	items,
	useBreadcrumb = false
}: ISideBarOwnerLayoutProps) => {
	return (
		<SidebarProvider>
			<CustomSidebar items={items} />
			<SidebarInset>
				<div
					className={cn(
						"py-3 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10",
						!useBreadcrumb && "hidden"
					)}
				>
					<CustomBreadcrumb />
				</div>
				<div className={cn("px-5 mb-30", !useBreadcrumb && "mt-10")}>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

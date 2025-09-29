import type { PropsWithChildren } from "react";

import {
	CustomBreadcrumb,
	CustomSidebar,
	type ISidebarMenu,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

interface ISideBarOwnerLayoutProps extends PropsWithChildren {
	items: ISidebarMenu[];
}

export const SideBarOwnerLayout = ({
	children,
	items
}: ISideBarOwnerLayoutProps) => {
	return (
		<SidebarProvider>
			<CustomSidebar items={items} />
			<SidebarInset>
				<div className="mt-3 flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10">
					<CustomBreadcrumb />
				</div>
				<div className="px-5">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

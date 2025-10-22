import type { PropsWithChildren } from "react";

import {
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
	items
}: ISideBarOwnerLayoutProps) => {
	return (
		<SidebarProvider>
			<CustomSidebar items={items} />
			<SidebarInset className="!w-[calc(100vw-var(--sidebar-width))]">
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

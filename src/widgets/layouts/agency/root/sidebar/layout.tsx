import type { PropsWithChildren } from "react";

import {
	CustomSidebar,
	type ISidebarMenu,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

interface ISideBarAgencyLayoutProps extends PropsWithChildren {
	items: ISidebarMenu[];
}

export const SideBarAgencyLayout = ({
	children,
	items
}: ISideBarAgencyLayoutProps) => {
	return (
		<SidebarProvider>
			<CustomSidebar items={items} />
			<SidebarInset className="min-w-0">{children}</SidebarInset>
		</SidebarProvider>
	);
};

import type { PropsWithChildren } from "react";

import {
	CustomSidebar,
	type ISidebarMenu,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

interface ISideBarOperatorLayoutProps extends PropsWithChildren {
	items: ISidebarMenu[];
}

export const SideBarOperatorLayout = ({
	children,
	items
}: ISideBarOperatorLayoutProps) => {
	return (
		<SidebarProvider>
			<CustomSidebar items={items} />
			<SidebarInset className="min-w-0">{children}</SidebarInset>
		</SidebarProvider>
	);
};

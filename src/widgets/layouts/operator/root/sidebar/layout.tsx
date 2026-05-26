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
			<SidebarInset className="!w-[calc(100vw-var(--sidebar-width))]">
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
};

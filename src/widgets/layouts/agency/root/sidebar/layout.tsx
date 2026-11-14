import type { PropsWithChildren, ReactNode } from "react";

import {
	BreadcrumbLabelProvider,
	CustomBreadcrumb,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import { HeaderAgency } from "../../ui";

interface ISideBarAgencyLayoutProps extends PropsWithChildren {
	sidebar: ReactNode;
	breadcrumb?: ReactNode;
}

export const SideBarAgencyLayout = ({
	children,
	sidebar,
	breadcrumb = <CustomBreadcrumb />
}: ISideBarAgencyLayoutProps) => {
	return (
		<SidebarProvider>
			{sidebar}
			{/* bg-transparent — иначе bg-background SidebarInset закроет PageBackdrop */}
			<SidebarInset className="min-w-0 bg-transparent">
				<HeaderAgency withSidebarTrigger />
				<BreadcrumbLabelProvider>
					{breadcrumb}
					<div className="px-5 mt-6 mb-30 h-full">{children}</div>
				</BreadcrumbLabelProvider>
			</SidebarInset>
		</SidebarProvider>
	);
};

import type { PropsWithChildren, ReactNode } from "react";

import {
	BreadcrumbLabelProvider,
	CustomBreadcrumb,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import { HeaderOperator } from "../../ui";

interface ISideBarOperatorLayoutProps extends PropsWithChildren {
	sidebar: ReactNode;
	breadcrumb?: ReactNode;
}

export const SideBarOperatorLayout = ({
	children,
	sidebar,
	breadcrumb = <CustomBreadcrumb />
}: ISideBarOperatorLayoutProps) => {
	return (
		<SidebarProvider>
			{sidebar}
			<SidebarInset className="min-w-0">
				<HeaderOperator withSidebarTrigger />
				<BreadcrumbLabelProvider>
					{breadcrumb}
					<div className="px-5 mt-6 mb-30 h-full">{children}</div>
				</BreadcrumbLabelProvider>
			</SidebarInset>
		</SidebarProvider>
	);
};

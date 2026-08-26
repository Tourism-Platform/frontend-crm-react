import type { FC, PropsWithChildren } from "react";

import { cn } from "@/shared/lib";

import { BreadcrumbLabelProvider } from "../model";

import { CustomBreadcrumb } from "./custom-breadcrumb";

const stickyBarClassName = cn(
	"py-3 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10"
);

export const SidebarSectionChrome: FC<PropsWithChildren> = ({ children }) => (
	<BreadcrumbLabelProvider>
		<div className={stickyBarClassName}>
			<CustomBreadcrumb />
		</div>
		<div className={cn("px-5 mb-30 h-full")}>{children}</div>
	</BreadcrumbLabelProvider>
);

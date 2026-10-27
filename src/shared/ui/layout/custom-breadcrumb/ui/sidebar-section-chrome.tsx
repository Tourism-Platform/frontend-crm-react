import type { FC, PropsWithChildren } from "react";

import { cn } from "@/shared/lib";

import { BreadcrumbLabelProvider } from "../model";

import { CustomBreadcrumb } from "./custom-breadcrumb";

// Прозрачная полоса: поверх контента видны только сами pills
const stickyBarClassName = cn(
	"sticky top-16 z-10 flex shrink-0 items-center py-3 md:py-5"
);

export const SidebarSectionChrome: FC<PropsWithChildren> = ({ children }) => (
	<BreadcrumbLabelProvider>
		<div className={stickyBarClassName}>
			<CustomBreadcrumb />
		</div>
		<div className={cn("px-5 mb-30 h-full")}>{children}</div>
	</BreadcrumbLabelProvider>
);

import type { PropsWithChildren } from "react";

import { SidebarSectionChrome } from "@/shared/ui";

export const FinanceOperatorLayout = ({ children }: PropsWithChildren) => {
	return <SidebarSectionChrome>{children}</SidebarSectionChrome>;
};

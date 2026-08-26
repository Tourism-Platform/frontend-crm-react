import type { PropsWithChildren } from "react";

import { SidebarSectionChrome } from "@/shared/ui";

/** Unused by sections today; kept aligned with operator finance chrome. */
export const FinanceAgencyLayout = ({ children }: PropsWithChildren) => {
	return <SidebarSectionChrome>{children}</SidebarSectionChrome>;
};

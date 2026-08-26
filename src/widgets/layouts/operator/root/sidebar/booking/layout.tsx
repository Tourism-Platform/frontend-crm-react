import type { PropsWithChildren } from "react";

import { SidebarSectionChrome } from "@/shared/ui";

export const BookingOperatorLayout = ({ children }: PropsWithChildren) => {
	return <SidebarSectionChrome>{children}</SidebarSectionChrome>;
};

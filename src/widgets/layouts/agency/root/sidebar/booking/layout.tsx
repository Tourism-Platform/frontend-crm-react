import type { PropsWithChildren } from "react";

import { SidebarSectionChrome } from "@/shared/ui";

export const BookingAgencyLayout = ({ children }: PropsWithChildren) => {
	return <SidebarSectionChrome>{children}</SidebarSectionChrome>;
};

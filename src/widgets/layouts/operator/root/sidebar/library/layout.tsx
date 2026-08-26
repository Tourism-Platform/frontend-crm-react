import type { PropsWithChildren } from "react";

import { SidebarSectionChrome } from "@/shared/ui";

export const LibraryOperatorLayout = ({ children }: PropsWithChildren) => {
	return <SidebarSectionChrome>{children}</SidebarSectionChrome>;
};

import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib";
import { CustomBreadcrumb } from "@/shared/ui";

export const BookingOwnerLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div
				className={cn(
					"py-3 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-16 bg-background z-10"
				)}
			>
				<CustomBreadcrumb />
			</div>
			<div className={cn("px-5 mb-30 h-full")}>{children}</div>
		</>
	);
};

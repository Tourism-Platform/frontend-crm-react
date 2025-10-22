import { type PropsWithChildren } from "react";

import { CustomEventBreadcrumb } from "@/shared/ui";

export const EventOwnerLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="px-5 mb-30 h-full mt-5 flex flex-col gap-5">
			<CustomEventBreadcrumb />
			<div>{children}</div>
		</div>
	);
};

import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib";

export const SettingsAgencyLayout = ({ children }: PropsWithChildren) => {
	return <div className={cn("px-5 mb-30 h-full mt-6")}>{children}</div>;
};

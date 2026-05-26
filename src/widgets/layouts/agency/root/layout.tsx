import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

import { HeaderAgency } from "../ui";

export const MainAgencyLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<HeaderAgency />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
		</div>
	);
};

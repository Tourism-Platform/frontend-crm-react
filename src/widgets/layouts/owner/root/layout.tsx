import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

import { HeaderOwner } from "../ui";

export const MainOwnerLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<HeaderOwner />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
		</div>
	);
};

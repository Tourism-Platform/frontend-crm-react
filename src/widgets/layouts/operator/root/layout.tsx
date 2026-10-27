import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

export const MainOperatorLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<ErrorBoundary>{children}</ErrorBoundary>
		</div>
	);
};

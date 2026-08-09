import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

export const MainPublicLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
		</div>
	);
};

import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

import { HeaderOperator } from "../ui";

export const MainOperatorLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<HeaderOperator />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
		</div>
	);
};

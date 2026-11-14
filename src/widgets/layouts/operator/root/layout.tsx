import { type PropsWithChildren } from "react";

import { ErrorBoundary, PageBackdrop } from "@/shared/ui";

export const MainOperatorLayout = ({ children }: PropsWithChildren) => {
	return (
		// isolate — фон PageBackdrop (-z-10) ложится поверх bg-background, но под содержимое
		<div className="isolate bg-background text-foreground min-h-screen">
			<PageBackdrop />
			<ErrorBoundary>{children}</ErrorBoundary>
		</div>
	);
};

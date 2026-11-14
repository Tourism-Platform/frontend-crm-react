import { type PropsWithChildren } from "react";

import { ErrorBoundary, PageBackdrop } from "@/shared/ui";

export const MainPublicLayout = ({ children }: PropsWithChildren) => {
	return (
		// isolate — фон PageBackdrop (-z-10) ложится поверх bg-background, но под содержимое
		<div className="isolate bg-background text-foreground min-h-screen">
			<PageBackdrop />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
		</div>
	);
};

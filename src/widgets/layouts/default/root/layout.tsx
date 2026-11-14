import { type PropsWithChildren } from "react";

import { ErrorBoundary, PageBackdrop } from "@/shared/ui";

import { FooterDefault, HeaderDefault } from "../ui";

export const MainDefaultLayout = ({ children }: PropsWithChildren) => {
	return (
		// isolate — фон PageBackdrop (-z-10) ложится поверх bg-background, но под содержимое
		<div className="isolate bg-background text-foreground min-h-screen">
			<PageBackdrop />
			<HeaderDefault />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
			<FooterDefault />
		</div>
	);
};

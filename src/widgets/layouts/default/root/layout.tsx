import { type PropsWithChildren } from "react";

import { ErrorBoundary } from "@/shared/ui";

import { FooterDefault, HeaderDefault } from "../ui";

export const MainDefaultLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<HeaderDefault />
			<ErrorBoundary>
				<div>{children}</div>
			</ErrorBoundary>
			<FooterDefault />
		</div>
	);
};

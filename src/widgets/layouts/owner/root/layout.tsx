import { type PropsWithChildren } from "react";

import { HeaderOwner } from "../ui";

export const MainOwnerLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<HeaderOwner />
			<div>{children}</div>
		</div>
	);
};

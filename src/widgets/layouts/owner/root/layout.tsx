import { type PropsWithChildren, Suspense } from "react";

import { SuspenseLoader } from "@/shared/ui";

import { HeaderOwner } from "../ui";

export const MainOwnerLayout = ({ children }: PropsWithChildren) => {
	return (
		<Suspense fallback={<SuspenseLoader />}>
			<div className="bg-background text-foreground min-h-screen">
				<HeaderOwner />
				<div>{children}</div>
			</div>
		</Suspense>
	);
};

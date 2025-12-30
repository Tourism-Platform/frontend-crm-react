import { Suspense } from "react";

import { SuspenseLoader } from "@/shared/ui";

export const withSuspense = (Component: React.FC) => {
	return () => (
		<Suspense fallback={<SuspenseLoader />}>
			<Component />
		</Suspense>
	);
};

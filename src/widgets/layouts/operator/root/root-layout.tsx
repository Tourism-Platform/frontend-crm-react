import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { SuspenseLoader } from "@/shared/ui";

import { MainOperatorLayout } from "./layout";

export const RootOperatorLayout = () => {
	return (
		<MainOperatorLayout>
			<Suspense fallback={<SuspenseLoader />}>
				<Outlet />
			</Suspense>
			<ScrollRestoration />
		</MainOperatorLayout>
	);
};

import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { SuspenseLoader } from "@/shared/ui";

import { MainDefaultLayout } from "./layout";

export const RootDefaultLayout = () => {
	return (
		<MainDefaultLayout>
			<Suspense fallback={<SuspenseLoader />}>
				<Outlet />
			</Suspense>
			<ScrollRestoration />
		</MainDefaultLayout>
	);
};

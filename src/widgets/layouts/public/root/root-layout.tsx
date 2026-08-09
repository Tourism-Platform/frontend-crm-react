import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { SuspenseLoader } from "@/shared/ui";

import { MainPublicLayout } from "./layout";

export const RootPublicLayout = () => {
	return (
		<MainPublicLayout>
			<Suspense fallback={<SuspenseLoader />}>
				<Outlet />
			</Suspense>
			<ScrollRestoration />
		</MainPublicLayout>
	);
};

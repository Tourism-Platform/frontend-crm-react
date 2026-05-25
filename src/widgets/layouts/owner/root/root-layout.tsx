import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { SuspenseLoader } from "@/shared/ui";

import { MainOwnerLayout } from "./layout";

export const RootOwnerLayout = () => {
	return (
		<MainOwnerLayout>
			<Suspense fallback={<SuspenseLoader />}>
				<Outlet />
			</Suspense>
			<ScrollRestoration />
		</MainOwnerLayout>
	);
};

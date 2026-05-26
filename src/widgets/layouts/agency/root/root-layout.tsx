import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { SuspenseLoader } from "@/shared/ui";

import { MainAgencyLayout } from "./layout";

export const RootAgencyLayout = () => {
	return (
		<MainAgencyLayout>
			<Suspense fallback={<SuspenseLoader />}>
				<Outlet />
			</Suspense>
			<ScrollRestoration />
		</MainAgencyLayout>
	);
};

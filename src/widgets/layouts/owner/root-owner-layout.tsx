import { Outlet, ScrollRestoration } from "react-router-dom";

import { MainOwnerLayout } from "./main-owner-layout";

export const RootOwnerLayout = () => {
	return (
		<MainOwnerLayout>
			<Outlet />
			<ScrollRestoration />
		</MainOwnerLayout>
	);
};

import { Outlet, ScrollRestoration } from "react-router-dom";

import { MainOwnerLayout } from "./layout";

export const RootOwnerLayout = () => {
	return (
		<MainOwnerLayout>
			<Outlet />
			<ScrollRestoration />
		</MainOwnerLayout>
	);
};

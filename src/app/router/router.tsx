import { createBrowserRouter } from "react-router-dom";

import { ENUM_LAYOUT, ENUM_PATH } from "@/shared/config";

import { RootOwnerLayout } from "@/widgets/layouts";

import { ProtectedRoute } from "./protected-route";
import { ALL_APP_ROUTES_LIST } from "./router.config";

const ROOT_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
	(route) => route.layout === ENUM_LAYOUT.ROOT
).map((route) => ({
	path: route.path,
	element: <ProtectedRoute route={route} />
}));
const DEFAULT_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
	(route) => route.layout === ENUM_LAYOUT.DEFAULT
).map((route) => ({
	path: route.path,
	element: <ProtectedRoute route={route} />
}));

export const router = createBrowserRouter(
	[
		{
			path: ENUM_PATH.MAIN,
			element: <RootOwnerLayout />,
			children: ROOT_ROUTES_LIST
		},
		{
			path: ENUM_PATH.MAIN,
			children: DEFAULT_ROUTES_LIST
		}
	],
	{
		future: {
			v7_relativeSplatPath: true
		}
	}
);

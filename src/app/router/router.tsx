import { createBrowserRouter } from "react-router-dom";

import { ENUM_LAYOUT } from "@/shared/config";

import {
	RootAgencyLayout,
	RootDefaultLayout,
	RootOperatorLayout
} from "@/widgets/layouts";

import { ProtectedRoute } from "./protected-route";
import { ALL_APP_ROUTES_LIST } from "./router.config";

const ROOT_OPERATOR_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
	(route) => route.layout === ENUM_LAYOUT.ROOT_OPERATOR
).map((route) => ({
	path: route.path,
	element: <ProtectedRoute route={route} />
}));
const ROOT_AGENCY_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
	(route) => route.layout === ENUM_LAYOUT.ROOT_AGENCY
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
const PUBLIC_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
	(route) => route.layout === null
).map((route) => ({
	path: route.path,
	element: <ProtectedRoute route={route} />
}));

export const router = createBrowserRouter(
	[
		{
			children: PUBLIC_ROUTES_LIST
		},
		{
			element: <RootOperatorLayout />,
			children: ROOT_OPERATOR_ROUTES_LIST
		},
		{
			element: <RootAgencyLayout />,
			children: ROOT_AGENCY_ROUTES_LIST
		},
		{
			element: <RootDefaultLayout />,
			children: DEFAULT_ROUTES_LIST
		}
	],
	{
		future: {
			v7_relativeSplatPath: true
		}
	}
);

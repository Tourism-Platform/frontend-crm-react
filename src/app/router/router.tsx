import { createBrowserRouter } from "react-router-dom";

import { ENUM_LAYOUT } from "@/shared/config";

import {
	RootAgencyLayout,
	RootDefaultLayout,
	RootOperatorLayout,
	RootPublicLayout
} from "@/widgets/layouts";

import { buildLayoutRoutes } from "./build-nested-routes";
import { ALL_APP_ROUTES_LIST } from "./router.config";

export const router = createBrowserRouter(
	[
		{
			element: <RootPublicLayout />,
			children: buildLayoutRoutes(
				ALL_APP_ROUTES_LIST,
				ENUM_LAYOUT.ROOT_PUBLIC
			)
		},
		{
			element: <RootOperatorLayout />,
			children: buildLayoutRoutes(
				ALL_APP_ROUTES_LIST,
				ENUM_LAYOUT.ROOT_OPERATOR
			)
		},
		{
			element: <RootAgencyLayout />,
			children: buildLayoutRoutes(
				ALL_APP_ROUTES_LIST,
				ENUM_LAYOUT.ROOT_AGENCY
			)
		},
		{
			element: <RootDefaultLayout />,
			children: buildLayoutRoutes(
				ALL_APP_ROUTES_LIST,
				ENUM_LAYOUT.DEFAULT
			)
		}
	],
	{
		future: {
			v7_relativeSplatPath: true
		}
	}
);

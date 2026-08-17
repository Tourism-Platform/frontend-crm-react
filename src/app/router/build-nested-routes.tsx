import type { ComponentType } from "react";
import type { RouteObject } from "react-router-dom";

import {
	type ENUM_LAYOUT_TYPE,
	type IRouting,
	SECTION_BASE_PATHS,
	type TRouteSection
} from "@/shared/config";

import {
	BookingAgencySectionLayout,
	SettingsAgencySectionLayout
} from "@/widgets/layouts/agency/sections";
import {
	BookingSectionLayout,
	FinanceSectionLayout,
	LibrarySectionLayout,
	SettingsSectionLayout,
	TourDetailSectionLayout,
	TourEventsSectionLayout
} from "@/widgets/layouts/operator/sections";

import { ProtectedRoute } from "./protected-route";

const SECTION_LAYOUTS: Record<TRouteSection, ComponentType> = {
	"tour-detail": TourDetailSectionLayout,
	"tour-events": TourEventsSectionLayout,
	finance: FinanceSectionLayout,
	"booking-operator": BookingSectionLayout,
	"settings-operator": SettingsSectionLayout,
	library: LibrarySectionLayout,
	"booking-agency": BookingAgencySectionLayout,
	"settings-agency": SettingsAgencySectionLayout
};

export const getRelativeRoutePath = (
	absolutePath: string,
	sectionBase: string
): string => {
	const absParts = absolutePath.split("/").filter(Boolean);
	const baseParts = sectionBase.split("/").filter(Boolean);

	if (absParts.length < baseParts.length) {
		throw new Error(
			`Route path "${absolutePath}" is shorter than section base "${sectionBase}"`
		);
	}

	for (let i = 0; i < baseParts.length; i += 1) {
		const baseSeg = baseParts[i];
		const absSeg = absParts[i];

		if (baseSeg.startsWith(":")) {
			continue;
		}

		if (baseSeg !== absSeg) {
			throw new Error(
				`Route path "${absolutePath}" does not match section base "${sectionBase}"`
			);
		}
	}

	return absParts.slice(baseParts.length).join("/");
};

export const buildLayoutRoutes = (
	routes: IRouting[],
	layout: ENUM_LAYOUT_TYPE
): RouteObject[] => {
	const filtered = routes.filter((route) => route.layout === layout);
	const sectionGroups = new Map<TRouteSection, IRouting[]>();
	const flatRoutes: IRouting[] = [];

	for (const route of filtered) {
		if (route.section) {
			const group = sectionGroups.get(route.section) ?? [];
			group.push(route);
			sectionGroups.set(route.section, group);
		} else {
			flatRoutes.push(route);
		}
	}

	const result: RouteObject[] = flatRoutes.map((route) => ({
		path: route.path,
		element: <ProtectedRoute route={route} />
	}));

	for (const [section, sectionRoutes] of sectionGroups) {
		const basePath = SECTION_BASE_PATHS[section];
		const SectionLayout = SECTION_LAYOUTS[section];

		result.push({
			path: basePath,
			element: <SectionLayout />,
			children: sectionRoutes.map((route) => ({
				path: getRelativeRoutePath(route.path, basePath),
				element: <ProtectedRoute route={route} />
			}))
		});
	}

	return result;
};

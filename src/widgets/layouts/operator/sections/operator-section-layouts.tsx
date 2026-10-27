import { Outlet } from "react-router-dom";

import {
	FINANCE_SIDEBAR_LIST,
	LIBRARY_SIDEBAR_LIST,
	OPERATOR_BOOKING_SIDEBAR_LIST,
	OPERATOR_SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";
import { useSectionI18nPreload } from "@/shared/hooks";
import { CustomEventBreadcrumb, CustomSidebar } from "@/shared/ui";

import { SideBarOperatorLayout } from "../root/sidebar/layout";
import { LibraryEventNavSidebar } from "../root/sidebar/library/events/ui";
import { EventNavSidebar } from "../root/sidebar/tours/tour/events/ui";

export const TourDetailSectionLayout = () => {
	useSectionI18nPreload("tour-detail");

	return (
		<SideBarOperatorLayout
			sidebar={<CustomSidebar items={TOURS_SIDEBAR_LIST} />}
		>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

export const TourEventsSectionLayout = () => {
	useSectionI18nPreload("tour-events");

	return (
		<SideBarOperatorLayout
			sidebar={<EventNavSidebar />}
			breadcrumb={<CustomEventBreadcrumb />}
		>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

export const FinanceSectionLayout = () => {
	useSectionI18nPreload("finance");

	return (
		<SideBarOperatorLayout
			sidebar={<CustomSidebar items={FINANCE_SIDEBAR_LIST} />}
		>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

export const BookingSectionLayout = () => {
	useSectionI18nPreload("booking-operator");

	return (
		<SideBarOperatorLayout
			sidebar={<CustomSidebar items={OPERATOR_BOOKING_SIDEBAR_LIST} />}
		>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

export const SettingsSectionLayout = () => (
	<SideBarOperatorLayout
		sidebar={<CustomSidebar items={OPERATOR_SETTINGS_SIDEBAR_LIST} />}
	>
		<Outlet />
	</SideBarOperatorLayout>
);

export const LibrarySectionLayout = () => {
	useSectionI18nPreload("library");

	return (
		<SideBarOperatorLayout
			sidebar={<CustomSidebar items={LIBRARY_SIDEBAR_LIST} />}
		>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

export const LibraryEventsSectionLayout = () => {
	useSectionI18nPreload("library-events");

	return (
		<SideBarOperatorLayout sidebar={<LibraryEventNavSidebar />}>
			<Outlet />
		</SideBarOperatorLayout>
	);
};

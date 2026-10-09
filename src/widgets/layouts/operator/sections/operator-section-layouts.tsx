import { Outlet } from "react-router-dom";

import {
	FINANCE_SIDEBAR_LIST,
	LIBRARY_SIDEBAR_LIST,
	OPERATOR_BOOKING_SIDEBAR_LIST,
	OPERATOR_SETTINGS_SIDEBAR_LIST,
	TOURS_SIDEBAR_LIST
} from "@/shared/config";
import { useSectionI18nPreload } from "@/shared/hooks";
import { SidebarInset, SidebarProvider } from "@/shared/ui";

import { BookingOperatorLayout } from "../root/sidebar/booking/layout";
import { FinanceOperatorLayout } from "../root/sidebar/finance/layout";
import { SideBarOperatorLayout } from "../root/sidebar/layout";
import { LibraryEventNavSidebar } from "../root/sidebar/library/events/ui";
import { LibraryOperatorLayout } from "../root/sidebar/library/layout";
import { SettingsOperatorLayout } from "../root/sidebar/settings/layout";
import { EventOperatorLayout } from "../root/sidebar/tours/tour/events/layout";
import { EventNavSidebar } from "../root/sidebar/tours/tour/events/ui";
import { TourOperatorLayout } from "../root/sidebar/tours/tour/layout";

export const TourDetailSectionLayout = () => {
	useSectionI18nPreload("tour-detail");

	return (
		<SideBarOperatorLayout items={TOURS_SIDEBAR_LIST}>
			<TourOperatorLayout>
				<Outlet />
			</TourOperatorLayout>
		</SideBarOperatorLayout>
	);
};

export const TourEventsSectionLayout = () => {
	useSectionI18nPreload("tour-events");

	return (
		<SidebarProvider>
			<EventNavSidebar />
			<SidebarInset className="min-w-0">
				<EventOperatorLayout>
					<Outlet />
				</EventOperatorLayout>
			</SidebarInset>
		</SidebarProvider>
	);
};

export const FinanceSectionLayout = () => {
	useSectionI18nPreload("finance");

	return (
		<SideBarOperatorLayout items={FINANCE_SIDEBAR_LIST}>
			<FinanceOperatorLayout>
				<Outlet />
			</FinanceOperatorLayout>
		</SideBarOperatorLayout>
	);
};

export const BookingSectionLayout = () => {
	useSectionI18nPreload("booking-operator");

	return (
		<SideBarOperatorLayout items={OPERATOR_BOOKING_SIDEBAR_LIST}>
			<BookingOperatorLayout>
				<Outlet />
			</BookingOperatorLayout>
		</SideBarOperatorLayout>
	);
};

export const SettingsSectionLayout = () => (
	<SideBarOperatorLayout items={OPERATOR_SETTINGS_SIDEBAR_LIST}>
		<SettingsOperatorLayout>
			<Outlet />
		</SettingsOperatorLayout>
	</SideBarOperatorLayout>
);

export const LibrarySectionLayout = () => {
	useSectionI18nPreload("library");

	return (
		<SideBarOperatorLayout items={LIBRARY_SIDEBAR_LIST}>
			<LibraryOperatorLayout>
				<Outlet />
			</LibraryOperatorLayout>
		</SideBarOperatorLayout>
	);
};

export const LibraryEventsSectionLayout = () => {
	useSectionI18nPreload("library-events");

	return (
		<SidebarProvider>
			<LibraryEventNavSidebar />
			<SidebarInset className="min-w-0">
				<LibraryOperatorLayout>
					<Outlet />
				</LibraryOperatorLayout>
			</SidebarInset>
		</SidebarProvider>
	);
};

export { SettingsOperatorLayout };

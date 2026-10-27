import { Outlet } from "react-router-dom";

import {
	AGENCY_BOOKING_SIDEBAR_LIST,
	AGENCY_SETTINGS_SIDEBAR_LIST
} from "@/shared/config";
import { useSectionI18nPreload } from "@/shared/hooks";
import { CustomSidebar } from "@/shared/ui";

import { SideBarAgencyLayout } from "../root/sidebar/layout";

export const BookingAgencySectionLayout = () => {
	useSectionI18nPreload("booking-agency");

	return (
		<SideBarAgencyLayout
			sidebar={<CustomSidebar items={AGENCY_BOOKING_SIDEBAR_LIST} />}
		>
			<Outlet />
		</SideBarAgencyLayout>
	);
};

export const SettingsAgencySectionLayout = () => (
	<SideBarAgencyLayout
		sidebar={<CustomSidebar items={AGENCY_SETTINGS_SIDEBAR_LIST} />}
	>
		<Outlet />
	</SideBarAgencyLayout>
);

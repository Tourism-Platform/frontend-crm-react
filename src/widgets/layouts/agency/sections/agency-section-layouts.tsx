import { Outlet } from "react-router-dom";

import {
	AGENCY_BOOKING_SIDEBAR_LIST,
	AGENCY_SETTINGS_SIDEBAR_LIST
} from "@/shared/config";
import { useSectionI18nPreload } from "@/shared/hooks";

import { BookingAgencyLayout } from "../root/sidebar/booking/layout";
import { SideBarAgencyLayout } from "../root/sidebar/layout";
import { SettingsAgencyLayout } from "../root/sidebar/settings/layout";

export const BookingAgencySectionLayout = () => {
	useSectionI18nPreload("booking-agency");

	return (
		<SideBarAgencyLayout items={AGENCY_BOOKING_SIDEBAR_LIST}>
			<BookingAgencyLayout>
				<Outlet />
			</BookingAgencyLayout>
		</SideBarAgencyLayout>
	);
};

export const SettingsAgencySectionLayout = () => (
	<SideBarAgencyLayout items={AGENCY_SETTINGS_SIDEBAR_LIST}>
		<SettingsAgencyLayout>
			<Outlet />
		</SettingsAgencyLayout>
	</SideBarAgencyLayout>
);

export { SettingsAgencyLayout };

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, SmartTable } from "@/shared/ui";

import { useGetStaffQuery } from "@/entities/staff";

import { InviteStaff } from "@/features/settings";

import { COLUMNS } from "../model";

export const StaffInformation: FC = () => {
	const { t } = useTranslation("staff_information_page");
	const { data: users = [] } = useGetStaffQuery();

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						data={users}
						columns={COLUMNS()}
						actions={<InviteStaff />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

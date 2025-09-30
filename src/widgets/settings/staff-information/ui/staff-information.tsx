import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomTable } from "@/shared/ui";

import { COLUMNS, USERS } from "../model";

export const StaffInformation: FC = () => {
	const { t } = useTranslation("staff_information_page");
	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable data={USERS} columns={COLUMNS()} />
				</CardContent>
			</Card>
		</section>
	);
};

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { MANAGERS_MOCK } from "@/shared/config";
import { Card, CardContent } from "@/shared/ui";

import { ManagerCard } from "@/entities/tour";

export const Managers: FC = () => {
	const { t } = useTranslation("tour_page");
	return (
		<Card>
			<CardContent className="grid gap-3">
				<h3 className="text-xl">{t("managers.title")}</h3>
				<div className="grid gap-2">
					{MANAGERS_MOCK.map((manager) => (
						<ManagerCard key={manager?.email} card={manager} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

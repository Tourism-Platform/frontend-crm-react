import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";

import { ChangePassword } from "@/features/settings";

export const SecurityPage: FC = () => {
	const { t } = useTranslation("security_page");
	return (
		<section className="flex gap-5 flex-col">
			<h1 className="md:text-3xl text-2xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-5 flex-col">
					<p className="text-xl">{t("title")}</p>
					<div>
						<ChangePassword />
					</div>
				</CardContent>
			</Card>
		</section>
	);
};

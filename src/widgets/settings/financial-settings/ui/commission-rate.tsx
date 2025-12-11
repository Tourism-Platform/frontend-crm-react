import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomInput, Separator } from "@/shared/ui";

export const CommissionRate: FC = () => {
	const { t } = useTranslation("financial_settings_page");
	return (
		<div className="flex gap-8 flex-col">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl">
						{t("commission_rate.agent.title")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("commission_rate.agent.description")}
					</p>
				</div>
				<CustomInput
					label={t("commission_rate.agent.rate")}
					disabled
					defaultValue={5}
				/>
			</div>
			<Separator />
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl">
						{t("commission_rate.tour.title")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("commission_rate.tour.description")}
					</p>
				</div>
				<CustomInput
					label={t("commission_rate.tour.rate")}
					disabled
					defaultValue={5}
				/>
			</div>
		</div>
	);
};

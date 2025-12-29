import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { FinanceSettingsForm } from "./finance-settings-form";

export const FinanceSettings: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const handleSave = () => {
		// TODO: Implement save logic
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl">{t("finance.title")}</h2>
			<FinanceSettingsForm />
			<div className="flex justify-end mt-6">
				<Button onClick={handleSave}>
					{t("finance.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

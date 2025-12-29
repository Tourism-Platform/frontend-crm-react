import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { GeneralForm } from "./general-form";

export const General: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const handleSave = () => {
		// TODO: Implement save logic
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl">{t("general.title")}</h2>
			<GeneralForm />
			<div className="flex justify-end mt-6">
				<Button onClick={handleSave}>
					{t("general.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

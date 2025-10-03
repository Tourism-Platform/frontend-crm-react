import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Switch } from "@/shared/ui";

interface ISwitcherProps {
	checked: boolean;
	toggleSwitch: () => void;
}

export const Switcher: FC<ISwitcherProps> = ({ checked, toggleSwitch }) => {
	const { t } = useTranslation("tour_schedule_page");
	return (
		<div
			className="group inline-flex items-center gap-2"
			data-state={checked ? "checked" : "unchecked"}
		>
			<Switch checked={checked} onCheckedChange={toggleSwitch} />
			<span className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 text-left text-sm font-medium">
				{t("switcher")}
			</span>
		</div>
	);
};

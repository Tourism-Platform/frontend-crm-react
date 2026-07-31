import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { SheetInfoCard } from "./sheet-info-card";

interface IOptionEventSheetInfoTimeProps {
	startTime: string;
	endTime: string;
}

export const OptionEventSheetInfoTime: FC<IOptionEventSheetInfoTimeProps> = ({
	startTime,
	endTime
}) => {
	const { t } = useTranslation("preview_option_page");

	if (!startTime && !endTime) {
		return null;
	}

	return (
		<div>
			<h4 className="font-semibold mb-3">{t("sheet.info_time")}</h4>
			<SheetInfoCard>
				<div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
					<div>
						<span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
							{t("sheet.start_time")}
						</span>
						<p className="font-medium mt-1">{startTime || "—"}</p>
					</div>
					<span className="text-xs text-primary pb-0.5">
						{t("sheet.to")}
					</span>
					<div className="text-right">
						<span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
							{t("sheet.end_time")}
						</span>
						<p className="font-medium mt-1">{endTime || "—"}</p>
					</div>
				</div>
			</SheetInfoCard>
		</div>
	);
};

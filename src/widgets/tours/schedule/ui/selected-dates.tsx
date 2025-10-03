import { XIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

interface ISelectedDatesProps {
	date: Date[] | undefined;
	onDelete: (date: Date) => void;
}

export const SelectedDates: FC<ISelectedDatesProps> = ({ date, onDelete }) => {
	const { t } = useTranslation("tour_schedule_page");
	return (
		<div className="grid gap-2">
			<h2>{t("selected_dates.title")}</h2>
			<div className="flex gap-2">
				{date?.map((item, index) => (
					<Badge
						className="p-2 rounded-md text-base flex gap-2"
						key={index}
					>
						<p>{item.toLocaleDateString()}</p>
						<button
							onClick={() => onDelete(item)}
							className="cursor-pointer"
						>
							<XIcon />
						</button>
					</Badge>
				))}
			</div>
		</div>
	);
};

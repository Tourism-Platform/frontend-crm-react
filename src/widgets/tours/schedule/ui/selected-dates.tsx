import { XIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge, withErrorBoundary } from "@/shared/ui";

import type { IFixedDate } from "@/entities/tour";
import { useRemoveFixedDateMutation } from "@/entities/tour";

interface ISelectedDatesProps {
	tourId: string;
	fixedDates: IFixedDate[];
}

const SelectedDatesBase: FC<ISelectedDatesProps> = ({ tourId, fixedDates }) => {
	const { t } = useTranslation("tour_schedule_page");
	const [removeFixedDate] = useRemoveFixedDateMutation();

	return (
		<div className="grid gap-2">
			<h2>{t("selected_dates.title")}</h2>
			<div className="flex flex-wrap gap-2">
				{fixedDates?.map((item) => (
					<Badge className="p-2 text-base flex gap-2" key={item.id}>
						<p>{item.value.toLocaleDateString()}</p>
						<button
							onClick={() =>
								removeFixedDate({ tourId, dateId: item.id })
							}
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

export const SelectedDates = withErrorBoundary(SelectedDatesBase);

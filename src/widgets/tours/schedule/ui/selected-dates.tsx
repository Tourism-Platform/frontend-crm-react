import { XIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, withErrorBoundary } from "@/shared/ui";

import type { IExcludedDate, IFixedDate } from "@/entities/tour";

type TSelectedDatesVariant = "fixed" | "recurring";

interface ISelectedDatesProps {
	variant: TSelectedDatesVariant;
	fixedDates?: IFixedDate[];
	excludedDates?: IExcludedDate[];
	onRemove: (id: string) => void;
}

const SelectedDatesBase: FC<ISelectedDatesProps> = ({
	variant,
	fixedDates = [],
	excludedDates = [],
	onRemove
}) => {
	const { t } = useTranslation("tour_schedule_page");

	const isRecurring = variant === "recurring";
	const title = isRecurring
		? t("removed_days.title")
		: t("selected_dates.title");
	const items = isRecurring
		? excludedDates.map((item) => ({
				id: item.id,
				value: item.value
			}))
		: fixedDates.map((item) => ({
				id: item.id,
				value: item.value
			}));

	return (
		<div className="grid gap-2">
			<h2>{title}</h2>
			<div className="flex flex-wrap gap-2">
				{items.map((item) => (
					<Badge
						className={cn("p-2 text-base flex gap-2")}
						key={item.id}
						variant={isRecurring ? "destructive" : "default"}
					>
						<p>{item.value.toLocaleDateString()}</p>
						<button
							type="button"
							onClick={() => onRemove(item.id)}
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

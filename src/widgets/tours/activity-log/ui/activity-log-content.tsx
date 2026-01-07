import { CircleCheckBig } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import type { IActivityLogItem } from "@/entities/tour";

interface IActivityLogContentProps {
	items: IActivityLogItem[];
}

export const ActivityLogContent: FC<IActivityLogContentProps> = ({ items }) => {
	const { t } = useTranslation("tour_activity_log_page");

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl">{t("content.title")}</h2>
				<Button variant="outline">{t("actions.export")}</Button>
			</div>

			<div className="flex flex-col">
				{items.map((item, index) => (
					<div
						key={item.id}
						className="flex gap-4 relative pb-6 last:pb-0"
					>
						{/* Line */}
						{index !== items.length - 1 && (
							<div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-border" />
						)}

						{/* Icon */}
						<div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-500 dark:bg-blue-900/20 dark:border-blue-900/30">
							<CircleCheckBig className="w-3 h-3" />
						</div>

						{/* Content */}
						<div className="flex flex-1 justify-between items-start gap-4">
							<p className="text-sm">
								{item.title}{" "}
								<span className="text-muted-foreground">
									by {item.user}
								</span>
							</p>
							<span className="text-sm text-muted-foreground whitespace-nowrap">
								{item.date}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

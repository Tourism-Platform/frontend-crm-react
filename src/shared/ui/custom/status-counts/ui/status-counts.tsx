import { type ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { type TOptionsKeys } from "@/shared/config";
import { Badge, type BadgeVariant } from "@/shared/ui/shadcn-ui";

interface IStatusCountsProps<T extends string> {
	statuses: readonly T[];
	labels: Record<T, TOptionsKeys>;
	variants: Record<T, BadgeVariant>;
	counts?: Partial<Record<T, number>>;
}

/** Бейджи статусов с количеством внутри, над таблицей */
export const StatusCounts = <T extends string>({
	statuses,
	labels,
	variants,
	counts
}: IStatusCountsProps<T>): ReactElement => {
	const { t, i18n } = useTranslation("options");

	return (
		<ul className="flex flex-wrap gap-2">
			{statuses.map((status) => (
				<li key={status}>
					<Badge
						size="lg"
						variant={variants[status]}
						className="gap-2 rounded-md pr-1.5 font-medium"
					>
						{t(labels[status])}
						<span className="min-w-7 rounded-sm bg-background/80 px-1.5 py-0.5 text-center text-sm font-semibold tabular-nums text-foreground">
							{(counts?.[status] ?? 0).toLocaleString(
								i18n.language
							)}
						</span>
					</Badge>
				</li>
			))}
		</ul>
	);
};

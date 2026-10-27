import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { LeafIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib";

type TEmptyStateProps = {
	title?: string;
	description?: string;
	className?: string;
};

/** Пустой результат — та же высота, что у LoadingState / ErrorState */
export const EmptyState: FC<TEmptyStateProps> = ({
	title,
	description,
	className
}) => {
	const { t } = useTranslation("common");

	return (
		<div
			className={cn(
				"flex min-h-[260px] flex-1 flex-col items-center justify-center p-8 text-center",
				className
			)}
		>
			<div className="flex items-center justify-center w-12 h-12 rounded-full mb-4">
				<LeafIcon className="w-10 h-10" />
			</div>
			<h3 className="text-lg font-semibold text-foreground mb-1">
				{title ?? t("empty_state.title")}
			</h3>
			<p className="text-sm text-muted-foreground max-w-[300px]">
				{description ?? t("empty_state.description")}
			</p>
		</div>
	);
};

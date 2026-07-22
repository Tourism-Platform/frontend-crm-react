import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { LeafIcon } from "@/shared/assets/icons";

type TEmptyStateProps = {
	title?: string;
	description?: string;
};

export const EmptyState: FC<TEmptyStateProps> = ({ title, description }) => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col items-center justify-center h-[260px] text-center p-8">
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

import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { PlatformsLoader } from "@/shared/ui/platforms-loader";

type TLoadingStateProps = {
	className?: string;
};

/** Блок загрузки данных — та же высота, что у EmptyState / ErrorState */
export const LoadingState: FC<TLoadingStateProps> = ({ className }) => {
	const { t } = useTranslation("common");

	return (
		<div
			role="status"
			className={cn(
				"flex min-h-[260px] flex-1 items-center justify-center p-8",
				className
			)}
		>
			<PlatformsLoader />
			<span className="sr-only">{t("loading_state.label")}</span>
		</div>
	);
};

import { RotateCcwIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { ErrorCloudIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/shadcn-ui/button";

type TErrorStateProps = {
	title?: string;
	description?: string;
	/** Повторить запрос — обычно `refetch` из RTK Query */
	onRetry?: () => void;
	className?: string;
};

/** Блок ошибки загрузки: страница деталей, карточка, список */
export const ErrorState: FC<TErrorStateProps> = ({
	title,
	description,
	onRetry,
	className
}) => {
	const { t } = useTranslation("common");

	return (
		<div
			role="alert"
			className={cn(
				"flex min-h-[260px] flex-col items-center justify-center p-8 text-center",
				className
			)}
		>
			<div className="mb-4 flex size-12 items-center justify-center rounded-full">
				<ErrorCloudIcon className="size-10" />
			</div>
			<h3 className="mb-1 text-lg font-semibold text-foreground">
				{title ?? t("error_state.title")}
			</h3>
			<p className="max-w-[300px] text-sm text-muted-foreground">
				{description ?? t("error_state.description")}
			</p>
			{onRetry ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="mt-4"
					onClick={onRetry}
				>
					<RotateCcwIcon aria-hidden="true" />
					{t("actions.retry")}
				</Button>
			) : null}
		</div>
	);
};

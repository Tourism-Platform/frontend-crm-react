import type { ComponentProps, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { DotsRing } from "@/shared/ui/shadcn-ui/dots-ring";

import { EmptyState } from "../../empty-state";
import { ErrorState } from "../../error-state";
import { LoadingState } from "../../loading-state";

interface IDataStateProps<T> {
	data: T | undefined | null;
	isLoading: boolean;
	isError?: boolean;
	/** page — лоадер TourLink на всю высоту страницы, inline — спиннер как в LoaderButton */
	variant?: "page" | "inline";
	/** Пусто, хотя данные пришли: по умолчанию — пустой массив */
	isEmpty?: (data: T) => boolean;
	loading?: { className?: string };
	error?: ComponentProps<typeof ErrorState>;
	empty?: ComponentProps<typeof EmptyState>;
	children: (data: T) => ReactNode;
}

const isEmptyArray = (data: unknown) =>
	Array.isArray(data) && data.length === 0;

/**
 * Порядок один везде: загрузка → ошибка → пусто → данные.
 * Загрузка первой: пока data ещё нет, `isError={isError || !data}` не мигает ошибкой
 */
export const DataState = <T,>({
	data,
	isLoading,
	isError,
	variant = "inline",
	isEmpty = isEmptyArray,
	loading,
	error,
	empty,
	children
}: IDataStateProps<T>) => {
	const { t } = useTranslation("common");

	if (isLoading) {
		return variant === "page" ? (
			<LoadingState {...loading} />
		) : (
			<div className={cn("flex justify-center py-6", loading?.className)}>
				<DotsRing
					aria-label={t("loading_state.label")}
					className="!h-[20px] !w-[20px] text-primary"
				/>
			</div>
		);
	}

	if (isError) return <ErrorState {...error} />;

	if (data == null || isEmpty(data)) return <EmptyState {...empty} />;

	return <>{children(data)}</>;
};

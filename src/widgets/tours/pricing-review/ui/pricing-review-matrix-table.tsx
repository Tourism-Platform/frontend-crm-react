import { type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { isNoFxRateError } from "@/shared/api";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { useGetPriceMatrixQuery } from "@/entities/tour";

import {
	PRICING_REVIEW_MATRIX_COLUMNS,
	PRICING_REVIEW_TABLE_LAYOUT
} from "../model";

interface IPricingReviewMatrixTableProps {
	tourId: string;
	optionId: string;
}

const PricingReviewMatrixTableBase: FC<IPricingReviewMatrixTableProps> = ({
	tourId,
	optionId
}) => {
	const { t } = useTranslation("tour_pricing_review_page");

	const {
		data: matrix,
		error,
		isLoading,
		isFetching,
		isRealError
	} = useOptionalResourceQuery(
		useGetPriceMatrixQuery(
			{ tourId, optionId },
			{ skip: !tourId || !optionId }
		)
	);
	const rows = useMemo(() => matrix?.rows ?? [], [matrix]);

	useEffect(() => {
		if (isRealError) {
			// 422 — нет курса ЦБ для одной из валют цен тура
			toast.error(
				isNoFxRateError(error)
					? t("errors.no_fx_rate.description")
					: t("toasts.matrix_load.error")
			);
		}
	}, [isRealError, error, t]);

	const columns = useMemo(() => PRICING_REVIEW_MATRIX_COLUMNS(t), [t]);

	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: 0,
			pageSize: Math.max(rows.length, 10)
		}),
		[rows.length]
	);

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={rows}
					columns={columns}
					isLoading={isLoading || isFetching}
					loadingMode="skeleton"
					tableLayout={PRICING_REVIEW_TABLE_LAYOUT}
					showTopFilters={false}
					showPagination={false}
					pagination={pagination}
				/>
			</CardContent>
		</Card>
	);
};

export const PricingReviewMatrixTable = withErrorBoundary(
	PricingReviewMatrixTableBase
);

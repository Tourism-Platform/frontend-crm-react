import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";
import { withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { useGetOperatorCurrencyRatesQuery } from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";

import { OPERATOR_CURRENCY_RATE_COLUMNS } from "../../model";

const CurrencyBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");

	const { watch, setValue } = useForm<IPaginationRequest>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.OPERATOR_FX_RATES
		}
	});

	const filters = watch();

	const {
		data: currencyRates,
		isLoading,
		isFetching
	} = useGetOperatorCurrencyRatesQuery(filters);

	const currencyRatesData = useMemo(
		() => currencyRates?.data ?? [],
		[currencyRates]
	);
	const totalCount = currencyRates?.total ?? 0;

	const columns = useMemo(() => OPERATOR_CURRENCY_RATE_COLUMNS(t), [t]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const currentPagination = {
				pageIndex: filters.page - 1,
				pageSize: filters.limit
			};

			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(currentPagination)
					: updaterOrValue;

			setValue("page", nextValue.pageIndex + 1);
			setValue("limit", nextValue.pageSize);
		},
		[filters.page, filters.limit, setValue]
	);

	const actionsJsx = useMemo(() => <NewCurrencyRate />, []);

	const topChildrenJsx = useMemo(
		() => (
			<div className="flex flex-col gap-2">
				<h2 className="text-xl">{t("currency.currency_rate.title")}</h2>
				<p className="text-sm text-muted-foreground">
					{t("currency.currency_rate.description")}
				</p>
			</div>
		),
		[t]
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex gap-5 flex-col">
				<SmartTable
					data={currencyRatesData}
					recordCount={totalCount}
					columns={columns}
					actions={actionsJsx}
					pagination={paginationObj}
					onPaginationChange={handlePaginationChange}
					showTopFilters={false}
					isLoading={isLoading || isFetching}
					topChildren={topChildrenJsx}
				/>
			</div>
		</div>
	);
};

export const Currency = withErrorBoundary(CurrencyBase);

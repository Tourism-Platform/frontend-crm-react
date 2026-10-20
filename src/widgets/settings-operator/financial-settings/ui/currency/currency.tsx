import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	ENUM_OPERATOR_CURRENCY_RATE_FILTER,
	type IOperatorCurrencyRateFilters,
	useGetOperatorCurrencyRatesQuery
} from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";

import {
	CURRENCY_RATE_FILTERS_LIST,
	OPERATOR_CURRENCY_RATE_COLUMNS
} from "../../model";

const CurrencyBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");

	const form = useForm<IOperatorCurrencyRateFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.OPERATOR_FX_RATES
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { fromCurrency, toCurrency } = filters;

	// Новый фильтр — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [fromCurrency, toCurrency, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_OPERATOR_CURRENCY_RATE_FILTER.FROM_CURRENCY, undefined);
		setValue(ENUM_OPERATOR_CURRENCY_RATE_FILTER.TO_CURRENCY, undefined);
	}, [setValue]);

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
				<Form {...form}>
					<div className="flex flex-wrap items-end gap-4">
						{CURRENCY_RATE_FILTERS_LIST.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={control}
								name={key}
								t={t}
								className="w-48"
								{...item}
							/>
						))}
						<Button
							type="button"
							variant="outline"
							className="mb-5"
							onClick={handleResetFilters}
						>
							{t("currency.filters.reset")}
						</Button>
					</div>
				</Form>
			</div>
		),
		[t, form, control, handleResetFilters]
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

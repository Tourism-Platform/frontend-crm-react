import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_LEDGER_FILTER,
	type ILedgerFilters,
	LEDGER_ENTRY_TYPE_LABELS,
	LEDGER_FLOW_LABELS,
	LEDGER_SOURCE_LABELS,
	useGetLedgerEntriesQuery
} from "@/entities/finance";

import { ENTRIES_COLUMNS, LEDGER_FILTERS_LIST } from "../model";

const LedgerEntriesBase: FC = () => {
	const { t } = useTranslation("ledger_page");
	const { t: tCols } = useTranslation(["ledger_page", "options"]);
	const form = useForm<ILedgerFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.LEDGER_ENTRIES,
			search: ""
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { type, flow, source } = filters;

	const filterOptions = {
		[ENUM_LEDGER_FILTER.TYPE]: useValueToTranslateLabel(
			LEDGER_ENTRY_TYPE_LABELS
		),
		[ENUM_LEDGER_FILTER.FLOW]: useValueToTranslateLabel(LEDGER_FLOW_LABELS),
		[ENUM_LEDGER_FILTER.SOURCE]:
			useValueToTranslateLabel(LEDGER_SOURCE_LABELS)
	};
	const filterFields = LEDGER_FILTERS_LIST.map((item) =>
		item.fieldType === "select"
			? { ...item, options: filterOptions[item.key] }
			: item
	);

	// Новый фильтр — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [type, flow, source, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_LEDGER_FILTER.TYPE, undefined);
		setValue(ENUM_LEDGER_FILTER.FLOW, undefined);
		setValue(ENUM_LEDGER_FILTER.SOURCE, undefined);
	}, [setValue]);

	const {
		data: entriesData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetLedgerEntriesQuery(filters));

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const entries = useMemo(() => entriesData?.data ?? [], [entriesData]);
	const totalCount = entriesData?.total ?? 0;

	const columns = useMemo(() => ENTRIES_COLUMNS(tCols), [tCols]);

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

	const handleSearchChange = useCallback(
		(val: string) => {
			setValue("search", val);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<SmartTable
			data={entries}
			columns={columns}
			topChildren={
				<Form {...form}>
					<div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
						{filterFields.map(({ key, ...item }) => (
							<CustomField
								hideLabel
								key={key}
								control={control}
								name={key}
								t={t}
								className="w-full sm:w-56"
								{...item}
							/>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={handleResetFilters}
						>
							{t("entries.filters.reset")}
						</Button>
					</div>
				</Form>
			}
			isLoading={isLoading || isFetching}
			loadingMode="skeleton"
			recordCount={totalCount}
			pagination={paginationObj}
			onPaginationChange={handlePaginationChange}
			search={filters.search}
			onSearchChange={handleSearchChange}
			showStatusFilter={false}
		/>
	);
};

export const LedgerEntries = withErrorBoundary(LedgerEntriesBase);

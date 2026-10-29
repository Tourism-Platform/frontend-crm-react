import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import type { IPaginationRequest } from "@/shared/types";
import { withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { formatMoney } from "@/shared/utils";

import { useGetCreditorsQuery, useGetDebtorsQuery } from "@/entities/finance";

import {
	BALANCES_COLUMNS,
	type ENUM_LEDGER_BALANCE_KIND_TYPE,
	ENUM_LEDGER_TAB
} from "../model";

interface ILedgerBalancesProps {
	kind: ENUM_LEDGER_BALANCE_KIND_TYPE;
}

const LedgerBalancesBase: FC<ILedgerBalancesProps> = ({ kind }) => {
	const { t } = useTranslation("ledger_page");
	const { t: tCols } = useTranslation(["ledger_page", "options"]);
	const [pagination, setPagination] = useState<IPaginationRequest>({
		page: 1,
		limit: INTERSECTION_ELEMENTS.LEDGER_BALANCES
	});

	const isDebtors = kind === ENUM_LEDGER_TAB.DEBTORS;
	const debtorsQuery = useGetDebtorsQuery(pagination, { skip: !isDebtors });
	const creditorsQuery = useGetCreditorsQuery(pagination, {
		skip: isDebtors
	});
	const {
		data: balancesData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(isDebtors ? debtorsQuery : creditorsQuery);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const balances = useMemo(() => balancesData?.data ?? [], [balancesData]);
	const totalCount = balancesData?.total ?? 0;

	const columns = useMemo(() => BALANCES_COLUMNS(tCols), [tCols]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: pagination.page - 1,
			pageSize: pagination.limit
		}),
		[pagination.page, pagination.limit]
	);

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(paginationObj)
					: updaterOrValue;

			setPagination({
				page: nextValue.pageIndex + 1,
				limit: nextValue.pageSize
			});
		},
		[paginationObj]
	);

	return (
		<div className="flex flex-col gap-4">
			{balancesData && (
				<div className="flex gap-2 text-md">
					<span className="font-semibold">
						{t(`balances.total_outstanding.${kind}`)}:
					</span>
					<span>
						{formatMoney(balancesData.totalOutstanding, {
							currency: balancesData.currency
						})}
					</span>
				</div>
			)}
			<SmartTable
				data={balances}
				columns={columns}
				isLoading={isLoading || isFetching}
				loadingMode="skeleton"
				recordCount={totalCount}
				pagination={paginationObj}
				onPaginationChange={handlePaginationChange}
				showTopFilters={false}
			/>
		</div>
	);
};

const LedgerBalances = withErrorBoundary(LedgerBalancesBase);

export const LedgerDebtors = () => (
	<LedgerBalances kind={ENUM_LEDGER_TAB.DEBTORS} />
);

export const LedgerCreditors = () => (
	<LedgerBalances kind={ENUM_LEDGER_TAB.CREDITORS} />
);

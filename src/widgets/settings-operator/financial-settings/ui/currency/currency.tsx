import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { useGetOperatorCurrencyRatesQuery } from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";

import { OPERATOR_CURRENCY_RATE_COLUMNS } from "../../model";

const CurrencyBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");
	const {
		data: currencyRates,
		isLoading,
		isFetching
	} = useGetOperatorCurrencyRatesQuery();

	const currencyRatesData = useMemo(
		() => currencyRates?.data ?? [],
		[currencyRates]
	);
	const totalCount = currencyRates?.total ?? 0;

	const columns = useMemo(() => OPERATOR_CURRENCY_RATE_COLUMNS(t), [t]);

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
					defaultPageSize={5}
					showTopFilters={false}
					showPagination={false}
					isLoading={isLoading || isFetching}
					topChildren={topChildrenJsx}
				/>
			</div>
		</div>
	);
};

export const Currency = withErrorBoundary(CurrencyBase);

import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import type { ICommission } from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";

import { COLUMNS } from "../model";

interface ICommissionTypeProps {
	data: ICommission[];
	isLoading: boolean;
}

const CommissionTypeBase: FC<ICommissionTypeProps> = ({ data, isLoading }) => {
	const { t } = useTranslation("financial_settings_page");
	const columns = useMemo(() => COLUMNS(t), [t]);

	const actionsJsx = useMemo(() => <NewCurrencyRate />, []);
	const topChildrenJsx = useMemo(
		() => (
			<div className="flex flex-col gap-2">
				<h2 className="text-xl">{t("commission_type.title")}</h2>
				<p className="text-sm text-muted-foreground">
					{t("commission_type.description")}
				</p>
			</div>
		),
		[t]
	);

	return (
		<div className="flex gap-5 flex-col">
			<SmartTable
				data={data}
				columns={columns}
				actions={actionsJsx}
				defaultPageSize={5}
				showTopFilters={false}
				showPagination={false}
				isLoading={isLoading}
				topChildren={topChildrenJsx}
			/>
		</div>
	);
};

export const CommissionType = withErrorBoundary(CommissionTypeBase);

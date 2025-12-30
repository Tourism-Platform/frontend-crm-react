import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { SmartTable } from "@/shared/ui";

import type { ICommission } from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";

import { COLUMNS } from "../model";

interface ICommissionTypeProps {
	data: ICommission[];
	isLoading: boolean;
}

export const CommissionType: FC<ICommissionTypeProps> = ({
	data,
	isLoading
}) => {
	const { t } = useTranslation("financial_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<SmartTable
				data={data}
				columns={COLUMNS()}
				actions={<NewCurrencyRate />}
				defaultPageSize={5}
				showTopFilters={false}
				showPagination={false}
				isLoading={isLoading}
				topChildren={
					<div className="flex flex-col gap-2">
						<h2 className="text-xl">
							{t("commission_type.title")}
						</h2>
						<p className="text-sm text-muted-foreground">
							{t("commission_type.description")}
						</p>
					</div>
				}
			/>
		</div>
	);
};

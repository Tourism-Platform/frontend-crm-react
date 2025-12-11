import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomTable } from "@/shared/ui";

import type { ICommission } from "@/entities/commission";

import { NewCurrencyRate } from "@/features/settings";
import type {
	TEditCommissionTypeSchema,
	TNewCurrencyRateSchema
} from "@/features/settings";

import { COLUMNS } from "../model";

interface ICommissionTypeProps {
	data: ICommission[];
	onEdit: (id: string, data: TEditCommissionTypeSchema) => void;
	onDelete: (id: string) => void;
	onAdd: (data: TNewCurrencyRateSchema) => void;
}

export const CommissionType: FC<ICommissionTypeProps> = ({
	data,
	onEdit,
	onDelete,
	onAdd
}) => {
	const { t } = useTranslation("financial_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<CustomTable
				data={data}
				columns={COLUMNS(onEdit, onDelete)}
				actions={<NewCurrencyRate onAdd={onAdd} />}
				showTopFilters={false}
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

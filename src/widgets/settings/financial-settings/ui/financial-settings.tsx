import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { COMMISSION_MOCKS } from "@/shared/config/mocks";
import { Card, CardContent, Separator } from "@/shared/ui";

import type { ICommission } from "@/entities/commission";

import type {
	TEditCommissionTypeSchema,
	TNewCurrencyRateSchema
} from "@/features/settings";

import { CommissionRate } from "./commission-rate";
import { CommissionType } from "./commission-type";

export const FinancialSettings: FC = () => {
	const { t } = useTranslation("financial_settings_page");
	const [commissions, setCommissions] =
		useState<ICommission[]>(COMMISSION_MOCKS);

	const handleAdd = (data: TNewCurrencyRateSchema) => {
		const newId = (
			Math.max(...commissions.map((c) => parseInt(c.id))) + 1
		).toString();
		setCommissions([...commissions, { ...data, id: newId }]);
	};

	const handleEdit = (id: string, data: TEditCommissionTypeSchema) => {
		setCommissions(
			commissions.map((c) => (c.id === id ? { ...c, ...data } : c))
		);
	};

	const handleDelete = (id: string) => {
		setCommissions(commissions.filter((c) => c.id !== id));
	};

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-8 flex-col">
					<CommissionType
						data={commissions}
						onAdd={handleAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
					<Separator />
					<CommissionRate />
				</CardContent>
			</Card>
		</section>
	);
};

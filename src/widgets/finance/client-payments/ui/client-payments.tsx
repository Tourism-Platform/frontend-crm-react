import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { PAYMENTS_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IPayment } from "@/entities/finance";

import { NewPayment } from "@/features/finance";

import { COLUMNS } from "../model";

export const ClientPayments: FC = () => {
	const { t } = useTranslation("client_payments_page");
	const [payments, setPayments] = useState<IPayment[]>(PAYMENTS_MOCK);

	const handleAddPayment = (newPayment: Omit<IPayment, "id">) => {
		const id = (
			Math.max(...payments.map((p) => parseInt(p.id))) + 1
		).toString();
		setPayments([...payments, { ...newPayment, id }]);
	};

	const handleEditPayment = (id: string, updatedData: Partial<IPayment>) => {
		setPayments(
			payments.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
		);
	};

	const handleDeletePayment = (id: string) => {
		setPayments(payments.filter((p) => p.id !== id));
	};

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable
						data={payments}
						columns={COLUMNS(
							handleEditPayment,
							handleDeletePayment
						)}
						actions={<NewPayment onAdd={handleAddPayment} />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

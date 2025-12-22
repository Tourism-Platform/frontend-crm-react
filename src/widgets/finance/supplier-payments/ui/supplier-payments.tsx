import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { SUPPLIER_PAYMENTS_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPayment
} from "@/entities/finance";

import { COLUMNS } from "../model";

export const SupplierPayments: FC = () => {
	const { t } = useTranslation("supplier_payments_page");
	const [payments, setPayments] = useState<ISupplierPayment[]>(
		SUPPLIER_PAYMENTS_MOCK
	);

	const handleConfirmPayment = (
		id: string,
		data: Partial<ISupplierPayment>
	) => {
		setPayments(
			payments.map((p) =>
				p.id === id
					? {
							...p,
							...data,
							status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
						}
					: p
			)
		);
	};

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable
						data={payments}
						columns={COLUMNS(handleConfirmPayment)}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

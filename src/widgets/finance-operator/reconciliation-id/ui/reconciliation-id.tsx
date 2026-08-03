import { type FC } from "react";
import { useParams } from "react-router-dom";

import { useGetReconciliationByIdQuery } from "@/entities/finance";

import { ReconciliationHeader } from "./reconciliation-header";
import { ReconciliationIdSkeleton } from "./reconciliation-id-skeleton";
import { ReconciliationNotFound } from "./reconciliation-not-found";
import { ReconciliationStats } from "./reconciliation-stats";
import { ReconciliationSupplierPayments } from "./reconciliation-supplier-payments";

export const ReconciliationId: FC = () => {
	const { reconciliationId } = useParams<{ reconciliationId: string }>();

	const {
		data: reconciliation,
		isLoading,
		isError
	} = useGetReconciliationByIdQuery(reconciliationId ?? "");

	if (isLoading) {
		return <ReconciliationIdSkeleton />;
	}

	if (isError || !reconciliation) {
		return <ReconciliationNotFound />;
	}

	return (
		<div className="flex flex-col gap-8">
			<ReconciliationHeader
				orderId={reconciliation.orderId}
				client={reconciliation.client}
				variance={reconciliation.variance}
			/>

			<ReconciliationStats data={reconciliation} />

			<ReconciliationSupplierPayments
				data={reconciliation.supplierPayments}
			/>
		</div>
	);
};

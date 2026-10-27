import { type FC } from "react";
import { useParams } from "react-router-dom";

import { DataState } from "@/shared/ui";

import {
	useGetOperatorOrderFinancialsQuery,
	useGetOperatorOrderVarianceQuery
} from "@/entities/finance";

import { ReconciliationHeader } from "./reconciliation-header";
import { ReconciliationNotFound } from "./reconciliation-not-found";
import { ReconciliationStats } from "./reconciliation-stats";
import { ReconciliationSupplierPayments } from "./reconciliation-supplier-payments";

export const ReconciliationId: FC = () => {
	const { bookingId } = useParams<{ bookingId: string }>();

	const {
		data: financials,
		isLoading: isFinancialsLoading,
		isError: isFinancialsError
	} = useGetOperatorOrderFinancialsQuery(bookingId ?? "", {
		skip: !bookingId
	});

	const {
		data: variance,
		isLoading: isVarianceLoading,
		isFetching: isVarianceFetching
	} = useGetOperatorOrderVarianceQuery(bookingId ?? "", {
		skip: !bookingId
	});

	if (!isFinancialsLoading && (isFinancialsError || !financials)) {
		return <ReconciliationNotFound />;
	}

	return (
		<div className="flex flex-1 flex-col gap-5">
			<DataState
				variant="page"
				data={financials}
				isLoading={isFinancialsLoading}
			>
				{(financials) => (
					<>
						<ReconciliationHeader
							orderId={financials.orderId}
							variance={variance?.varianceTotal ?? 0}
						/>

						<ReconciliationStats data={financials} />

						<ReconciliationSupplierPayments
							data={variance?.events ?? []}
							isLoading={isVarianceLoading || isVarianceFetching}
						/>
					</>
				)}
			</DataState>
		</div>
	);
};

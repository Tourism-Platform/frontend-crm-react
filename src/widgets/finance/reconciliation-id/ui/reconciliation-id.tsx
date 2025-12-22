import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { ENUM_PATH, RECONCILIATION_DETAILS_MOCK } from "@/shared/config";
import { Button } from "@/shared/ui";

import { ReconciliationHeader } from "./reconciliation-header";
import { ReconciliationStats } from "./reconciliation-stats";
import { ReconciliationSupplierPayments } from "./reconciliation-supplier-payments";

export const ReconciliationId: FC = () => {
	const { reconciliationId } = useParams<{ reconciliationId: string }>();
	const { t } = useTranslation("reconciliation_id_page");

	const reconciliation = RECONCILIATION_DETAILS_MOCK[reconciliationId || ""];

	if (!reconciliation) {
		return (
			<div className="flex flex-col gap-6 font-poppins text-[#71717A]">
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="w-fit p-0 hover:bg-transparent"
				>
					<Link to={ENUM_PATH.FINANCE.RECONCILIATION}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
				<div className="flex flex-col items-center justify-center h-[50vh] gap-4">
					<h1 className="text-2xl font-bold">
						{t("reconciliation_not_found")}
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="w-fit p-0 h-auto hover:bg-transparent text-[#71717A]"
				>
					<Link to={ENUM_PATH.FINANCE.RECONCILIATION}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
				<ReconciliationHeader
					orderId={reconciliation.orderId}
					client={reconciliation.client}
					variance={reconciliation.variance}
				/>
			</div>

			<ReconciliationStats data={reconciliation} />

			<ReconciliationSupplierPayments
				data={reconciliation.supplierPayments}
			/>
		</div>
	);
};

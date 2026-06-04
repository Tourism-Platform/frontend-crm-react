import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@/shared/ui";

import { OPERATOR_PAYMENT_METHOD_LABELS } from "../../constants";
import type { TOperatorPaymentRoute } from "../../types";

interface IPaymentRouteSelectCardProps {
	route: TOperatorPaymentRoute;
}

export const PaymentRouteSelectCard: FC<IPaymentRouteSelectCardProps> = ({
	route
}) => {
	const { t } = useTranslation("options");

	return (
		<Card className="w-full border bg-card py-3 px-4 shadow-none">
			<p className="text-base font-semibold leading-snug text-foreground">
				{route.internalLabel}
				<span className="mx-1.5 font-normal text-muted-foreground">
					·
				</span>
				<span className="font-normal text-muted-foreground">
					{t(OPERATOR_PAYMENT_METHOD_LABELS[route.methodType])}
				</span>
			</p>
		</Card>
	);
};

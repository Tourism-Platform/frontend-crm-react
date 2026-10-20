import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { withErrorBoundary } from "@/shared/ui";

import { PaymentRouteCard, useGetPaymentRoutesQuery } from "@/entities/finance";

import { NewPaymentRoute } from "@/features/settings";

import { PaymentRouteActions } from "./payment-route-actions";

const PaymentSettingsBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");
	const { data: routesPage, isRealError: isError } = useOptionalResourceQuery(
		useGetPaymentRoutesQuery({
			page: 1,
			limit: INTERSECTION_ELEMENTS.OPERATOR_PAYMENT_ROUTES
		})
	);
	const routes = routesPage?.data ?? [];

	useEffect(() => {
		if (isError) {
			toast.error(t("payment_settings.toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-4">
				{routes.map((route) => (
					<PaymentRouteCard
						key={route.id}
						route={route}
						actions={<PaymentRouteActions route={route} />}
					/>
				))}
			</div>
			<div className="flex justify-start">
				<NewPaymentRoute />
			</div>
		</div>
	);
};

export const PaymentSettings = withErrorBoundary(PaymentSettingsBase);

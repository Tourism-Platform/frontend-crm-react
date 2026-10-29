import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { isNoFxRateError } from "@/shared/api";
import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	CustomScroll,
	CustomSelectableCard,
	DataState,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	LoaderButton
} from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type IBookingEventAvailability,
	getOrderTransitionGate,
	useUpdateBookingStatusMutation
} from "@/entities/booking";
import {
	PaymentRouteSelectCard,
	useGenerateInvoiceMutation,
	useGetPaymentRoutesQuery
} from "@/entities/finance";

interface ISendInvoiceProps {
	orderId: string;
	orderStatus: ENUM_ORDER_STATUS_TYPE;
	/** Backend availability rows — used to gate confirm (source of truth). */
	availability?: IBookingEventAvailability[];
}

export const SendInvoice: FC<ISendInvoiceProps> = ({
	orderId,
	orderStatus,
	availability = []
}) => {
	const { t } = useTranslation("order_id_page");
	const isActive = orderStatus === ENUM_ORDER_STATUS.IN_PROCESSING;
	const [open, setOpen] = useState(false);
	const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

	const {
		data: routesPage,
		isLoading,
		isRealError: isError
	} = useOptionalResourceQuery(
		useGetPaymentRoutesQuery(
			{ page: 1, limit: INTERSECTION_ELEMENTS.OPERATOR_PAYMENT_ROUTES },
			{ skip: !isActive }
		)
	);
	const routes = routesPage?.data ?? [];

	const [generateInvoice, { isLoading: isGenerating }] =
		useGenerateInvoiceMutation();
	const [updateBookingStatus, { isLoading: isUpdatingStatus }] =
		useUpdateBookingStatusMutation();
	const isConfirming = isGenerating || isUpdatingStatus;

	useEffect(() => {
		if (isError) {
			toast.error(t("send_invoice_modal.load_error"));
		}
	}, [isError, t]);

	if (!isActive) {
		return null;
	}

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			setSelectedRouteId(null);
		}
		setOpen(nextOpen);
	};

	const transitionGate = getOrderTransitionGate({
		status: orderStatus,
		availability
	});

	const handleConfirm = async () => {
		if (!selectedRouteId || !transitionGate.allowed) return;

		try {
			await generateInvoice({
				bookingId: orderId,
				paymentRouteId: selectedRouteId
			}).unwrap();
			await updateBookingStatus({
				id: orderId,
				status: ENUM_ORDER_STATUS.BOOKING
			}).unwrap();
			toast.success(t("send_invoice_modal.confirm_success"));
			handleOpenChange(false);
		} catch (error) {
			// 422 — нет курса ЦБ для валюты маршрута оплаты
			toast.error(
				isNoFxRateError(error)
					? t("send_invoice_modal.no_fx_rate_error")
					: t("send_invoice_modal.confirm_error")
			);
		}
	};

	const isConfirmDisabled =
		!selectedRouteId ||
		isLoading ||
		isConfirming ||
		isError ||
		routes.length === 0 ||
		!transitionGate.allowed;

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				disabled={!transitionGate.allowed}
				title={
					!transitionGate.allowed
						? transitionGate.reasons.join("; ")
						: undefined
				}
			>
				{t("buttons.send_invoice")}
			</Button>

			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogContent
					onCloseBtn={() => handleOpenChange(false)}
					className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-[52rem]"
				>
					<DialogHeader className="border-b px-6 py-4">
						<DialogTitle>
							{t("send_invoice_modal.title")}
						</DialogTitle>
						<DialogDescription className="sr-only">
							{t("send_invoice_modal.description")}
						</DialogDescription>
					</DialogHeader>
					<div className="flex min-h-0 flex-1 flex-col">
						<CustomScroll className="flex-1">
							<div className="flex flex-col gap-2 px-6 py-4">
								<DataState
									data={routes}
									isLoading={isLoading}
									isError={isError}
									error={{
										description: t(
											"send_invoice_modal.load_error"
										)
									}}
									empty={{
										description: t(
											"send_invoice_modal.empty"
										)
									}}
								>
									{(routes) =>
										routes.map((route) => (
											<CustomSelectableCard
												key={route.id}
												selected={
													selectedRouteId === route.id
												}
												onSelect={() =>
													setSelectedRouteId(route.id)
												}
											>
												<PaymentRouteSelectCard
													route={route}
												/>
											</CustomSelectableCard>
										))
									}
								</DataState>
							</div>
						</CustomScroll>
						<DialogFooter className="border-t px-6 py-4">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									disabled={isConfirming}
								>
									{t("send_invoice_modal.cancel")}
								</Button>
							</DialogClose>
							<LoaderButton
								type="button"
								onClick={handleConfirm}
								disabled={isConfirmDisabled}
								isLoading={isConfirming}
								label={t("send_invoice_modal.confirm")}
								loadingLabel={t(
									"send_invoice_modal.confirming"
								)}
							/>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

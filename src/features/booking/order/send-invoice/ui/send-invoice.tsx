import { Loader } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomSelectableCard,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	ScrollArea,
	Separator,
	Skeleton
} from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	useUpdateBookingStatusMutation
} from "@/entities/booking";
import {
	PaymentRouteSelectCard,
	useGetPaymentRoutesQuery
} from "@/entities/finance";

interface ISendInvoiceProps {
	orderId: string;
	orderStatus: ENUM_ORDER_STATUS_TYPE;
}

export const SendInvoice: FC<ISendInvoiceProps> = ({
	orderId,
	orderStatus
}) => {
	const { t } = useTranslation("order_id_page");
	const isActive = orderStatus === ENUM_ORDER_STATUS.IN_PROCESSING;
	const [open, setOpen] = useState(false);
	const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

	const {
		data: routes = [],
		isLoading,
		isError
	} = useGetPaymentRoutesQuery(undefined, { skip: !isActive });

	const [updateBookingStatus, { isLoading: isConfirming }] =
		useUpdateBookingStatusMutation();

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

	const handleConfirm = async () => {
		if (!selectedRouteId) return;

		try {
			await updateBookingStatus({
				id: orderId,
				status: ENUM_ORDER_STATUS.BOOKING
			}).unwrap();
			toast.success(t("send_invoice_modal.confirm_success"));
			handleOpenChange(false);
		} catch {
			toast.error(t("send_invoice_modal.confirm_error"));
		}
	};

	const isConfirmDisabled =
		!selectedRouteId ||
		isLoading ||
		isConfirming ||
		isError ||
		routes.length === 0;

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				{t("buttons.send_invoice")}
			</Button>

			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogContent
					onCloseBtn={() => handleOpenChange(false)}
					className="sm:max-w-[52rem]"
				>
					<DialogHeader>
						<DialogTitle>
							{t("send_invoice_modal.title")}
						</DialogTitle>
						<DialogDescription className="sr-only">
							{t("send_invoice_modal.description")}
						</DialogDescription>
					</DialogHeader>
					<Separator />
					<div className="space-y-6">
						<ScrollArea className="h-72 w-full">
							<div className="flex flex-col gap-2 p-4">
								{isLoading &&
									Array.from({ length: 3 }).map(
										(_, index) => (
											<Skeleton
												key={index}
												className="h-14 w-full rounded-xl"
											/>
										)
									)}
								{!isLoading && isError && (
									<p className="text-sm text-muted-foreground">
										{t("send_invoice_modal.load_error")}
									</p>
								)}
								{!isLoading &&
									!isError &&
									routes.length === 0 && (
										<p className="text-sm text-muted-foreground">
											{t("send_invoice_modal.empty")}
										</p>
									)}
								{!isLoading &&
									!isError &&
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
									))}
							</div>
						</ScrollArea>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									disabled={isConfirming}
								>
									{t("send_invoice_modal.cancel")}
								</Button>
							</DialogClose>
							<Button
								type="button"
								onClick={handleConfirm}
								disabled={isConfirmDisabled}
							>
								{isConfirming && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{t("send_invoice_modal.confirm")}
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

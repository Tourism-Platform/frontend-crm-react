import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, type ReactNode, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	Separator
} from "@/shared/ui";

import {
	ENUM_PAYMENT_STATUS,
	type IPayment,
	useGetAvailableOrderIdsQuery,
	useUpdatePaymentMutation
} from "@/entities/finance";

import {
	ASSIGN_PAYMENT_SCHEMA,
	ENUM_FORM_ASSIGN_PAYMENT,
	FORM_ASSIGN_PAYMENT_LIST,
	type TAssignPaymentSchema
} from "../model";

interface IAssignPaymentProps {
	trigger?: ReactNode;
	className?: string;
	payment: IPayment;
}

export const AssignPayment: FC<IAssignPaymentProps> = ({
	trigger,
	className,
	payment
}) => {
	const { t } = useTranslation("client_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

	const { data: orderIds = [] } = useGetAvailableOrderIdsQuery();

	const orderOptions = useMemo(() => {
		return orderIds.map((o) => ({
			value: o,
			label: o
		}));
	}, [orderIds]);

	const form = useForm<TAssignPaymentSchema>({
		resolver: zodResolver(ASSIGN_PAYMENT_SCHEMA),
		defaultValues: {
			[ENUM_FORM_ASSIGN_PAYMENT.ORDER_ID]: payment.orderId,
			[ENUM_FORM_ASSIGN_PAYMENT.AMOUNT]: payment.amount,
			[ENUM_FORM_ASSIGN_PAYMENT.NOTE]: payment.note || "",
			[ENUM_FORM_ASSIGN_PAYMENT.FILES]: payment.files || []
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TAssignPaymentSchema) {
		try {
			await updatePayment({
				id: payment.id,
				data
			}).unwrap();
			toast.success(t("menu.assign.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("menu.assign.form.toasts.error"));
			console.error("Failed to update payment:", error);
		}
	}

	const isAssigned = payment.status === ENUM_PAYMENT_STATUS.ASSIGNED;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="sm:max-w-[52rem]"
			>
				<DialogHeader>
					<DialogTitle>{t("menu.assign.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.assign.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_ASSIGN_PAYMENT_LIST({ orderOptions }).map(
								({ key, ...item }) => (
									<CustomField
										key={key}
										control={form?.control}
										name={key}
										t={t}
										disabled={isAssigned}
										{...item}
									/>
								)
							)}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="outline"
									type="reset"
									onClick={() => form.reset()}
								>
									{t("menu.assign.form.buttons.decline")}
								</Button>
							</DialogClose>
							{!isAssigned && (
								<Button type="submit" disabled={isLoading}>
									{isLoading && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading
										? t("menu.assign.form.buttons.saving")
										: t("menu.assign.form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

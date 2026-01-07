import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useState } from "react";
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
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPayment,
	useUpdateSupplierPaymentMutation
} from "@/entities/finance";

import {
	CONFIRM_PAYMENT_SCHEMA,
	ENUM_FORM_CONFIRM_PAYMENT,
	FORM_CONFIRM_PAYMENT_LIST,
	type TConfirmPaymentSchema
} from "../model";

interface IConfirmPaymentProps {
	payment: ISupplierPayment;
}

export const ConfirmPayment: FC<IConfirmPaymentProps> = ({ payment }) => {
	const { t } = useTranslation("supplier_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const [updatePayment, { isLoading }] = useUpdateSupplierPaymentMutation();

	const isConfirmed =
		payment.status === ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED;

	const form = useForm<TConfirmPaymentSchema>({
		resolver: zodResolver(CONFIRM_PAYMENT_SCHEMA),
		defaultValues: {
			[ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID]: payment.orderId,
			[ENUM_FORM_CONFIRM_PAYMENT.AMOUNT]: payment.amount,
			[ENUM_FORM_CONFIRM_PAYMENT.NOTE]: payment.note || "",
			[ENUM_FORM_CONFIRM_PAYMENT.FILES]: payment.files || []
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TConfirmPaymentSchema) {
		try {
			await updatePayment({
				id: payment.id,
				data
			}).unwrap();
			toast.success(t("form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("form.toasts.error"));
			console.error("Failed to update supplier payment:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={isConfirmed ? "outline" : "default"}
					size="sm"
					className="w-full"
				>
					{isConfirmed
						? t("table.menu.open")
						: t("table.menu.confirm")}
				</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="sm:max-w-[52rem]"
			>
				<DialogHeader>
					<DialogTitle>{t("form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_CONFIRM_PAYMENT_LIST.map(
								({ key, ...item }) => (
									<CustomField
										key={key}
										control={form?.control}
										name={key}
										t={t}
										disabled={isConfirmed}
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
									{t("form.buttons.close")}
								</Button>
							</DialogClose>
							{!isConfirmed && (
								<Button type="submit" disabled={isLoading}>
									{isLoading && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading
										? t("form.buttons.saving")
										: t("form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

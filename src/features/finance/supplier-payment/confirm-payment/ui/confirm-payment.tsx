import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
	type ISupplierPayment
} from "@/entities/finance";

import {
	CONFIRM_PAYMENT_SCHEMA,
	FORM_CONFIRM_PAYMENT_LIST,
	type TConfirmPaymentSchema
} from "../model";

interface IConfirmPaymentProps {
	payment: ISupplierPayment;
	onConfirm?: (id: string, data: Partial<TConfirmPaymentSchema>) => void;
}

export const ConfirmPayment: FC<IConfirmPaymentProps> = ({
	payment,
	onConfirm
}) => {
	const { t } = useTranslation("supplier_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const isConfirmed =
		payment.status === ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED;

	const form = useForm<TConfirmPaymentSchema>({
		resolver: zodResolver(CONFIRM_PAYMENT_SCHEMA),
		defaultValues: {
			orderId: payment.orderId,
			amount: payment.amount,
			note: ""
		},
		mode: "onSubmit"
	});

	function onSubmit(data: TConfirmPaymentSchema) {
		setOpen(false);
		if (onConfirm && payment) {
			onConfirm(payment.id, {
				orderId: data.orderId,
				amount: data.amount,
				note: data.note
			});
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
			<DialogContent onCloseBtn={() => setOpen(false)}>
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
								<Button type="submit">
									{t("form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

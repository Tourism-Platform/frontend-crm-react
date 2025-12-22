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

import type { IPayment } from "@/entities/finance";

import {
	FORM_NEW_PAYMENT_LIST,
	NEW_PAYMENT_SCHEMA,
	type TNewPaymentSchema
} from "../model";

interface INewPaymentProps {
	onAdd?: (payment: Omit<IPayment, "id">) => void;
}

export const NewPayment: FC<INewPaymentProps> = ({ onAdd }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("client_payments_page");
	const form = useForm<TNewPaymentSchema>({
		resolver: zodResolver(NEW_PAYMENT_SCHEMA),
		mode: "onSubmit"
	});

	function onSubmit(data: TNewPaymentSchema) {
		if (onAdd) {
			onAdd({
				paymentId: `INV-${Math.floor(Math.random() * 10000)}`,
				amount: data.amount,
				orderId: data.orderId || "",
				note: data.note || "",
				dateCreated: new Date().toISOString().split("T")[0],
				currency: "USD",
				status: data.orderId ? "assigned" : "not_assigned"
			});
			setOpen(false);
			form.reset();
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("new_payment.button")}</Button>
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
				<DialogHeader>
					<DialogTitle>{t("new_payment.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("new_payment.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_NEW_PAYMENT_LIST.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form?.control}
									name={key}
									t={t}
									{...item}
								/>
							))}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("new_payment.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit">
								{t("new_payment.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

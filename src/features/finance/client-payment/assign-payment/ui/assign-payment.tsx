import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type ReactNode, useState } from "react";
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

import { ENUM_PAYMENT_STATUS, type IPayment } from "@/entities/finance";

import {
	ASSIGN_PAYMENT_SCHEMA,
	FORM_ASSIGN_PAYMENT_LIST,
	type TAssignPaymentSchema
} from "../model";

interface IAssignPaymentProps {
	trigger?: ReactNode;
	className?: string;
	payment: IPayment;
	onAssign?: (id: string, data: Partial<TAssignPaymentSchema>) => void;
}

export const AssignPayment: FC<IAssignPaymentProps> = ({
	trigger,
	className,
	payment,
	onAssign
}) => {
	const { t } = useTranslation("client_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const form = useForm<TAssignPaymentSchema>({
		resolver: zodResolver(ASSIGN_PAYMENT_SCHEMA),
		defaultValues: {
			orderId: payment.orderId,
			amount: payment.amount,
			note: ""
		},
		mode: "onSubmit"
	});

	function onSubmit(data: TAssignPaymentSchema) {
		setOpen(false);
		if (onAssign && payment) {
			onAssign(payment.id!, {
				orderId: data.orderId,
				amount: data.amount,
				note: data.note
			});
		}
	}
	const isAssigned = payment.status === ENUM_PAYMENT_STATUS.ASSIGNED;
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
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
							{FORM_ASSIGN_PAYMENT_LIST.map(
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
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									variant="outline"
									type="reset"
									onClick={() => form.reset()}
								>
									{t("menu.assign.form.buttons.decline")}
								</Button>
							</DialogClose>
							{!isAssigned && (
								<Button type="submit">
									{t("menu.assign.form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

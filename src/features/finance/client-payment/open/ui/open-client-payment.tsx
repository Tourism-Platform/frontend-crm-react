import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type ReactNode } from "react";
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
	FORM_OPEN_CLIENT_PAYMENT_LIST,
	OPEN_CLIENT_PAYMENT_SCHEMA,
	type TOpenClientPaymentSchema
} from "../model";

interface IOpenClientPaymentProps {
	trigger: ReactNode;
	className?: string;
	data: TOpenClientPaymentSchema;
}

export const OpenClientPayment: FC<IOpenClientPaymentProps> = ({
	trigger,
	className,
	data
}) => {
	const { t } = useTranslation("client_payments_page");
	const form = useForm<TOpenClientPaymentSchema>({
		resolver: zodResolver(OPEN_CLIENT_PAYMENT_SCHEMA),
		defaultValues: data,
		mode: "onSubmit"
	});

	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("client_payment.menu.open.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("client_payment.menu.open.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form className="space-y-6">
						<div>
							{FORM_OPEN_CLIENT_PAYMENT_LIST.map(
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
								<Button type="button" variant="outline">
									{t(
										"client_payment.menu.open.form.buttons.close"
									)}
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

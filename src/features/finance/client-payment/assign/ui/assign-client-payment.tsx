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
	ASSIGN_CLIENT_PAYMENT_SCHEMA,
	FORM_ASSIGN_CLIENT_PAYMENT_LIST,
	type TAssignClientPaymentSchema
} from "../model";

interface IAssignClientPaymentProps {
	trigger: ReactNode;
	className?: string;
	onAssign: (data: TAssignClientPaymentSchema) => void;
}

export const AssignClientPayment: FC<IAssignClientPaymentProps> = ({
	trigger,
	className,
	onAssign
}) => {
	const { t } = useTranslation("client_payments_page");
	const form = useForm<TAssignClientPaymentSchema>({
		resolver: zodResolver(ASSIGN_CLIENT_PAYMENT_SCHEMA),
		defaultValues: {
			orderId: ""
		},
		mode: "onSubmit"
	});

	function onSubmit(data: TAssignClientPaymentSchema) {
		onAssign(data);
	}

	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("client_payment.menu.assign.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("client_payment.menu.assign.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div>
							{FORM_ASSIGN_CLIENT_PAYMENT_LIST.map(
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
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t(
										"client_payment.menu.assign.form.buttons.decline"
									)}
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="submit">
									{t(
										"client_payment.menu.assign.form.buttons.save"
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

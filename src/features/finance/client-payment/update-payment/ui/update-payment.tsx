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
	type IPayment,
	useGetAvailableOrderIdsQuery,
	useUpdatePaymentMutation
} from "@/entities/finance";

import {
	FORM_UPDATE_PAYMENT_LIST,
	type TUpdatePaymentSchema,
	UPDATE_PAYMENT_SCHEMA
} from "../model";

interface IUpdatePaymentProps {
	trigger?: ReactNode;
	className?: string;
	payment: IPayment;
}

export const UpdatePayment: FC<IUpdatePaymentProps> = ({
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

	const form = useForm<TUpdatePaymentSchema>({
		resolver: zodResolver(UPDATE_PAYMENT_SCHEMA),
		defaultValues: {
			orderId: payment.orderId,
			amount: payment.amount,
			note: payment.note || "",
			files: payment.files || []
		},
		mode: "onSubmit"
	});

	const formFields = useMemo(
		() => FORM_UPDATE_PAYMENT_LIST({ orderOptions }),
		[orderOptions]
	);

	async function onSubmit(data: TUpdatePaymentSchema) {
		try {
			await updatePayment({
				id: payment.id,
				data: {
					amount: data.amount,
					note: data.note
				}
			}).unwrap();
			toast.success(t("menu.update.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("menu.update.form.toasts.error"));
			console.error("Failed to update payment:", error);
		}
	}

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
					<DialogTitle>{t("menu.update.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.update.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{formFields.map(({ key, disabled, ...item }) => (
								<CustomField
									key={key}
									control={form?.control}
									name={key}
									t={t}
									disabled={disabled}
									{...item}
								/>
							))}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="outline"
									type="reset"
									onClick={() => form.reset()}
								>
									{t("menu.update.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("menu.update.form.buttons.saving")
									: t("menu.update.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { isNoFxRateError } from "@/shared/api";
import {
	Button,
	CustomField,
	CustomScroll,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	LoaderButton
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_INVOICE_PAYMENT_METHOD,
	INVOICE_PAYMENT_METHOD_LABELS,
	useRecordInvoicePaymentMutation
} from "@/entities/finance";

import {
	ENUM_FORM_RECORD_PAYMENT,
	FORM_RECORD_PAYMENT_LIST,
	RECORD_PAYMENT_SCHEMA,
	type TRecordPaymentSchema
} from "../model";

interface IRecordPaymentProps {
	invoiceId: string;
	remainingAmount: number;
}

export const RecordPayment: FC<IRecordPaymentProps> = ({
	invoiceId,
	remainingAmount
}) => {
	const { t } = useTranslation("invoice_id_page");
	const [open, setOpen] = useState<boolean>(false);
	const [recordPayment, { isLoading }] = useRecordInvoicePaymentMutation();

	const methodOptions = useValueToTranslateLabel(
		INVOICE_PAYMENT_METHOD_LABELS
	);
	const fields = FORM_RECORD_PAYMENT_LIST.map((item) =>
		item.key === ENUM_FORM_RECORD_PAYMENT.METHOD &&
		item.fieldType === "select"
			? { ...item, options: methodOptions }
			: item
	);

	const defaultValues = {
		[ENUM_FORM_RECORD_PAYMENT.AMOUNT]: remainingAmount,
		[ENUM_FORM_RECORD_PAYMENT.METHOD]: ENUM_INVOICE_PAYMENT_METHOD.WIRE
	};

	const form = useForm<TRecordPaymentSchema>({
		resolver: zodResolver(RECORD_PAYMENT_SCHEMA),
		defaultValues,
		mode: "onSubmit"
	});

	const handleOpenChange = (nextOpen: boolean) => {
		if (nextOpen) {
			form.reset(defaultValues);
		}
		setOpen(nextOpen);
	};

	async function onSubmit(data: TRecordPaymentSchema) {
		try {
			await recordPayment({ invoiceId, ...data }).unwrap();
			toast.success(t("record_payment.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			// 422 — нет курса ЦБ для валюты маршрута оплаты
			toast.error(
				t(
					isNoFxRateError(error)
						? "record_payment.form.toasts.no_fx_rate"
						: "record_payment.form.toasts.error"
				)
			);
			console.error("Failed to record invoice payment:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button>{t("record_payment.button")}</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-[40rem]"
			>
				<DialogHeader className="border-b px-6 py-4">
					<DialogTitle>{t("record_payment.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("record_payment.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="flex min-h-0 flex-1 flex-col"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<CustomScroll className="px-6 py-4">
							<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
								{fields.map(({ key, ...item }) => (
									<CustomField
										key={key}
										control={form.control}
										name={key}
										t={t}
										{...item}
									/>
								))}
							</div>
						</CustomScroll>
						<DialogFooter className="border-t px-6 py-4">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									{t("record_payment.form.buttons.cancel")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={isLoading}
								label={t("record_payment.form.buttons.save")}
								loadingLabel={t(
									"record_payment.form.buttons.saving"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

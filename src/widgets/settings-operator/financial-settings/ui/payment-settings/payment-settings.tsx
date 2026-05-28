import { zodResolver } from "@hookform/resolvers/zod";
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
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	OPERATOR_PAYMENT_SETTINGS_SCHEMA,
	type TOperatorPayoutDetailsSchema
} from "@/entities/finance/finance-information";

import { PAYMENT_SETTINGS_LIST } from "../../model";

const PaymentSettingsBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");
	const [open, setOpen] = useState(false);
	const form = useForm<TOperatorPayoutDetailsSchema>({
		resolver: zodResolver(OPERATOR_PAYMENT_SETTINGS_SCHEMA),
		defaultValues: {
			method_type: "",
			internal_label: "",
			account_name_iban: "",
			swift_bic: "",
			currency: "",
			bank_name: "",
			bank_address: "",
			note: ""
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TOperatorPayoutDetailsSchema) {
		try {
			// TODO: интеграция с API/мутаторами
			console.log("Payout details:", data);
			toast.success(t("payment_settings.form.modal.toasts.save.success"));
			setOpen(false);
		} catch (e) {
			toast.error(t("payment_settings.form.modal.toasts.save.error"));
			console.error(e);
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div>
						<Button>{t("payment_settings.form.button")}</Button>
					</div>
				</DialogTrigger>
				<DialogContent onCloseBtn={() => setOpen(false)}>
					<DialogHeader>
						<DialogTitle>
							{t("payment_settings.form.modal.title")}
						</DialogTitle>
						<DialogDescription className="sr-only">
							{t("payment_settings.form.modal.title")}
						</DialogDescription>
					</DialogHeader>
					<Separator />
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<div className="grid grid-cols-2 gap-4">
								{PAYMENT_SETTINGS_LIST.map(
									({ key, ...item }) => (
										<CustomField
											control={form?.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}
							</div>
							<DialogFooter>
								<DialogClose
									asChild
									onClick={() => {
										setOpen(false);
										form.reset();
									}}
								>
									<Button type="reset" variant="outline">
										{t(
											"payment_settings.form.modal.buttons.decline"
										)}
									</Button>
								</DialogClose>
								<Button type="submit">
									{t(
										"payment_settings.form.modal.buttons.save"
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export const PaymentSettings = withErrorBoundary(PaymentSettingsBase);

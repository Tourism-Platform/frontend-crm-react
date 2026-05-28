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
	OPERATOR_CURRENCY_RATE_CREATE_SCHEMA,
	type TOperatorCurrencyRateCreateSchema,
	useCreateOperatorCurrencyRateMutation
} from "@/entities/commission";

import { FORM_OPERATOR_CREATE_CURRENCY_RATE_LIST } from "../model";

export const NewCurrencyRate: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page_operator");
	const [createCurrencyRate, { isLoading }] =
		useCreateOperatorCurrencyRateMutation();
	const form = useForm<TOperatorCurrencyRateCreateSchema>({
		resolver: zodResolver(OPERATOR_CURRENCY_RATE_CREATE_SCHEMA),
		mode: "onSubmit"
	});

	async function onSubmit(data: TOperatorCurrencyRateCreateSchema) {
		try {
			await createCurrencyRate(data).unwrap();
			toast.success(t("currency.currency_rate.form.toasts.success"));
			setOpen(false);
			form.reset();
		} catch (error) {
			toast.error(t("currency.currency_rate.form.toasts.error"));
			console.error("Failed to create currency rate:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("currency.currency_rate.button")}</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="min-w-[700px]"
			>
				<DialogHeader>
					<DialogTitle>
						{t("currency.currency_rate.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("currency.currency_rate.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_OPERATOR_CREATE_CURRENCY_RATE_LIST.map(
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
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t(
										"currency.currency_rate.form.buttons.decline"
									)}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t(
											"currency.currency_rate.form.buttons.saving"
										)
									: t(
											"currency.currency_rate.form.buttons.save"
										)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

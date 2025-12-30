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

import { useCreateCommissionMutation } from "@/entities/commission";

import {
	FORM_NEW_CURRENCY_RATE_LIST,
	NEW_CURRENCY_RATE_SCHEMA,
	type TNewCurrencyRateSchema
} from "../model";

export const NewCurrencyRate: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page");
	const [createCommission, { isLoading }] = useCreateCommissionMutation();
	const form = useForm<TNewCurrencyRateSchema>({
		resolver: zodResolver(NEW_CURRENCY_RATE_SCHEMA),
		mode: "onSubmit"
	});

	async function onSubmit(data: TNewCurrencyRateSchema) {
		try {
			await createCommission(data).unwrap();
			toast.success(
				t("commission_type.new_currency.form.toasts.success")
			);
			setOpen(false);
			form.reset();
		} catch (error) {
			toast.error(t("commission_type.new_currency.form.toasts.error"));
			console.error("Failed to create commission:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("commission_type.new_currency.button")}</Button>
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
				<DialogHeader>
					<DialogTitle>
						{t("commission_type.new_currency.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("commission_type.new_currency.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div>
							{FORM_NEW_CURRENCY_RATE_LIST.map(
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
										"commission_type.new_currency.form.buttons.decline"
									)}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t(
											"commission_type.new_currency.form.buttons.saving"
										)
									: t(
											"commission_type.new_currency.form.buttons.save"
										)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

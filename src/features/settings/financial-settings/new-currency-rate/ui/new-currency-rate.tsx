import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
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
	FORM_NEW_CURRENCY_RATE_LIST,
	NEW_CURRENCY_RATE_SCHEMA,
	type TNewCurrencyRateSchema
} from "../model";

export const NewCurrencyRate: FC = () => {
	const { t } = useTranslation("financial_settings_page");
	const form = useForm<TNewCurrencyRateSchema>({
		resolver: zodResolver(NEW_CURRENCY_RATE_SCHEMA),
		mode: "onSubmit"
	});
	function onSubmit(data: TNewCurrencyRateSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("commission_type.new_currency.button")}</Button>
			</DialogTrigger>
			<DialogContent>
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
							<DialogClose asChild>
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
							<Button type="submit">
								{t(
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

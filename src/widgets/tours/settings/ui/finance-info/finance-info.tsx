import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Form } from "@/shared/ui";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_FINANCE_FORM,
	FINANCE_FORM_LIST,
	FINANCE_FORM_SCHEMA,
	type TFinanceFormSchema
} from "../../model";

export const FinanceInfo: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const form = useForm<TFinanceFormSchema>({
		resolver: zodResolver(FINANCE_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FINANCE_FORM.CURRENCY_TYPE]: ENUM_CURRENCY_OPTIONS.USD,
			[ENUM_FINANCE_FORM.PRICING_VISIBILITY]: "show_from"
		}
	});

	function onSubmit(data: TFinanceFormSchema) {
		console.log("Finance Settings submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<h2 className="text-xl">{t("finance.title")}</h2>
				<div className="grid grid-cols-1 gap-4">
					{FINANCE_FORM_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
				<div className="flex justify-end mt-6">
					<Button type="submit">{t("finance.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

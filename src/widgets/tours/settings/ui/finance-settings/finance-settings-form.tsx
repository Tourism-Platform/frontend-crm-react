import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, Form } from "@/shared/ui";

import {
	FINANCE_FORM_LIST,
	FINANCE_FORM_SCHEMA,
	type TFinanceFormSchema
} from "../../model";

export const FinanceSettingsForm: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const form = useForm<TFinanceFormSchema>({
		resolver: zodResolver(FINANCE_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			currencyType: "usd",
			pricingVisibility: "show_from"
		}
	});

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4">
				{FINANCE_FORM_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={key}
						t={t}
						{...item}
					/>
				))}
			</form>
		</Form>
	);
};

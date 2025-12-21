import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Form } from "@/shared/ui";

import {
	GENERAL_INFO_SCHEMA,
	INFORMATION_DATA_LIST,
	type TGeneralInfoSchema
} from "../../model";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("information_edit_page");
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {
			description: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TGeneralInfoSchema) {
		console.log("Form submitted:", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{INFORMATION_DATA_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={key}
						t={t}
						{...item}
					/>
				))}
				<div className="flex justify-end mt-6">
					<Button>{t("general.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Form } from "@/shared/ui";

import {
	EVENT_DATA_LIST,
	GENERAL_INFO_SCHEMA,
	type TGeneralInfoSchema
} from "../../model";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("event_edit_page");
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {
			event_subtype: "",
			location: "",
			event_start_time: null,
			start_timezone: "",
			event_end_time: null,
			end_timezone: "",
			description: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TGeneralInfoSchema) {
		console.log("Form submitted:", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<h2 className="text-xl">{t("general.events.title")}</h2>
				<div className="grid grid-cols-4 gap-x-4 gap-y-1">
					{EVENT_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							name={key}
							control={form?.control}
							t={t}
							{...item}
						/>
					))}
				</div>

				<Button>SUBMIT</Button>
			</form>
		</Form>
	);
};

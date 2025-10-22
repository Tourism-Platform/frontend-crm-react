import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Form, Separator } from "@/shared/ui";

import {
	GENERAL_INFO_SCHEMA,
	PROPERTIES_LIST,
	type TGeneralInfoSchema
} from "../../model";

import { AccommodationDetails } from "./accommodation-details";
import { Schedule } from "./schedule";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {},
		mode: "onSubmit"
	});
	function onSubmit(data: TGeneralInfoSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<div className="grid grid-cols-2">
					{PROPERTIES_LIST.map(({ key, ...item }) => (
						<CustomField
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
				<Separator />
				<AccommodationDetails form={form} />
				<Separator />
				<Schedule form={form} />

				<Button>SUBMIT</Button>
			</form>
		</Form>
	);
};

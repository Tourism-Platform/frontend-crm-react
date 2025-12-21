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
		defaultValues: {
			property: "",
			amenities: "",
			description: "",
			length_of_stay: "",
			check_in_time: null,
			check_in_timezone: "",
			check_out_time: null,
			check_out_timezone: ""
		},
		mode: "onSubmit"
	});
	function onSubmit() {}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<div className="grid grid-cols-2">
					{PROPERTIES_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
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

				<div className="flex justify-end mt-6">
					<Button>{t("general.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

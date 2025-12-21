import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form, Separator } from "@/shared/ui";

import { GENERAL_INFO_SCHEMA, type TGeneralInfoSchema } from "../../model";

import { DescriptionInfo } from "./description-info";
import { TransportationInfo } from "./transportation-info";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("transportation_edit_page");
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {
			description: "",
			transfer_type: "",
			meet_point: "",
			end_point: "",
			departure_date: null,
			arrival_date: null,
			departure_time: null,
			arrival_time: null,
			departure_timezone: "",
			arrival_timezone: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TGeneralInfoSchema) {
		console.log("Form submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-12"
			>
				<TransportationInfo form={form} />
				<Separator />
				<DescriptionInfo form={form} />

				<div className="flex justify-end mt-6">
					<Button>{t("general.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

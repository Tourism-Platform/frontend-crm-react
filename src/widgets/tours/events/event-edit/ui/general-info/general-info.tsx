import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, Fragment } from "react";
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
			location: "",
			event_start_time: "",
			event_end_time: "",
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
				<div className="grid gap-y-1">
					<div className="grid grid-cols-2 gap-x-4">
						{EVENT_DATA_LIST.slice(0, 2).map(({ key, ...item }) => (
							<Fragment key={key}>
								<CustomField
									key={key}
									name={key}
									control={form?.control}
									t={t}
									{...item}
								/>
								<div />
							</Fragment>
						))}
					</div>
					<div className="grid grid-cols-4 gap-x-4">
						{EVENT_DATA_LIST.slice(2, 6).map(({ key, ...item }) => (
							<CustomField
								key={key}
								name={key}
								control={form?.control}
								t={t}
								{...item}
							/>
						))}
					</div>
					<div>
						{EVENT_DATA_LIST.slice(6, 7).map(({ key, ...item }) => (
							<CustomField
								key={key}
								name={key}
								control={form?.control}
								t={t}
								{...item}
							/>
						))}
					</div>
				</div>

				<Button>SUBMIT</Button>
			</form>
		</Form>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import { CHANGE_ACCOUNT_SCHEMA, type TChangeAccountSchema } from "../model";

import { AvatarSettings } from "./avatar-settings";
import { GeneralSettings } from "./general-settings";
import { PersonalSettings } from "./personal-settings";

export const AccountSettings: FC = () => {
	const { t } = useTranslation("account_settings_page");
	const form = useForm<TChangeAccountSchema>({
		resolver: zodResolver(CHANGE_ACCOUNT_SCHEMA),
		defaultValues: {
			login: "",
			first_name: "",
			last_name: "",
			title: "",
			phone_number: "",
			location: "",
			currency: "USD"
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TChangeAccountSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-5 flex-col max-w-5xl">
					<AvatarSettings />
					<Separator />
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<PersonalSettings form={form} />
							<Separator />
							<GeneralSettings form={form} />
							<div>
								<Button>{t("form.buttons.save")}</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</section>
	);
};

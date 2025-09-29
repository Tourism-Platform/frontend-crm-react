import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import { CHANGE_ACCOUNT_SCHEMA, type TChangeAccountSchema } from "../model";

import { AvatarInfo } from "./avatar-info";
import { GeneralInfo } from "./general-info";
import { PersonalInfo } from "./personal-info";

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
					<AvatarInfo />
					<Separator />
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<PersonalInfo form={form} />
							<Separator />
							<GeneralInfo form={form} />
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

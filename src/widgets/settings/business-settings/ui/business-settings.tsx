import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import { CHANGE_BUSINESS_SCHEMA, type TChangeBusinessSchema } from "../model";

import { AddressInfo } from "./address-info";
import { AvatarInfo } from "./avatar-info";
import { BusinessInfo } from "./business-info";
import { ContactInfo } from "./contact-info";
import { DocumentsInfo } from "./documents-info";
import { LegalInfo } from "./legal-info";

export const BusinessSettings: FC = () => {
	const { t } = useTranslation("business_settings_page");
	const form = useForm<TChangeBusinessSchema>({
		resolver: zodResolver(CHANGE_BUSINESS_SCHEMA),
		defaultValues: {
			business: {
				business_name: "",
				business_description: "",
				business_website: ""
			},
			legal: {
				legal_company_name: "",
				director: "",
				tin: "",
				type_of_business: "",
				business_name: "",
				business_website: ""
			},
			address: {
				address_line: "",
				country: "",
				city: ""
			},
			contact: {
				contact_person: "",
				position: "",
				phone_number: "",
				email: ""
			}
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TChangeBusinessSchema) {
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
							<BusinessInfo form={form} />
							<Separator />
							<LegalInfo form={form} />
							<Separator />
							<AddressInfo form={form} />
							<Separator />
							<ContactInfo form={form} />
							<Separator />
							<DocumentsInfo />
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

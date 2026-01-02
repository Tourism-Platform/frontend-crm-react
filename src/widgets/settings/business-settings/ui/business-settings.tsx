import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import {
	BUSINESS_SCHEMA,
	type TBusinessSchema,
	useGetBusinessInfoQuery,
	useUpdateBusinessInfoMutation
} from "@/entities/user";

import { AddressInfo } from "./address-info";
import { AvatarInfo } from "./avatar-info";
import { BusinessInfo } from "./business-info";
import { ContactInfo } from "./contact-info";
import { DocumentsInfo } from "./documents-info";
import { LegalInfo } from "./legal-info";

export const BusinessSettings: FC = () => {
	const { t } = useTranslation("business_settings_page");

	const {
		data: businessData,
		isLoading: isBusinessLoading,
		isError: isBusinessError
	} = useGetBusinessInfoQuery();
	const [updateBusiness, { isLoading: isUpdating }] =
		useUpdateBusinessInfoMutation();

	const form = useForm<TBusinessSchema>({
		resolver: zodResolver(BUSINESS_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (businessData) {
			form.reset(businessData);
		}
	}, [businessData, form.reset]);

	useEffect(() => {
		if (isBusinessError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isBusinessError, t]);

	async function onSubmit(data: TBusinessSchema) {
		try {
			await updateBusiness(data).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-5 flex-col max-w-5xl">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<AvatarInfo form={form} />
							<Separator />
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
								<Button
									type="submit"
									disabled={isUpdating || isBusinessLoading}
								>
									{isUpdating || isBusinessLoading ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											{isBusinessLoading
												? t("form.buttons.loading")
												: t("form.buttons.saving")}
										</>
									) : (
										t("form.buttons.save")
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</section>
	);
};

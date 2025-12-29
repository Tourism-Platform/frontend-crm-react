import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import {
	ACCOUNT_SCHEMA,
	type TAccountSchema,
	useGetAccountQuery,
	useUpdateAccountMutation
} from "@/entities/user";

import { AvatarInfo } from "./avatar-info";
import { GeneralInfo } from "./general-info";
import { PersonalInfo } from "./personal-info";

export const AccountSettings: FC = () => {
	const { t } = useTranslation("account_settings_page");

	const { data: accountData, isLoading: isAccountLoading } =
		useGetAccountQuery();
	const [updateAccount, { isLoading: isUpdating }] =
		useUpdateAccountMutation();

	const form = useForm<TAccountSchema>({
		resolver: zodResolver(ACCOUNT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (accountData) {
			form.reset(accountData);
		}
	}, [accountData, form.reset]);

	async function onSubmit(data: TAccountSchema) {
		try {
			await updateAccount(data).unwrap();
			console.log("Form updated successfully");
		} catch (error) {
			console.error("Failed to update account:", error);
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
							<PersonalInfo form={form} />
							<Separator />
							<GeneralInfo form={form} />
							<div>
								<Button
									type="submit"
									disabled={isUpdating || isAccountLoading}
								>
									{isAccountLoading || isUpdating ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											{isAccountLoading
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

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	Separator
} from "@/shared/ui";

import {
	CHANGE_PASSWORD_SCHEMA,
	FORM_CHANGE_PASSWORD_LIST,
	type TChangePasswordSchema
} from "../model";

export const ChangePassword: FC = () => {
	const { t } = useTranslation("security_page");
	const form = useForm<TChangePasswordSchema>({
		resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_password: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TChangePasswordSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("change_password")}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{FORM_CHANGE_PASSWORD_LIST.map((item) => (
							<CustomField
								control={form?.control}
								name={item?.key}
								label={item?.label}
								placeholder={item?.placeholder}
								t={t}
								fieldType="password"
							/>
						))}
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit">
								{t("form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

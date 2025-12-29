import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
	ENUM_FORM_CHANGE_PASSWORD,
	type TChangePasswordSchema,
	useChangePasswordMutation
} from "@/entities/user";

import { FORM_CHANGE_PASSWORD_LIST } from "../model";

export const ChangePassword: FC = () => {
	const { t } = useTranslation("security_page");
	const [open, setOpen] = useState<boolean>(false);
	const [changePassword, { isLoading, error }] = useChangePasswordMutation();

	const form = useForm<TChangePasswordSchema>({
		resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
		mode: "onSubmit"
	});

	async function onSubmit(data: TChangePasswordSchema) {
		try {
			await changePassword(data).unwrap();
			toast.success(t("form.toasts.success"));
			form.reset();
			setOpen(false);
		} catch (error) {
			toast.error(t("form.toasts.error"));
			console.log("Error changing password:", error);
		}
	}

	const handleClose = () => {
		form.reset();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("change_password")}</Button>
			</DialogTrigger>
			<DialogContent onCloseBtn={handleClose}>
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
						{FORM_CHANGE_PASSWORD_LIST.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form?.control}
								name={key}
								t={t}
								{...item}
								externalError={
									key ===
										ENUM_FORM_CHANGE_PASSWORD.CURRENT_PASSWORD &&
									error &&
									(error as FetchBaseQueryError).status ===
										400
										? "form.current_password.errors.incorrect"
										: undefined
								}
							/>
						))}
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={handleClose}
								>
									{t("form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{t("form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

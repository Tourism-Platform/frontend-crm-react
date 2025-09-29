import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	PasswordInput,
	Separator
} from "@/shared/ui";

import {
	CHANGE_PASSWORD_SCHEMA,
	FORM_CHANGE_PASSWORD_LIST
} from "../model/config";

export const ChangePassword: FC = () => {
	const { t } = useTranslation("security_page");
	const schema = CHANGE_PASSWORD_SCHEMA;
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_password: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: z.infer<typeof schema>) {
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
							<FormField
								key={item?.key}
								control={form.control}
								name={item?.key}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t(item?.label)}:</FormLabel>
										<FormControl>
											<PasswordInput
												placeholder={t(
													item?.placeholder
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage t={t} />
									</FormItem>
								)}
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

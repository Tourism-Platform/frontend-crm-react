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
	FORM_INVITE_STAFF_LIST,
	INVITE_STAFF_SCHEMA,
	type TAddStaffSchema
} from "../model";

export const InviteStaff: FC = () => {
	const { t } = useTranslation("staff_information_page");
	const form = useForm<TAddStaffSchema>({
		resolver: zodResolver(INVITE_STAFF_SCHEMA),
		mode: "onSubmit"
	});
	function onSubmit(data: TAddStaffSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("invite.button")}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("invite.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("invite.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div>
							{FORM_INVITE_STAFF_LIST.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form?.control}
									name={key}
									t={t}
									{...item}
								/>
							))}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("invite.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit">
								{t("invite.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

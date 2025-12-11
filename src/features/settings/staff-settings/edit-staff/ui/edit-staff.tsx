import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
	Separator
} from "@/shared/ui";

import { EDIT_STAFF_SCHEMA, type TEditStaffSchema } from "../model";

import { Commission } from "./commission";
import { PersonalDetails } from "./personal-details";

interface IEditStaffProps {
	trigger: ReactNode;
	className?: string;
}

export const EditStaff: FC<IEditStaffProps> = ({ trigger, className }) => {
	const { t } = useTranslation("staff_information_page");
	const form = useForm<TEditStaffSchema>({
		resolver: zodResolver(EDIT_STAFF_SCHEMA),
		defaultValues: {
			// name: "",
			// email: "",
			// role: STAFF_OPTIONS?.[0]?.value || "",
			// status: STAFF_STATUS_OPTIONS?.[0]?.value || "",
			// type: COMMISSION_OPTIONS?.[0]?.value || "",
			// split: 0
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TEditStaffSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="min-w-[750px]">
				<DialogHeader>
					<DialogTitle>{t("menu.edit.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.edit.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div>
							<PersonalDetails form={form} />
							<Commission form={form} />
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("menu.edit.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit">
								{t("menu.edit.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

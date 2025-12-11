import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { COMMISSION_OPTIONS } from "@/shared/config";
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

import type {
	ENUM_STAFF_ROLE_OPTIONS_TYPE,
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	IStaffUser
} from "@/entities/staff";

import { EDIT_STAFF_SCHEMA, type TEditStaffSchema } from "../model";

import { Commission } from "./commission";
import { PersonalDetails } from "./personal-details";

interface IEditStaffProps {
	trigger: ReactNode;
	className?: string;
	user?: IStaffUser;
	onEdit?: (id: string, data: Partial<IStaffUser>) => void;
}

export const EditStaff: FC<IEditStaffProps> = ({
	trigger,
	className,
	user,
	onEdit
}) => {
	const { t } = useTranslation("staff_information_page");
	const form = useForm<TEditStaffSchema>({
		resolver: zodResolver(EDIT_STAFF_SCHEMA),
		defaultValues: {
			name: user ? `${user.firstName} ${user.lastName}` : "",
			email: user?.email || "",
			role: user?.role,
			status: user?.status,
			type: COMMISSION_OPTIONS?.[0]?.value,
			split: user?.split || 0
		},
		mode: "onSubmit"
	});

	console.log(form.watch());

	function onSubmit(data: TEditStaffSchema) {
		console.log("Form submitted:", data);
		if (onEdit && user) {
			// Split name back to first and last
			const [firstName, ...rest] = data.name.split(" ");
			const lastName = rest.join(" ");

			onEdit(user.id!, {
				firstName,
				lastName,
				email: data.email,
				role: data.role as ENUM_STAFF_ROLE_OPTIONS_TYPE,
				status: data.status as ENUM_STAFF_STATUS_OPTIONS_TYPE,
				split: data.split
			});
		}
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

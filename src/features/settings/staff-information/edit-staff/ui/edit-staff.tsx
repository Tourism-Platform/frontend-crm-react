import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { type FC, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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

import { type IStaffUser, useUpdateStaffMutation } from "@/entities/staff";

import { EDIT_STAFF_SCHEMA, type TEditStaffSchema } from "../model";

import { Commission } from "./commission";
import { PersonalDetails } from "./personal-details";

interface IEditStaffProps {
	trigger: ReactNode;
	className?: string;
	user?: IStaffUser;
}

export const EditStaff: FC<IEditStaffProps> = ({
	trigger,
	className,
	user
}) => {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation("staff_information_page");
	const [updateStaff, { isLoading }] = useUpdateStaffMutation();
	const form = useForm<TEditStaffSchema>({
		resolver: zodResolver(EDIT_STAFF_SCHEMA),
		defaultValues: {
			first_name: user?.first_name || "",
			last_name: user?.last_name || "",
			email: user?.email || "",
			role: user?.role,
			status: user?.status,
			type: user?.type,
			split: user?.split || 0
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TEditStaffSchema) {
		if (user) {
			try {
				await updateStaff({
					id: user.id!,
					data: data
				}).unwrap();
				toast.success(t("menu.edit.form.toasts.success"));
				setOpen(false);
			} catch (error) {
				toast.error(t("menu.edit.form.toasts.error"));
				console.error("Failed to update staff:", error);
			}
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("menu.edit.form.buttons.saving")
									: t("menu.edit.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

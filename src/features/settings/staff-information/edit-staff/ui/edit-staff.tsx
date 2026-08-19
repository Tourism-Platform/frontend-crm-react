import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { type FC, type ReactNode, useEffect } from "react";
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

import {
	EDIT_STAFF_SCHEMA,
	ENUM_FORM_EDIT_STAFF,
	type IStaffUser,
	type TEditStaffSchema,
	useGetStaffMemberPermissionsQuery,
	useReplaceStaffMemberAccessMutation,
	useUpdateStaffMutation
} from "@/entities/staff";

import { Access } from "./access";
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
	const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();
	const [replaceAccess, { isLoading: isReplacingAccess }] =
		useReplaceStaffMemberAccessMutation();
	const { data: access } = useGetStaffMemberPermissionsQuery(user?.id ?? "", {
		skip: !open || !user?.id
	});
	const form = useForm<TEditStaffSchema>({
		resolver: zodResolver(EDIT_STAFF_SCHEMA),
		defaultValues: {
			[ENUM_FORM_EDIT_STAFF.FIRST_NAME]: user?.firstName || "",
			[ENUM_FORM_EDIT_STAFF.LAST_NAME]: user?.lastName || "",
			[ENUM_FORM_EDIT_STAFF.EMAIL]: user?.email || "",
			[ENUM_FORM_EDIT_STAFF.STATUS]: user?.status,
			[ENUM_FORM_EDIT_STAFF.TYPE]: user?.type,
			[ENUM_FORM_EDIT_STAFF.SPLIT]: user?.split || 0,
			[ENUM_FORM_EDIT_STAFF.PERMISSIONS]: []
		},
		mode: "onSubmit"
	});

	useEffect(() => {
		if (!user) return;

		form.reset({
			[ENUM_FORM_EDIT_STAFF.FIRST_NAME]: user.firstName || "",
			[ENUM_FORM_EDIT_STAFF.LAST_NAME]: user.lastName || "",
			[ENUM_FORM_EDIT_STAFF.EMAIL]: user.email || "",
			[ENUM_FORM_EDIT_STAFF.STATUS]: user.status,
			[ENUM_FORM_EDIT_STAFF.TYPE]: user.type,
			[ENUM_FORM_EDIT_STAFF.SPLIT]: user.split || 0,
			[ENUM_FORM_EDIT_STAFF.PERMISSIONS]: access?.direct ?? []
		});
	}, [user, access, form]);

	const isLoading = isUpdating || isReplacingAccess;

	async function onSubmit(data: TEditStaffSchema) {
		if (!user?.id) return;

		try {
			await Promise.all([
				updateStaff({
					id: user.id,
					data
				}).unwrap(),
				replaceAccess({
					id: user.id,
					data: {
						permissions: data.permissions,
						groupIds: access?.groupIds ?? []
					}
				}).unwrap()
			]);
			toast.success(t("menu.edit.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("menu.edit.form.toasts.error"));
			console.error("Failed to update staff:", error);
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
							<Access form={form} />
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

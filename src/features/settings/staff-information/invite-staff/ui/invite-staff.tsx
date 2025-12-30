import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
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

import { useCreateStaffMutation } from "@/entities/staff";

import {
	FORM_INVITE_STAFF_LIST,
	INVITE_STAFF_SCHEMA,
	type TAddStaffSchema
} from "../model";

export const InviteStaff: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("staff_information_page");
	const [createStaff, { isLoading }] = useCreateStaffMutation();

	const form = useForm<TAddStaffSchema>({
		resolver: zodResolver(INVITE_STAFF_SCHEMA),
		mode: "onSubmit"
	});

	async function onSubmit(data: TAddStaffSchema) {
		try {
			await createStaff({
				email: data.email,
				role: data.role
			}).unwrap();
			toast.success(t("invite.form.toasts.success"));
			setOpen(false);
			form.reset();
		} catch (error) {
			toast.error(t("invite.form.toasts.error"));
			console.error("Failed to create staff:", error);
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("invite.button")}</Button>
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
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
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("invite.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("invite.form.buttons.saving")
									: t("invite.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

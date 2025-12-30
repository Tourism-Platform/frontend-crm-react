import { Loader } from "lucide-react";
import React, { type FC, type ReactNode } from "react";
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
	Separator
} from "@/shared/ui";

import { useDeleteStaffMutation } from "@/entities/staff";

interface IDeleteStaffProps {
	trigger: ReactNode;
	className?: string;
	id?: string;
}

export const DeleteStaff: FC<IDeleteStaffProps> = ({
	trigger,
	className,
	id
}) => {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation("staff_information_page");
	const [deleteStaff, { isLoading }] = useDeleteStaffMutation();

	async function handleDelete() {
		if (id) {
			try {
				await deleteStaff(id).unwrap();
				toast.success(t("menu.delete.form.toasts.success"));
				setOpen(false);
			} catch (error) {
				toast.error(t("menu.delete.form.toasts.error"));
				console.error("Failed to delete staff:", error);
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>{t("menu.delete.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("menu.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							{t("menu.delete.form.buttons.decline")}
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("menu.delete.form.buttons.confirming")
							: t("menu.delete.form.buttons.confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

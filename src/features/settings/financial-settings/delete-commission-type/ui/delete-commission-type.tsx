import { Loader } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";
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

import { useDeleteCommissionMutation } from "@/entities/commission";

interface IDeleteCommissionTypeProps {
	id: string;
	trigger: ReactNode;
	className?: string;
}

export const DeleteCommissionType: FC<IDeleteCommissionTypeProps> = ({
	id,
	trigger,
	className
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page");
	const [deleteCommission, { isLoading }] = useDeleteCommissionMutation();

	async function handleDelete() {
		try {
			await deleteCommission(id).unwrap();
			toast.success(t("commission_type.menu.delete.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("commission_type.menu.delete.form.toasts.error"));
			console.error("Failed to delete commission:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent
				className="max-w-[450px]"
				onCloseBtn={() => setOpen(false)}
			>
				<DialogHeader>
					<DialogTitle>
						{t("commission_type.menu.delete.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("commission_type.menu.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("commission_type.menu.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild onClick={() => setOpen(false)}>
						<Button type="button" variant="outline">
							{t(
								"commission_type.menu.delete.form.buttons.decline"
							)}
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
							? t(
									"commission_type.menu.delete.form.buttons.confirming"
								)
							: t(
									"commission_type.menu.delete.form.buttons.confirm"
								)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

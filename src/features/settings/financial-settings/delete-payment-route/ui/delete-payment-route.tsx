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

import { useDeletePaymentRouteMutation } from "@/entities/finance/finance-information";

interface IDeletePaymentRouteProps {
	id: string;
	trigger: ReactNode;
	className?: string;
}

export const DeletePaymentRoute: FC<IDeletePaymentRouteProps> = ({
	id,
	trigger,
	className
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page_operator");
	const [deletePaymentRoute, { isLoading }] = useDeletePaymentRouteMutation();

	async function handleDelete() {
		try {
			await deletePaymentRoute(id).unwrap();
			toast.success(t("payment_settings.form.delete.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("payment_settings.form.delete.toasts.error"));
			console.error("Failed to delete payment route:", error);
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
						{t("payment_settings.form.delete.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("payment_settings.form.delete.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("payment_settings.form.delete.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild onClick={() => setOpen(false)}>
						<Button type="button" variant="outline">
							{t("payment_settings.form.delete.buttons.decline")}
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
									"payment_settings.form.delete.buttons.confirming"
								)
							: t("payment_settings.form.delete.buttons.confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

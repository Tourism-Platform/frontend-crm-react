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
	LoaderButton,
	Separator
} from "@/shared/ui";

import { useDeleteOperatorCurrencyRateMutation } from "@/entities/commission";

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
	const { t } = useTranslation("financial_settings_page_operator");
	const [deleteCurrencyRate, { isLoading }] =
		useDeleteOperatorCurrencyRateMutation();

	async function handleDelete() {
		try {
			await deleteCurrencyRate(id).unwrap();
			toast.success(
				t("currency.commission_type.menu.delete.form.toasts.success")
			);
			setOpen(false);
		} catch (error) {
			toast.error(
				t("currency.commission_type.menu.delete.form.toasts.error")
			);
			console.error("Failed to delete currency rate:", error);
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
						{t("currency.commission_type.menu.delete.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("currency.commission_type.menu.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("currency.commission_type.menu.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild onClick={() => setOpen(false)}>
						<Button type="button" variant="outline">
							{t(
								"currency.commission_type.menu.delete.form.buttons.decline"
							)}
						</Button>
					</DialogClose>
					<LoaderButton
						type="button"
						variant="destructive"
						onClick={handleDelete}
						isLoading={isLoading}
						label={t(
							"currency.commission_type.menu.delete.form.buttons.confirm"
						)}
						loadingLabel={t(
							"currency.commission_type.menu.delete.form.buttons.confirming"
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

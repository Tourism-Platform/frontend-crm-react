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

import { useDeleteOptionMutation } from "@/entities/tour";

interface IDeleteOptionProps {
	tourId: string;
	optionId: string;
	trigger: ReactNode;
	className?: string;
	onDeleted?: () => void;
}

export const DeleteOption: FC<IDeleteOptionProps> = ({
	tourId,
	optionId,
	trigger,
	className,
	onDeleted
}) => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation("tour_itinerary_page");
	const [deleteOption, { isLoading }] = useDeleteOptionMutation();

	async function handleDelete() {
		try {
			await deleteOption({ tourId, optionId }).unwrap();
			toast.success(t("option.delete.form.toasts.success"));
			setOpen(false);
			onDeleted?.();
		} catch (error) {
			toast.error(t("option.delete.form.toasts.error"));
			console.error("Failed to delete option:", error);
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
					<DialogTitle>{t("option.delete.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("option.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("option.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild onClick={() => setOpen(false)}>
						<Button type="button" variant="outline">
							{t("option.delete.form.buttons.decline")}
						</Button>
					</DialogClose>
					<LoaderButton
						type="button"
						variant="destructive"
						onClick={handleDelete}
						isLoading={isLoading}
						label={t("option.delete.form.buttons.confirm")}
						loadingLabel={t(
							"option.delete.form.buttons.confirming"
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

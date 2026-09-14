import { Trash2Icon } from "lucide-react";
import { type FC, useState } from "react";
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

import { useDeleteVariantMutation } from "@/entities/supplier";

type TProductVariantPageNs =
	| "hotel_product_edit_page"
	| "train_product_edit_page"
	| "flight_product_edit_page"
	| "bus_product_edit_page"
	| "transfer_product_edit_page"
	| "activity_product_edit_page";

interface IDeleteProductVariantProps {
	supplierId: string;
	productId: string;
	variantId: string;
	variantName: string;
	ns: TProductVariantPageNs;
}

export const DeleteProductVariant: FC<IDeleteProductVariantProps> = ({
	supplierId,
	productId,
	variantId,
	variantName,
	ns
}) => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation(ns);
	const [deleteVariant, { isLoading }] = useDeleteVariantMutation();

	async function handleDelete() {
		try {
			await deleteVariant({
				supplierId,
				productId,
				variantId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					type="button"
					size="lg"
					className="w-full"
					variant="destructive"
				>
					<Trash2Icon className="size-4" />
					{t("form.variants.buttons.delete")}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>
						{t("form.variants.delete_dialog.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("form.variants.delete_dialog.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("form.variants.delete_dialog.warning", {
							name: variantName
						})}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							{t("form.variants.delete_dialog.cancel")}
						</Button>
					</DialogClose>
					<LoaderButton
						type="button"
						variant="destructive"
						onClick={handleDelete}
						isLoading={isLoading}
						label={t("form.variants.delete_dialog.confirm")}
						loadingLabel={t(
							"form.variants.delete_dialog.confirming"
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

import { MoreHorizontal } from "lucide-react";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	LoaderButton,
	Separator
} from "@/shared/ui";

import { useDeleteVariantMutation } from "@/entities/supplier";

interface IVariantsMenuProps {
	supplierId: string;
	productId: string;
	variantId: string;
	variantName: string;
}

export const VariantsMenu: FC<IVariantsMenuProps> = ({
	supplierId,
	productId,
	variantId,
	variantName
}) => {
	const { t } = useTranslation("activity_product_edit_page");
	const [open, setOpen] = useState(false);
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
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"ghost"}
						size={"icon"}
						type="button"
						className="hover:!bg-transparent !text-muted-foreground"
					>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setOpen(true)}>
						{t("form.variants.buttons.delete")}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-[450px]">
					<DialogHeader>
						<DialogTitle>
							{t("form.variants.delete_dialog.title")}
						</DialogTitle>
						<DialogDescription>
							{t("form.variants.delete_dialog.warning", {
								name: variantName
							})}
						</DialogDescription>
					</DialogHeader>
					<Separator />
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								{t("form.variants.delete_dialog.cancel")}
							</Button>
						</DialogClose>
						<LoaderButton
							type="button"
							variant="destructive"
							isLoading={isLoading}
							onClick={handleDelete}
							label={t("form.variants.delete_dialog.confirm")}
							loadingLabel={t(
								"form.variants.delete_dialog.confirming"
							)}
						/>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

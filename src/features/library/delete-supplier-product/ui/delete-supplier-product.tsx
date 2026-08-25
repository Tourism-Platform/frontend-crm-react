import { Loader } from "lucide-react";
import React, { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type {
	THotelProductEditPageKeys,
	TSupplierIdPageKeys,
	TTrainProductEditPageKeys
} from "@/shared/config";
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

import { useDeleteSupplierProductMutation } from "@/entities/supplier";

type TDeleteProductNs =
	| "hotel_product_edit_page"
	| "train_product_edit_page"
	| "supplier_id_page";

type TProductDeleteKeys =
	| THotelProductEditPageKeys
	| TTrainProductEditPageKeys
	| TSupplierIdPageKeys;

const PRODUCT_DELETE_KEYS: Record<
	TDeleteProductNs,
	{
		title: TProductDeleteKeys;
		warning: TProductDeleteKeys;
		decline: TProductDeleteKeys;
		confirm: TProductDeleteKeys;
		confirming: TProductDeleteKeys;
		success: TProductDeleteKeys;
		error: TProductDeleteKeys;
	}
> = {
	hotel_product_edit_page: {
		title: "menu.delete.form.title",
		warning: "menu.delete.form.warning",
		decline: "menu.delete.form.buttons.decline",
		confirm: "menu.delete.form.buttons.confirm",
		confirming: "menu.delete.form.buttons.confirming",
		success: "menu.delete.form.toasts.success",
		error: "menu.delete.form.toasts.error"
	},
	train_product_edit_page: {
		title: "menu.delete.form.title",
		warning: "menu.delete.form.warning",
		decline: "menu.delete.form.buttons.decline",
		confirm: "menu.delete.form.buttons.confirm",
		confirming: "menu.delete.form.buttons.confirming",
		success: "menu.delete.form.toasts.success",
		error: "menu.delete.form.toasts.error"
	},
	supplier_id_page: {
		title: "products.menu.delete.form.title",
		warning: "products.menu.delete.form.warning",
		decline: "products.menu.delete.form.buttons.decline",
		confirm: "products.menu.delete.form.buttons.confirm",
		confirming: "products.menu.delete.form.buttons.confirming",
		success: "products.menu.delete.form.toasts.success",
		error: "products.menu.delete.form.toasts.error"
	}
};

interface IDeleteSupplierProductProps {
	supplierId: string;
	productId: string;
	trigger: ReactNode;
	onSuccess?: () => void;
	ns?: TDeleteProductNs;
	className?: string;
}

export const DeleteSupplierProduct: FC<IDeleteSupplierProductProps> = ({
	supplierId,
	productId,
	trigger,
	onSuccess,
	ns = "hotel_product_edit_page",
	className
}) => {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation(ns);
	const [deleteSupplierProduct, { isLoading }] =
		useDeleteSupplierProductMutation();
	const keys = PRODUCT_DELETE_KEYS[ns];

	async function handleDelete() {
		if (!supplierId || !productId) return;
		try {
			await deleteSupplierProduct({ supplierId, productId }).unwrap();
			toast.success(t(keys.success));
			setOpen(false);
			onSuccess?.();
		} catch (error) {
			toast.error(t(keys.error));
			console.error("Failed to delete supplier product:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>{t(keys.title)}</DialogTitle>
					<DialogDescription className="sr-only">
						{t(keys.title)}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t(keys.warning)}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							{t(keys.decline)}
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
						{isLoading ? t(keys.confirming) : t(keys.confirm)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

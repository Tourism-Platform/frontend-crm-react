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
	LoaderButton,
	Separator
} from "@/shared/ui";

import { useDeleteSupplierProductMutation } from "@/entities/supplier";

import { PRODUCT_DELETE_KEYS, type TDeleteProductNs } from "../model";

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
					<LoaderButton
						type="button"
						variant="destructive"
						onClick={handleDelete}
						isLoading={isLoading}
						label={t(keys.confirm)}
						loadingLabel={t(keys.confirming)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

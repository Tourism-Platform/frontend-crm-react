import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

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
	Form,
	Separator
} from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import {
	FORM_ATTACH_PRODUCT_SEARCH_LIST,
	useAttachEventProductDialog
} from "../model";

import { ProductList } from "./product-list";

interface IAttachEventProductDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	initialProductId?: string;
	initialVariantId?: string | null;
	isSubmitting?: boolean;
	onConfirm: (link: IEventProductLink) => void | Promise<void>;
}

export const AttachEventProductDialog: FC<IAttachEventProductDialogProps> = ({
	open,
	onOpenChange,
	typ,
	initialProductId,
	initialVariantId,
	isSubmitting,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");
	const {
		form,
		products,
		selectedProductId,
		selectedProduct,
		isFetching,
		isError,
		refetch,
		variantField,
		handleSelectProduct,
		handleConfirm
	} = useAttachEventProductDialog({
		open,
		typ,
		initialProductId,
		initialVariantId,
		onConfirm
	});

	const { key: variantKey, ...variantItem } = variantField;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[640px] max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{t("attach_product.dialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("attach_product.dialog.description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<div className="grid gap-4">
						{FORM_ATTACH_PRODUCT_SEARCH_LIST.map(
							({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={key}
									t={t}
									{...item}
								/>
							)
						)}
						<ProductList
							products={products}
							selectedProductId={selectedProductId}
							isFetching={isFetching}
							isError={isError}
							onSelect={handleSelectProduct}
							onRetry={() => refetch()}
						/>
						{selectedProduct ? (
							<>
								<Separator />
								<CustomField
									key={variantKey}
									control={form.control}
									name={variantKey}
									t={t}
									{...variantItem}
								/>
							</>
						) : null}
					</div>
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="outline"
							disabled={isSubmitting}
						>
							{t("attach_product.dialog.cancel")}
						</Button>
					</DialogClose>
					<Button
						type="button"
						onClick={handleConfirm}
						disabled={!selectedProductId || isSubmitting}
					>
						{isSubmitting ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						{isSubmitting
							? t("attach_product.dialog.confirming")
							: t("attach_product.dialog.confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

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
	LoaderButton,
	Separator
} from "@/shared/ui";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	SupplierProductOptionCard,
	SupplierProductOptionCardSkeleton,
	type TSupplierProductSelectOption
} from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import {
	ENUM_FORM_ATTACH_PRODUCT,
	useAttachEventProductDialog
} from "../model";

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
	const { form, products, selectedProduct, variantField, onSubmit } =
		useAttachEventProductDialog({
			open,
			typ,
			initialProductId,
			initialVariantId,
			onConfirm
		});

	const { key: variantKey, ...variantItem } = variantField;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex min-h-[36rem] flex-col gap-4 sm:max-w-[52rem]">
				<DialogHeader>
					<DialogTitle>
						{t("attach_product.dialog.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("attach_product.dialog.description")}
					</DialogDescription>
				</DialogHeader>
				<Separator />

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-1 flex-col space-y-6"
					>
						<CustomField
							fieldType="asyncSelect"
							control={form.control}
							name={ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID}
							t={t}
							label="attach_product.dialog.fields.product.label"
							placeholder="attach_product.dialog.fields.product.placeholder"
							emptyText="attach_product.dialog.fields.product.empty"
							options={products.options}
							onQueryChange={products.setQuery}
							onLoadMore={products.loadMore}
							hasMore={products.hasMore}
							isLoading={products.isLoading}
							isLoadingMore={products.isLoadingMore}
							renderOption={(option) => (
								<SupplierProductOptionCard
									option={
										option as TSupplierProductSelectOption
									}
								/>
							)}
							renderSkeleton={() => (
								<SupplierProductOptionCardSkeleton />
							)}
						/>
						{selectedProduct ? (
							<CustomField
								key={variantKey}
								control={form.control}
								name={variantKey}
								t={t}
								{...variantItem}
							/>
						) : null}
						<DialogFooter className="mt-auto">
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
									disabled={isSubmitting}
								>
									{t("attach_product.dialog.cancel")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={Boolean(isSubmitting)}
								label={t("attach_product.dialog.confirm")}
								loadingLabel={t(
									"attach_product.dialog.confirming"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

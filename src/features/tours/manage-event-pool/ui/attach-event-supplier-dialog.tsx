import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
	SupplierOptionCard,
	SupplierOptionCardSkeleton,
	type TSupplierSelectOption,
	useSupplierSearchOptions
} from "@/entities/supplier";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	type TAddPoolMemberIntent
} from "@/entities/tour";

import {
	ATTACH_SUPPLIER_PICKER_SCHEMA,
	ENUM_FORM_ATTACH_SUPPLIER,
	type TAttachSupplierPickerSchema,
	resolvePoolErrorMessage
} from "../model";

interface IAttachEventSupplierDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	supplierTyp: ENUM_SUPPLIER_TYPE_TYPE;
	isSubmitting?: boolean;
	onAdd: (intent: TAddPoolMemberIntent) => Promise<void>;
	onAdded?: () => void;
}

export const AttachEventSupplierDialog: FC<IAttachEventSupplierDialogProps> = ({
	open,
	onOpenChange,
	eventTyp,
	supplierTyp,
	isSubmitting,
	onAdd,
	onAdded
}) => {
	const { t } = useTranslation("common_events");
	const suppliers = useSupplierSearchOptions({
		supplierTyp,
		enabled: open
	});

	const form = useForm<TAttachSupplierPickerSchema>({
		resolver: zodResolver(ATTACH_SUPPLIER_PICKER_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (!open) {
			return;
		}
		form.reset();
	}, [open, form]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			form.reset();
		}
		onOpenChange(nextOpen);
	};

	async function onSubmit(data: TAttachSupplierPickerSchema) {
		try {
			await onAdd({
				kind: "supplier",
				typ: eventTyp,
				supplierId: data[ENUM_FORM_ATTACH_SUPPLIER.SUPPLIER_ID]
			});
			onOpenChange(false);
			onAdded?.();
			toast.success(t("pool.toasts.add.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.add.error"))
			);
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="flex min-h-[36rem] flex-col gap-4 sm:max-w-[52rem]">
				<DialogHeader>
					<DialogTitle>
						{t("pool.attach_supplier.dialog.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("pool.attach_supplier.dialog.description")}
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
							name={ENUM_FORM_ATTACH_SUPPLIER.SUPPLIER_ID}
							t={t}
							label="pool.attach_supplier.dialog.fields.supplier.label"
							placeholder="pool.attach_supplier.dialog.fields.supplier.placeholder"
							emptyText="pool.attach_supplier.dialog.fields.supplier.empty"
							options={suppliers.options}
							onQueryChange={suppliers.setQuery}
							onLoadMore={suppliers.loadMore}
							hasMore={suppliers.hasMore}
							isLoading={suppliers.isLoading}
							isLoadingMore={suppliers.isLoadingMore}
							renderOption={(option) => (
								<SupplierOptionCard
									option={option as TSupplierSelectOption}
								/>
							)}
							renderSkeleton={() => (
								<SupplierOptionCardSkeleton />
							)}
						/>
						<DialogFooter className="mt-auto">
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
									disabled={isSubmitting}
								>
									{t("pool.attach_supplier.dialog.cancel")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={Boolean(isSubmitting)}
								label={t("pool.attach_supplier.dialog.confirm")}
								loadingLabel={t(
									"pool.attach_supplier.dialog.confirming"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

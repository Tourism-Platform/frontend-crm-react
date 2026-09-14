import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC, useState } from "react";
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
	DialogTrigger,
	Form,
	LoaderButton,
	Separator
} from "@/shared/ui";

import { useCreateVariantMutation } from "@/entities/supplier";

import {
	CREATE_PRODUCT_VARIANT_NAME_FIELD,
	type TCreateProductVariantForm,
	type TCreateProductVariantProps,
	getCreateProductVariantSchema,
	mapCreateProductVariantWrite
} from "../model";

export const CreateProductVariant: FC<TCreateProductVariantProps> = (props) => {
	const { supplierId, productId, ns, onSuccess, typ } = props;
	const [open, setOpen] = useState(false);
	const { t } = useTranslation(ns);
	const [createVariant, { isLoading }] = useCreateVariantMutation();

	const form = useForm<TCreateProductVariantForm>({
		resolver: zodResolver(getCreateProductVariantSchema(typ)),
		mode: "onSubmit",
		defaultValues: {
			name: ""
		}
	});

	function handleOpenChange(nextOpen: boolean) {
		setOpen(nextOpen);
		if (!nextOpen) form.reset();
	}

	async function onSubmit(data: TCreateProductVariantForm) {
		try {
			const created = await createVariant({
				supplierId,
				productId,
				...mapCreateProductVariantWrite(props, data.name)
			}).unwrap();
			toast.success(t("form.variants.create_dialog.toasts.success"));
			handleOpenChange(false);
			onSuccess?.(created.variantId);
		} catch (error) {
			toast.error(t("form.variants.create_dialog.toasts.error"));
			console.error(error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline" size="sm">
					<PlusIcon className="mr-1 h-4 w-4" />
					<p>{t("form.variants.add")}</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>
						{t("form.variants.create_dialog.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("form.variants.create_dialog.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-6"
					>
						<CustomField
							control={form.control}
							name={CREATE_PRODUCT_VARIANT_NAME_FIELD.key}
							t={t}
							fieldType="input"
							label={CREATE_PRODUCT_VARIANT_NAME_FIELD.label}
							placeholder={
								CREATE_PRODUCT_VARIANT_NAME_FIELD.placeholder
							}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									{t("form.variants.create_dialog.cancel")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={isLoading}
								label={t("form.variants.create_dialog.confirm")}
								loadingLabel={t(
									"form.variants.create_dialog.confirming"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

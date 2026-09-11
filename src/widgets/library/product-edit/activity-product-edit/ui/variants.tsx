import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	Form,
	LoaderButton,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	ACTIVITY_VARIANT_FORM_SCHEMA,
	ENUM_FORM_ACTIVITY_VARIANT as ENUM_FORM,
	type IActivityVariant,
	type TActivityVariantFormSchema,
	emptyActivityVariantForm,
	mapActivityVariantFormToWrite,
	mapActivityVariantToForm,
	useCreateActivityVariantMutation,
	useDeleteActivityVariantMutation,
	useUpdateActivityVariantMutation
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { ACTIVITY_VARIANT_FIELDS_LIST } from "../model";

interface IActivityProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: IActivityVariant[];
}

const ActivityProductVariantsBase: FC<IActivityProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("activity_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createActivityVariant, { isLoading: isCreating }] =
		useCreateActivityVariantMutation();
	const [updateActivityVariant, { isLoading: isUpdating }] =
		useUpdateActivityVariantMutation();
	const [deleteActivityVariant, { isLoading: isDeleting }] =
		useDeleteActivityVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<TActivityVariantFormSchema>({
		resolver: zodResolver(ACTIVITY_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapActivityVariantToForm(selectedVariant)
	});

	useEffect(() => {
		form.reset(mapActivityVariantToForm(selectedVariant));
	}, [selectedVariant, form, selectedId]);

	useEffect(() => {
		if (variants.length === 0) return;

		setSelectedId((current) =>
			current === "new" && !form.formState.isDirty
				? variants[0].id
				: current
		);
	}, [variants.length, form.formState.isDirty]);

	const isSaving = isCreating || isUpdating;

	async function onSubmit(data: TActivityVariantFormSchema) {
		const payload = mapActivityVariantFormToWrite(data);

		try {
			if (selectedId === "new") {
				const created = await createActivityVariant({
					supplierId,
					productId,
					data: payload
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateActivityVariant({
				supplierId,
				productId,
				variantId: selectedId,
				data: payload
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	const handleDelete = async () => {
		if (selectedId === "new") {
			form.reset(emptyActivityVariantForm());
			return;
		}

		try {
			await deleteActivityVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyActivityVariantForm());
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
	};

	const handleAddVariant = () => {
		setSelectedId("new");
		form.reset(emptyActivityVariantForm());
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap gap-2">
				{variants.map((variant) => (
					<Button
						key={variant.id}
						type="button"
						variant={
							selectedId === variant.id ? "default" : "outline"
						}
						size="sm"
						onClick={() => setSelectedId(variant.id)}
					>
						{variant.name}
					</Button>
				))}
				<Button
					type="button"
					variant={selectedId === "new" ? "default" : "outline"}
					size="sm"
					onClick={handleAddVariant}
				>
					<PlusIcon className="mr-1 h-4 w-4" />
					{t("form.variants.add")}
				</Button>
			</div>

			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-4 md:grid-cols-3"
				>
					{ACTIVITY_VARIANT_FIELDS_LIST().map(({ key, ...item }) => (
						<Fragment key={key}>
							<CustomField
								control={form.control}
								name={key}
								t={t}
								{...item}
							/>
							{key === ENUM_FORM.CURRENCY ? (
								<div className="md:col-span-2">
									<FeeLinesField
										control={form.control}
										name={ENUM_FORM.FEES}
									/>
								</div>
							) : null}
						</Fragment>
					))}
					<div className="md:col-span-3 flex justify-end gap-2">
						{selectedId !== "new" || form.formState.isDirty ? (
							<LoaderButton
								type="button"
								variant="destructive"
								onClick={handleDelete}
								isLoading={isDeleting}
								label={t("form.variants.buttons.delete")}
								loadingLabel={t(
									"form.variants.buttons.deleting"
								)}
							/>
						) : null}
						<LoaderButton
							size="lg"
							isLoading={isSaving}
							label={t("form.variants.buttons.save")}
							loadingLabel={t("form.variants.buttons.saving")}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
};

export const ActivityProductVariants = withErrorBoundary(
	ActivityProductVariantsBase
);

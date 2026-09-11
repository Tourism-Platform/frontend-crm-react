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
	ENUM_FORM_TRAIN_VARIANT as ENUM_FORM,
	type ITrainVariant,
	TRAIN_VARIANT_FORM_SCHEMA,
	type TTrainVariantFormSchema,
	emptyTrainVariantForm,
	mapTrainVariantFormToWrite,
	mapTrainVariantToForm,
	useCreateTrainVariantMutation,
	useDeleteTrainVariantMutation,
	useUpdateTrainVariantMutation
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { TRAIN_VARIANT_FIELDS_LIST } from "../model";

interface ITrainProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: ITrainVariant[];
}

const TrainProductVariantsBase: FC<ITrainProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createTrainVariant, { isLoading: isCreating }] =
		useCreateTrainVariantMutation();
	const [updateTrainVariant, { isLoading: isUpdating }] =
		useUpdateTrainVariantMutation();
	const [deleteTrainVariant, { isLoading: isDeleting }] =
		useDeleteTrainVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<TTrainVariantFormSchema>({
		resolver: zodResolver(TRAIN_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapTrainVariantToForm(selectedVariant)
	});

	useEffect(() => {
		form.reset(mapTrainVariantToForm(selectedVariant));
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

	async function onSubmit(data: TTrainVariantFormSchema) {
		const payload = mapTrainVariantFormToWrite(data);

		try {
			if (selectedId === "new") {
				const created = await createTrainVariant({
					supplierId,
					productId,
					data: payload
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateTrainVariant({
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
			form.reset(emptyTrainVariantForm());
			return;
		}

		try {
			await deleteTrainVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyTrainVariantForm());
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
	};

	const handleAddVariant = () => {
		setSelectedId("new");
		form.reset(emptyTrainVariantForm());
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
					{TRAIN_VARIANT_FIELDS_LIST().map(({ key, ...item }) => (
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

export const TrainProductVariants = withErrorBoundary(TrainProductVariantsBase);

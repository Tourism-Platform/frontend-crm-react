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
	ENUM_FORM_FLIGHT_VARIANT as ENUM_FORM,
	FLIGHT_VARIANT_FORM_SCHEMA,
	type IFlightVariant,
	type TFlightVariantFormSchema,
	emptyFlightVariantForm,
	mapFlightVariantFormToWrite,
	mapFlightVariantToForm,
	useCreateFlightVariantMutation,
	useDeleteFlightVariantMutation,
	useUpdateFlightVariantMutation
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { FLIGHT_VARIANT_FIELDS_LIST } from "../model";

interface IFlightProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: IFlightVariant[];
}

const FlightProductVariantsBase: FC<IFlightProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("flight_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createFlightVariant, { isLoading: isCreating }] =
		useCreateFlightVariantMutation();
	const [updateFlightVariant, { isLoading: isUpdating }] =
		useUpdateFlightVariantMutation();
	const [deleteFlightVariant, { isLoading: isDeleting }] =
		useDeleteFlightVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<TFlightVariantFormSchema>({
		resolver: zodResolver(FLIGHT_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapFlightVariantToForm(selectedVariant)
	});

	useEffect(() => {
		form.reset(mapFlightVariantToForm(selectedVariant));
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

	async function onSubmit(data: TFlightVariantFormSchema) {
		const payload = mapFlightVariantFormToWrite(data);

		try {
			if (selectedId === "new") {
				const created = await createFlightVariant({
					supplierId,
					productId,
					data: payload
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateFlightVariant({
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
			form.reset(emptyFlightVariantForm());
			return;
		}

		try {
			await deleteFlightVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyFlightVariantForm());
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
	};

	const handleAddVariant = () => {
		setSelectedId("new");
		form.reset(emptyFlightVariantForm());
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
					{FLIGHT_VARIANT_FIELDS_LIST().map(({ key, ...item }) => (
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

export const FlightProductVariants = withErrorBoundary(
	FlightProductVariantsBase
);

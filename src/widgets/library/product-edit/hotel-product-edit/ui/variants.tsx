import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	HOTEL_VARIANT_FORM_SCHEMA,
	type IHotelVariant,
	type THotelVariantFormSchema,
	emptyHotelVariantForm,
	emptyHotelVariantRoom,
	mapHotelVariantFormToWrite,
	mapHotelVariantToForm,
	useCreateHotelVariantMutation,
	useDeleteHotelVariantMutation,
	useUpdateHotelVariantMutation
} from "@/entities/supplier";

import { HOTEL_VARIANT_NAME_FIELD } from "../model";

import { HotelVariantRoomRow } from "./hotel-variant-room-row";

interface IHotelProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: IHotelVariant[];
}

const HotelProductVariantsBase: FC<IHotelProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createHotelVariant, { isLoading: isCreating }] =
		useCreateHotelVariantMutation();
	const [updateHotelVariant, { isLoading: isUpdating }] =
		useUpdateHotelVariantMutation();
	const [deleteHotelVariant, { isLoading: isDeleting }] =
		useDeleteHotelVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<THotelVariantFormSchema>({
		resolver: zodResolver(HOTEL_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapHotelVariantToForm(selectedVariant)
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: ENUM_FORM.ROOMS
	});

	useEffect(() => {
		form.reset(mapHotelVariantToForm(selectedVariant));
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

	async function onSubmit(data: THotelVariantFormSchema) {
		const payload = mapHotelVariantFormToWrite(data);

		try {
			if (selectedId === "new") {
				const created = await createHotelVariant({
					supplierId,
					productId,
					data: payload
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateHotelVariant({
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

	const handleAddVariant = () => {
		setSelectedId("new");
		form.reset(emptyHotelVariantForm());
	};

	const handleDelete = async () => {
		if (selectedId === "new") {
			form.reset(emptyHotelVariantForm());
			return;
		}

		try {
			await deleteHotelVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyHotelVariantForm());
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
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
					className="grid gap-4"
				>
					<CustomField
						control={form.control}
						name={HOTEL_VARIANT_NAME_FIELD.key}
						t={t}
						fieldType="input"
						label={HOTEL_VARIANT_NAME_FIELD.label}
						placeholder="form.variants.fields.name.placeholder"
					/>

					{fields.map((field, index) => (
						<HotelVariantRoomRow
							key={field.id}
							form={form}
							index={index}
							canRemove={fields.length > 1}
							onRemove={() => remove(index)}
						/>
					))}

					<div className="flex flex-wrap justify-between gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={() => append(emptyHotelVariantRoom())}
						>
							<PlusIcon className="mr-1 h-4 w-4" />
							{t("form.variants.add_room")}
						</Button>
						<div className="flex gap-2">
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
					</div>
				</form>
			</Form>
		</div>
	);
};

export const HotelProductVariants = withErrorBoundary(HotelProductVariantsBase);

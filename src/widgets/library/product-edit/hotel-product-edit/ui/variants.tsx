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
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	HOTEL_VARIANT_FORM_SCHEMA,
	type IHotelProduct,
	type IHotelVariant,
	type THotelVariantFormSchema,
	emptyHotelVariantRoom,
	mapHotelVariantFormToWrite,
	mapHotelVariantToForm,
	useUpdateVariantMutation
} from "@/entities/supplier";

import { CreateProductVariant, DeleteProductVariant } from "@/features/library";

import { HOTEL_VARIANT_NAME_FIELD } from "../model";

import { HotelVariantRoomRow } from "./hotel-variant-room-row";

interface IHotelProductVariantsProps {
	supplierId: string;
	productId: string;
	product?: IHotelProduct | null;
	variants?: IHotelVariant[];
	disabled?: boolean;
}

const HotelProductVariantsBase: FC<IHotelProductVariantsProps> = ({
	supplierId,
	productId,
	product,
	variants = [],
	disabled = false
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | null>(
		variants[0]?.id ?? null
	);

	const [updateVariant, { isLoading: isUpdating }] =
		useUpdateVariantMutation();

	const selectedVariant =
		variants.find((item) => item.id === selectedId) ?? variants[0] ?? null;
	const resolvedId = selectedVariant?.id ?? null;
	const pricing = product?.pricing ?? ENUM_HOTEL_PRICING.PER_ROOM;

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
		if (!selectedVariant) return;

		form.reset(mapHotelVariantToForm(selectedVariant));
	}, [selectedVariant, form]);

	const showPricing = pricing === ENUM_HOTEL_PRICING.PER_ROOM;

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	async function onSubmit(data: THotelVariantFormSchema) {
		if (!resolvedId) return;

		try {
			await updateVariant({
				supplierId,
				productId,
				variantId: resolvedId,
				typ: ENUM_SUPPLIER_TYPE.HOTEL,
				pricing,
				data: mapHotelVariantFormToWrite(data)
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap gap-2">
				{variants.map((variant) => (
					<Button
						key={variant.id}
						type="button"
						variant={
							resolvedId === variant.id ? "default" : "outline"
						}
						size="sm"
						onClick={() => setSelectedId(variant.id)}
					>
						{variant.name}
					</Button>
				))}
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.HOTEL}
					pricing={pricing}
					ns="hotel_product_edit_page"
					onSuccess={setSelectedId}
				/>
			</div>

			{selectedVariant && resolvedId ? (
				<>
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

							<div className="grid gap-4">
								{fields.map((field, index) => (
									<HotelVariantRoomRow
										key={field.id}
										form={form}
										index={index}
										onRemove={() => remove(index)}
										showPricing={showPricing}
									/>
								))}
							</div>

							<div className="flex flex-wrap justify-between gap-3">
								<Button
									type="button"
									variant="outline"
									onClick={() =>
										append(emptyHotelVariantRoom())
									}
								>
									<PlusIcon className="mr-1 h-4 w-4" />
									{t("form.variants.add_room")}
								</Button>
								<div className="grid grid-cols-2 gap-2">
									<DeleteProductVariant
										supplierId={supplierId}
										productId={productId}
										variantId={resolvedId}
										variantName={selectedVariant.name}
										ns="hotel_product_edit_page"
									/>
									<LoaderButton
										size="lg"
										className="w-full"
										isLoading={isUpdating}
										label={t("form.variants.buttons.save")}
										loadingLabel={t(
											"form.variants.buttons.saving"
										)}
									/>
								</div>
							</div>
						</form>
					</Form>
				</>
			) : null}
		</div>
	);
};

export const HotelProductVariants = withErrorBoundary(HotelProductVariantsBase);

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
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
	BUS_VARIANT_FORM_SCHEMA,
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_VARIANT as ENUM_FORM,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type IBusVariant,
	type TBusVariantFormSchema,
	mapBusVariantFormToWrite,
	mapBusVariantToForm,
	useUpdateVariantMutation
} from "@/entities/supplier";

import { CreateProductVariant, DeleteProductVariant } from "@/features/library";
import { FeeLinesField } from "@/features/pricing";

import { BUS_VARIANT_FIELDS_LIST } from "../model";

interface IBusProductVariantsProps {
	supplierId: string;
	productId: string;
	product?: IBusProduct | null;
	variants?: IBusVariant[];
	disabled?: boolean;
}

const BusProductVariantsBase: FC<IBusProductVariantsProps> = ({
	supplierId,
	productId,
	product,
	variants = [],
	disabled = false
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | null>(
		variants[0]?.id ?? null
	);

	const [updateVariant, { isLoading: isUpdating }] =
		useUpdateVariantMutation();

	const selectedVariant =
		variants.find((item) => item.id === selectedId) ?? variants[0] ?? null;
	const resolvedId = selectedVariant?.id ?? null;
	const pricing = product?.pricing ?? ENUM_BUS_PRICING.PER_VEHICLE;

	const form = useForm<TBusVariantFormSchema>({
		resolver: zodResolver(BUS_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapBusVariantToForm(selectedVariant)
	});

	useEffect(() => {
		if (!selectedVariant) return;

		form.reset(mapBusVariantToForm(selectedVariant));
	}, [selectedVariant, form]);

	const variantFields = BUS_VARIANT_FIELDS_LIST();

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	async function onSubmit(data: TBusVariantFormSchema) {
		if (!resolvedId) return;

		try {
			await updateVariant({
				supplierId,
				productId,
				variantId: resolvedId,
				typ: ENUM_SUPPLIER_TYPE.BUS,
				pricing,
				data: mapBusVariantFormToWrite(data)
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
					typ={ENUM_SUPPLIER_TYPE.BUS}
					pricing={pricing}
					ns="bus_product_edit_page"
					onSuccess={setSelectedId}
				/>
			</div>

			{selectedVariant && resolvedId ? (
				<>
					<Separator />

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid gap-x-4 gap-y-1 md:grid-cols-2"
						>
							{variantFields.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={key}
									t={t}
									{...item}
								/>
							))}
							<div className="md:col-span-2">
								<FeeLinesField
									control={form.control}
									name={ENUM_FORM.FEES}
								/>
							</div>
							<div className="md:col-span-2 flex justify-end">
								<div className="grid grid-cols-2 gap-2">
									<DeleteProductVariant
										supplierId={supplierId}
										productId={productId}
										variantId={resolvedId}
										variantName={selectedVariant.name}
										ns="bus_product_edit_page"
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

export const BusProductVariants = withErrorBoundary(BusProductVariantsBase);

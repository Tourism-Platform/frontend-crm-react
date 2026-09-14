import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CustomField,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	LoaderButton,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	BUS_PRODUCT_PRICING_SCHEMA,
	BUS_VARIANT_FORM_SCHEMA,
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_VARIANT as ENUM_FORM,
	ENUM_FORM_BUS_PRICING as ENUM_PRICING,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type IBusVariant,
	type TBusProductPricingSchema,
	type TBusVariantFormSchema,
	mapBusProductToGeneralForm,
	mapBusProductToPricingForm,
	mapBusVariantFormToWrite,
	mapBusVariantToForm,
	useUpdateBusProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

import { CreateProductVariant, DeleteProductVariant } from "@/features/library";
import { FeeLinesField } from "@/features/pricing";

import {
	BUS_PRODUCT_CHARGE_FIELDS_LIST,
	BUS_VARIANT_DESC_FIELDS_LIST,
	BUS_VARIANT_PRICING_FIELDS_LIST
} from "../model";

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
	const [updateBusProduct, { isLoading: isUpdatingPricing }] =
		useUpdateBusProductMutation();

	const selectedVariant =
		variants.find((item) => item.id === selectedId) ?? variants[0] ?? null;
	const resolvedId = selectedVariant?.id ?? null;
	const savedPricing = product?.pricing ?? ENUM_BUS_PRICING.PER_VEHICLE;

	const pricingForm = useForm<TBusProductPricingSchema>({
		resolver: zodResolver(BUS_PRODUCT_PRICING_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapBusProductToPricingForm(product)
	});

	const form = useForm<TBusVariantFormSchema>({
		resolver: zodResolver(BUS_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapBusVariantToForm(selectedVariant)
	});

	useEffect(() => {
		pricingForm.reset(mapBusProductToPricingForm(product));
	}, [product, pricingForm]);

	useEffect(() => {
		if (!selectedVariant) return;

		form.reset(mapBusVariantToForm(selectedVariant));
	}, [selectedVariant, form]);

	const watchedPricing =
		pricingForm.watch(ENUM_PRICING.PRICING) ?? savedPricing;
	const showVariantPricing = watchedPricing === ENUM_BUS_PRICING.PER_VEHICLE;
	const showProductCharge = watchedPricing === ENUM_BUS_PRICING.WHOLE;

	const productChargeFields = BUS_PRODUCT_CHARGE_FIELDS_LIST();
	const variantDescFields = BUS_VARIANT_DESC_FIELDS_LIST();
	const variantPricingFields = BUS_VARIANT_PRICING_FIELDS_LIST();

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	async function onSavePricing(data: TBusProductPricingSchema) {
		if (!product) return;

		try {
			await updateBusProduct({
				supplierId,
				productId,
				values: mapBusProductToGeneralForm(product),
				existing: product,
				pricing: data
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	async function onSubmit(data: TBusVariantFormSchema) {
		if (!resolvedId) return;

		try {
			await updateVariant({
				supplierId,
				productId,
				variantId: resolvedId,
				typ: ENUM_SUPPLIER_TYPE.BUS,
				pricing: savedPricing,
				data: mapBusVariantFormToWrite(data)
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	const createVariantButton = (
		<CreateProductVariant
			supplierId={supplierId}
			productId={productId}
			typ={ENUM_SUPPLIER_TYPE.BUS}
			pricing={savedPricing}
			ns="bus_product_edit_page"
			onSuccess={setSelectedId}
		/>
	);
	const pricingSaveButton = (
		<LoaderButton
			type="submit"
			size="lg"
			isLoading={isUpdatingPricing}
			label={t("form.variants.buttons.save_pricing")}
			loadingLabel={t("form.variants.buttons.saving_pricing")}
		/>
	);

	function onPricingModeChange(value: string) {
		if (
			value !== ENUM_BUS_PRICING.PER_VEHICLE &&
			value !== ENUM_BUS_PRICING.WHOLE
		) {
			return;
		}
		pricingForm.setValue(ENUM_PRICING.PRICING, value, {
			shouldDirty: true,
			shouldValidate: true
		});
	}

	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>
						{t("form.variants.fields.pricing.label")}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...pricingForm}>
						<form
							onSubmit={pricingForm.handleSubmit(onSavePricing)}
							className="grid gap-4"
						>
							<div className="flex flex-wrap items-center gap-2">
								<CustomOptionTabs
									value={watchedPricing}
									onValueChange={onPricingModeChange}
									className="w-fit"
								>
									<CustomOptionTabsList className="grid-cols-2">
										<CustomOptionTabsTrigger
											value={ENUM_BUS_PRICING.PER_VEHICLE}
										>
											{t(
												"form.variants.fields.pricing.per_vehicle"
											)}
										</CustomOptionTabsTrigger>
										<CustomOptionTabsTrigger
											value={ENUM_BUS_PRICING.WHOLE}
										>
											{t(
												"form.variants.fields.pricing.whole"
											)}
										</CustomOptionTabsTrigger>
									</CustomOptionTabsList>
								</CustomOptionTabs>
								{showProductCharge ? null : (
									<div className="ml-auto">
										{pricingSaveButton}
									</div>
								)}
							</div>
							{showProductCharge ? (
								<>
									<div className="grid gap-x-4 gap-y-1 md:grid-cols-3">
										{productChargeFields.map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													control={
														pricingForm.control
													}
													name={key}
													t={t}
													{...item}
												/>
											)
										)}
										<div className="md:col-span-3">
											<FeeLinesField
												control={pricingForm.control}
												name={ENUM_PRICING.FEES}
											/>
										</div>
									</div>
									<div className="flex justify-end">
										{pricingSaveButton}
									</div>
								</>
							) : null}
						</form>
					</Form>
				</CardContent>
			</Card>

			{variants.length ? (
				<CustomOptionTabs
					value={resolvedId ?? undefined}
					onValueChange={setSelectedId}
				>
					<div className="flex items-center gap-2">
						<CustomOptionTabsList className="flex items-center gap-2">
							{variants.map((variant) => (
								<CustomOptionTabsTrigger
									key={variant.id}
									value={variant.id}
									variant="tongue"
								>
									{variant.name}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						<div className="ml-auto">{createVariantButton}</div>
					</div>
					<Separator className="mb-6" />
					{selectedVariant && resolvedId ? (
						<CustomOptionTabsContent value={resolvedId}>
							<Card>
								<CardContent>
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(
												onSubmit
											)}
											className="grid gap-x-4 gap-y-1 md:grid-cols-2"
										>
											{variantDescFields.map(
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
											{showVariantPricing
												? variantPricingFields.map(
														({ key, ...item }) => (
															<CustomField
																key={key}
																control={
																	form.control
																}
																name={key}
																t={t}
																{...item}
															/>
														)
													)
												: null}
											{showVariantPricing ? (
												<div className="md:col-span-2">
													<FeeLinesField
														control={form.control}
														name={ENUM_FORM.FEES}
													/>
												</div>
											) : null}
											<div className="md:col-span-2 flex justify-end">
												<div className="grid grid-cols-2 gap-2">
													<DeleteProductVariant
														supplierId={supplierId}
														productId={productId}
														variantId={resolvedId}
														variantName={
															selectedVariant.name
														}
														ns="bus_product_edit_page"
													/>
													<LoaderButton
														size="lg"
														className="w-full"
														isLoading={isUpdating}
														label={t(
															"form.variants.buttons.save"
														)}
														loadingLabel={t(
															"form.variants.buttons.saving"
														)}
													/>
												</div>
											</div>
										</form>
									</Form>
								</CardContent>
							</Card>
						</CustomOptionTabsContent>
					) : null}
				</CustomOptionTabs>
			) : (
				createVariantButton
			)}
		</div>
	);
};

export const BusProductVariants = withErrorBoundary(BusProductVariantsBase);

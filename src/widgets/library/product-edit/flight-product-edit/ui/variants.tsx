import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
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
	ENUM_FLIGHT_PRICING,
	ENUM_FORM_FLIGHT_VARIANT as ENUM_FORM,
	ENUM_FORM_FLIGHT_PRICING as ENUM_PRICING,
	ENUM_SUPPLIER_TYPE,
	FLIGHT_PRODUCT_PRICING_SCHEMA,
	FLIGHT_VARIANT_FORM_SCHEMA,
	type IFlightProduct,
	type IFlightVariant,
	type TFlightProductPricingSchema,
	type TFlightVariantFormSchema,
	mapFlightProductToGeneralForm,
	mapFlightProductToPricingForm,
	mapFlightVariantFormToWrite,
	mapFlightVariantToForm,
	useUpdateFlightProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

import { CreateProductVariant, DeleteProductVariant } from "@/features/library";
import { FeeLinesField } from "@/features/pricing";

import {
	FLIGHT_PRODUCT_CHARGE_FIELDS_LIST,
	FLIGHT_VARIANT_NAME_FIELD,
	FLIGHT_VARIANT_PRICING_FIELDS_LIST
} from "../model";

interface IFlightProductVariantsProps {
	supplierId: string;
	productId: string;
	product?: IFlightProduct | null;
	variants?: IFlightVariant[];
	disabled?: boolean;
}

const FlightProductVariantsBase: FC<IFlightProductVariantsProps> = ({
	supplierId,
	productId,
	product,
	variants = [],
	disabled = false
}) => {
	const { t, i18n } = useTranslation("flight_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const [selectedId, setSelectedId] = useState<string | null>(
		variants[0]?.id ?? null
	);

	const [updateVariant, { isLoading: isUpdating }] =
		useUpdateVariantMutation();
	const [updateFlightProduct, { isLoading: isUpdatingPricing }] =
		useUpdateFlightProductMutation();

	const selectedVariant =
		variants.find((item) => item.id === selectedId) ?? variants[0] ?? null;
	const resolvedId = selectedVariant?.id ?? null;
	const savedPricing = product?.pricing ?? ENUM_FLIGHT_PRICING.PER_FARE;

	const pricingForm = useForm<TFlightProductPricingSchema>({
		resolver: zodResolver(FLIGHT_PRODUCT_PRICING_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapFlightProductToPricingForm(product)
	});

	const form = useForm<TFlightVariantFormSchema>({
		resolver: zodResolver(FLIGHT_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapFlightVariantToForm(selectedVariant)
	});

	useEffect(() => {
		pricingForm.reset(mapFlightProductToPricingForm(product));
	}, [product, pricingForm]);

	useEffect(() => {
		if (!selectedVariant) return;

		form.reset(mapFlightVariantToForm(selectedVariant));
	}, [selectedVariant, form]);

	const watchedPricing =
		pricingForm.watch(ENUM_PRICING.PRICING) ?? savedPricing;
	const showVariantPricing = watchedPricing === ENUM_FLIGHT_PRICING.PER_FARE;
	const showProductCharge = watchedPricing === ENUM_FLIGHT_PRICING.WHOLE;

	const productChargeFields = FLIGHT_PRODUCT_CHARGE_FIELDS_LIST();
	const variantPricingFields = FLIGHT_VARIANT_PRICING_FIELDS_LIST();

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	async function onSavePricing(data: TFlightProductPricingSchema) {
		if (!product) return;

		try {
			await updateFlightProduct({
				supplierId,
				productId,
				values: mapFlightProductToGeneralForm(product),
				language,
				existing: product,
				pricing: data
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	async function onSubmit(data: TFlightVariantFormSchema) {
		if (!resolvedId) return;

		try {
			await updateVariant({
				supplierId,
				productId,
				variantId: resolvedId,
				typ: ENUM_SUPPLIER_TYPE.FLIGHT,
				pricing: savedPricing,
				data: mapFlightVariantFormToWrite(data)
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	const { key: nameKey, ...nameField } = FLIGHT_VARIANT_NAME_FIELD;
	const createVariantButton = (
		<CreateProductVariant
			supplierId={supplierId}
			productId={productId}
			typ={ENUM_SUPPLIER_TYPE.FLIGHT}
			pricing={savedPricing}
			ns="flight_product_edit_page"
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
			value !== ENUM_FLIGHT_PRICING.PER_FARE &&
			value !== ENUM_FLIGHT_PRICING.WHOLE
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
											value={ENUM_FLIGHT_PRICING.PER_FARE}
										>
											{t(
												"form.variants.fields.pricing.per_fare"
											)}
										</CustomOptionTabsTrigger>
										<CustomOptionTabsTrigger
											value={ENUM_FLIGHT_PRICING.WHOLE}
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
											className="grid gap-x-4 gap-y-1 md:grid-cols-3"
										>
											<CustomField
												control={form.control}
												name={nameKey}
												t={t}
												{...nameField}
											/>
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
												<div className="md:col-span-3">
													<FeeLinesField
														control={form.control}
														name={ENUM_FORM.FEES}
													/>
												</div>
											) : null}
											<div className="md:col-span-3 flex justify-end">
												<div className="grid grid-cols-2 gap-2">
													<DeleteProductVariant
														supplierId={supplierId}
														productId={productId}
														variantId={resolvedId}
														variantName={
															selectedVariant.name
														}
														ns="flight_product_edit_page"
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

export const FlightProductVariants = withErrorBoundary(
	FlightProductVariantsBase
);

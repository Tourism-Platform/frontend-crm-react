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
	ACTIVITY_VARIANT_FORM_SCHEMA,
	ENUM_FORM_ACTIVITY_VARIANT as ENUM_FORM,
	ENUM_SUPPLIER_TYPE,
	type IActivityVariant,
	type TActivityVariantFormSchema,
	mapActivityVariantFormToWrite,
	mapActivityVariantToForm,
	useUpdateVariantMutation
} from "@/entities/supplier";

import { CreateProductVariant, DeleteProductVariant } from "@/features/library";
import { FeeLinesField } from "@/features/pricing";

import { ACTIVITY_VARIANT_FIELDS_LIST } from "../model";

interface IActivityProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: IActivityVariant[];
	disabled?: boolean;
}

const ActivityProductVariantsBase: FC<IActivityProductVariantsProps> = ({
	supplierId,
	productId,
	variants = [],
	disabled = false
}) => {
	const { t } = useTranslation("activity_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | null>(
		variants[0]?.id ?? null
	);

	const [updateVariant, { isLoading: isUpdating }] =
		useUpdateVariantMutation();

	const selectedVariant =
		variants.find((item) => item.id === selectedId) ?? variants[0] ?? null;
	const resolvedId = selectedVariant?.id ?? null;

	const form = useForm<TActivityVariantFormSchema>({
		resolver: zodResolver(ACTIVITY_VARIANT_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapActivityVariantToForm(selectedVariant)
	});

	useEffect(() => {
		if (!selectedVariant) return;

		form.reset(mapActivityVariantToForm(selectedVariant));
	}, [selectedVariant, form]);

	const variantFields = ACTIVITY_VARIANT_FIELDS_LIST();

	if (disabled) {
		return (
			<p className="text-muted-foreground text-sm">
				{t("form.create_hint.save_general_first")}
			</p>
		);
	}

	async function onSubmit(data: TActivityVariantFormSchema) {
		if (!resolvedId) return;

		try {
			await updateVariant({
				supplierId,
				productId,
				variantId: resolvedId,
				typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
				data: mapActivityVariantFormToWrite(data)
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
					typ={ENUM_SUPPLIER_TYPE.ACTIVITY}
					ns="activity_product_edit_page"
					onSuccess={setSelectedId}
				/>
			</div>

			{selectedVariant && resolvedId ? (
				<>
					<Separator />

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid gap-x-4 gap-y-1 md:grid-cols-3"
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
							<div className="md:col-span-3">
								<FeeLinesField
									control={form.control}
									name={ENUM_FORM.FEES}
								/>
							</div>
							<div className="md:col-span-3 flex justify-end">
								<div className="grid grid-cols-2 gap-2">
									<DeleteProductVariant
										supplierId={supplierId}
										productId={productId}
										variantId={resolvedId}
										variantName={selectedVariant.name}
										ns="activity_product_edit_page"
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

export const ActivityProductVariants = withErrorBoundary(
	ActivityProductVariantsBase
);

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	BUS_PRODUCT_GENERAL_SCHEMA,
	type IBusProduct,
	type TBusProductGeneralSchema,
	mapBusProductToGeneralForm,
	useCreateBusProductMutation,
	useUpdateBusProductMutation
} from "@/entities/supplier";

import { BUS_PRODUCT_NAME_FIELD } from "../model";

interface IBusProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IBusProduct | null;
}

const BusProductGeneralBase: FC<IBusProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const navigate = useNavigate();

	const form = useForm<TBusProductGeneralSchema>({
		resolver: zodResolver(BUS_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapBusProductToGeneralForm(product)
	});

	useEffect(() => {
		form.reset(mapBusProductToGeneralForm(product));
	}, [product, form]);

	const [createBusProduct, { isLoading: isCreating }] =
		useCreateBusProductMutation();
	const [updateBusProduct, { isLoading: isUpdating }] =
		useUpdateBusProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: TBusProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createBusProduct({
					supplierId,
					values: data
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_BUS_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateBusProduct({
				supplierId,
				productId,
				values: data,
				existing: product
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				isCreate
					? t("form.toasts.create.error")
					: t("form.toasts.save.error")
			);
			console.error(error);
		}
	}

	const { key: nameKey, ...nameField } = BUS_PRODUCT_NAME_FIELD;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<CustomField
					control={form.control}
					name={nameKey}
					t={t}
					{...nameField}
				/>
				<div className="flex justify-end">
					<LoaderButton
						type="submit"
						disabled={isLoading}
						isLoading={isLoading}
						label={
							isCreate
								? t("form.general.buttons.create")
								: t("form.general.buttons.save")
						}
						loadingLabel={t("form.general.buttons.saving")}
					/>
				</div>
			</form>
		</Form>
	);
};

export const BusProductGeneral = withErrorBoundary(BusProductGeneralBase);

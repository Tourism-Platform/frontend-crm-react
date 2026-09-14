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
	type ITransferProduct,
	TRANSFER_PRODUCT_GENERAL_SCHEMA,
	type TTransferProductGeneralSchema,
	mapTransferProductToGeneralForm,
	useCreateTransferProductMutation,
	useUpdateTransferProductMutation
} from "@/entities/supplier";

import { TRANSFER_PRODUCT_NAME_FIELD } from "../model";

interface ITransferProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITransferProduct | null;
}

const TransferProductGeneralBase: FC<ITransferProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const navigate = useNavigate();

	const form = useForm<TTransferProductGeneralSchema>({
		resolver: zodResolver(TRANSFER_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapTransferProductToGeneralForm(product)
	});

	useEffect(() => {
		form.reset(mapTransferProductToGeneralForm(product));
	}, [product, form]);

	const [createTransferProduct, { isLoading: isCreating }] =
		useCreateTransferProductMutation();
	const [updateTransferProduct, { isLoading: isUpdating }] =
		useUpdateTransferProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: TTransferProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createTransferProduct({
					supplierId,
					values: data
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_TRANSFER_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateTransferProduct({
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

	const { key: nameKey, ...nameField } = TRANSFER_PRODUCT_NAME_FIELD;

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

export const TransferProductGeneral = withErrorBoundary(
	TransferProductGeneralBase
);

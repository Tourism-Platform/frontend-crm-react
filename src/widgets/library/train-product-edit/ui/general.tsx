import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	type ITrainHop,
	TRAIN_PRODUCT_NAME_SCHEMA,
	type TTrainProductNameSchema,
	useCreateTrainProductMutation,
	useUpdateTrainProductNameMutation
} from "@/entities/supplier";

interface ITrainProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	name?: string;
	hops?: ITrainHop[];
}

const TrainProductGeneralBase: FC<ITrainProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	name = "",
	hops = []
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const navigate = useNavigate();
	const [createTrainProduct, { isLoading: isCreating }] =
		useCreateTrainProductMutation();
	const [updateTrainProductName, { isLoading: isUpdating }] =
		useUpdateTrainProductNameMutation();
	const isLoading = isCreating || isUpdating;

	const form = useForm<TTrainProductNameSchema>({
		resolver: zodResolver(TRAIN_PRODUCT_NAME_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FORM.NAME]: name
		}
	});

	useEffect(() => {
		form.reset({ [ENUM_FORM.NAME]: name });
	}, [name, form]);

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			if (isCreate) {
				const created = await createTrainProduct({
					supplierId,
					data: {
						name: values[ENUM_FORM.NAME],
						hops
					}
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateTrainProductName({
				supplierId,
				productId,
				name: values[ENUM_FORM.NAME]
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
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-6">
				<CustomField
					control={form.control}
					name={ENUM_FORM.NAME}
					t={t}
					label="form.general.fields.name.label"
					placeholder="form.general.fields.name.placeholder"
					fieldType="input"
				/>
				<div className="flex justify-end">
					<Button type="submit" size="lg" disabled={isLoading}>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.general.buttons.saving")
							: t("form.general.buttons.save")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const TrainProductGeneral = withErrorBoundary(TrainProductGeneralBase);

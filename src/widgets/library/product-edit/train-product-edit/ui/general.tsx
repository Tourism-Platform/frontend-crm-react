import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
	ENUM_LANGUAGES,
	ENUM_PATH,
	buildRoute,
	i18nLanguageMapper
} from "@/shared/config";
import {
	Button,
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	type ITrainProduct,
	TRAIN_PRODUCT_GENERAL_SCHEMA,
	type TTrainProductGeneralSchema,
	emptyHopFormRow,
	mapTrainProductToGeneralForm,
	useCreateTrainProductMutation,
	useUpdateTrainProductMutation
} from "@/entities/supplier";

import { TRAIN_PRODUCT_NAME_FIELD } from "../model";

import { TrainHopRow } from "./train-hop-row";

interface ITrainProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITrainProduct | null;
}

const TrainProductGeneralBase: FC<ITrainProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t, i18n } = useTranslation("train_product_edit_page");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const form = useForm<TTrainProductGeneralSchema>({
		resolver: zodResolver(TRAIN_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapTrainProductToGeneralForm(product)
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: ENUM_FORM.HOPS
	});

	useEffect(() => {
		form.reset(mapTrainProductToGeneralForm(product));
	}, [product, form]);

	const [createTrainProduct, { isLoading: isCreating }] =
		useCreateTrainProductMutation();
	const [updateTrainProduct, { isLoading: isUpdating }] =
		useUpdateTrainProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: TTrainProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createTrainProduct({
					supplierId,
					values: data,
					language
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

			await updateTrainProduct({
				supplierId,
				productId,
				values: data,
				language,
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

	const { key: nameKey, ...nameField } = TRAIN_PRODUCT_NAME_FIELD;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<CustomField
					control={form.control}
					name={nameKey}
					t={t}
					{...nameField}
				/>

				<div className="grid gap-4">
					{fields.map((field, index) => (
						<TrainHopRow
							key={field.id}
							form={form}
							index={index}
							language={language}
							onRemove={() => remove(index)}
						/>
					))}
				</div>

				<div className="flex flex-wrap justify-between gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => append(emptyHopFormRow())}
					>
						<PlusIcon className="mr-1 h-4 w-4" />
						{t("form.general.fields.hops.add")}
					</Button>
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

export const TrainProductGeneral = withErrorBoundary(TrainProductGeneralBase);

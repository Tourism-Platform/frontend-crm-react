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
	ENUM_FORM_FLIGHT_PRODUCT as ENUM_FORM,
	FLIGHT_PRODUCT_GENERAL_SCHEMA,
	type IFlightProduct,
	type TFlightProductGeneralSchema,
	emptyFlightHopFormRow,
	mapFlightProductToGeneralForm,
	useCreateFlightProductMutation,
	useUpdateFlightProductMutation
} from "@/entities/supplier";

import { FLIGHT_PRODUCT_NAME_FIELD } from "../model";

import { FlightHopRow } from "./flight-hop-row";

interface IFlightProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IFlightProduct | null;
}

const FlightProductGeneralBase: FC<IFlightProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t, i18n } = useTranslation("flight_product_edit_page");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const form = useForm<TFlightProductGeneralSchema>({
		resolver: zodResolver(FLIGHT_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapFlightProductToGeneralForm(product)
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: ENUM_FORM.HOPS
	});

	useEffect(() => {
		form.reset(mapFlightProductToGeneralForm(product));
	}, [product, form]);

	const [createFlightProduct, { isLoading: isCreating }] =
		useCreateFlightProductMutation();
	const [updateFlightProduct, { isLoading: isUpdating }] =
		useUpdateFlightProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: TFlightProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createFlightProduct({
					supplierId,
					values: data,
					language
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_FLIGHT_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateFlightProduct({
				supplierId,
				productId,
				values: data,
				language
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

	const { key: nameKey, ...nameField } = FLIGHT_PRODUCT_NAME_FIELD;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<CustomField
					control={form.control}
					name={nameKey}
					t={t}
					{...nameField}
				/>

				{fields.map((field, index) => (
					<FlightHopRow
						key={field.id}
						form={form}
						index={index}
						language={language}
						canRemove={fields.length > 1}
						onRemove={() => remove(index)}
					/>
				))}

				<div className="flex flex-wrap justify-between gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => append(emptyFlightHopFormRow())}
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

export const FlightProductGeneral = withErrorBoundary(FlightProductGeneralBase);

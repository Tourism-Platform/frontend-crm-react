import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
	ENUM_LANGUAGES,
	ENUM_PATH,
	buildRoute,
	i18nLanguageMapper
} from "@/shared/config";
import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import {
	ENUM_FORM_HOTEL_PRODUCT as ENUM_FORM,
	HOTEL_PRODUCT_GENERAL_SCHEMA,
	type IHotelProduct,
	type THotelProductGeneralFormInput,
	type THotelProductGeneralSchema,
	mapHotelProductToGeneralForm,
	useCreateHotelProductMutation,
	useUpdateHotelProductMutation
} from "@/entities/supplier";

import {
	FORM_HOTEL_PRODUCT_GENERAL_LIST,
	HOTEL_PRODUCT_GENERAL_NAME_FIELD,
	LOCATION_FIELD,
	type TForm
} from "../model";

interface IHotelProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IHotelProduct | null;
}

const HotelProductGeneralBase: FC<IHotelProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t, i18n } = useTranslation("hotel_product_edit_page");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const geoProps = useGeoSearchFieldProps(language);
	const locationField = useMemo(() => LOCATION_FIELD(geoProps), [geoProps]);

	const form = useForm<
		THotelProductGeneralFormInput,
		unknown,
		THotelProductGeneralSchema
	>({
		resolver: zodResolver(HOTEL_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapHotelProductToGeneralForm(product)
	});

	useGeoFormFieldEnrichment({
		form,
		name: ENUM_FORM.LOCATION,
		language
	});

	useEffect(() => {
		form.reset(mapHotelProductToGeneralForm(product));
	}, [product, form]);

	const [createHotelProduct, { isLoading: isCreating }] =
		useCreateHotelProductMutation();
	const [updateHotelProduct, { isLoading: isUpdating }] =
		useUpdateHotelProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: THotelProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createHotelProduct({
					supplierId,
					values: data,
					language
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateHotelProduct({
				supplierId,
				productId,
				values: data,
				language,
				existingPolicy: product?.details?.policy
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

	const renderField = ({ key, ...item }: TForm) => (
		<CustomField
			key={key}
			control={form.control}
			name={key}
			t={t}
			{...item}
		/>
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-6 md:grid-cols-2"
			>
				{renderField(HOTEL_PRODUCT_GENERAL_NAME_FIELD)}
				{renderField(locationField)}
				{FORM_HOTEL_PRODUCT_GENERAL_LIST().map(renderField)}
				<div className="md:col-span-2 flex justify-end">
					<Button type="submit" size="lg" disabled={isLoading}>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.general.buttons.saving")
							: isCreate
								? t("form.general.buttons.create")
								: t("form.general.buttons.save")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const HotelProductGeneral = withErrorBoundary(HotelProductGeneralBase);

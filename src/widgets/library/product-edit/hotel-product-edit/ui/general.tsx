import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
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
import {
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

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

import { FORM_HOTEL_PRODUCT_GENERAL_LIST } from "../model";

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-6 md:grid-cols-2"
			>
				{FORM_HOTEL_PRODUCT_GENERAL_LIST(geoProps).map(
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
				<div className="md:col-span-2 flex justify-end">
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

export const HotelProductGeneral = withErrorBoundary(HotelProductGeneralBase);

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
	ACTIVITY_PRODUCT_GENERAL_SCHEMA,
	ENUM_FORM_ACTIVITY_PRODUCT as ENUM_FORM,
	type IActivityProduct,
	type TActivityProductGeneralSchema,
	mapActivityProductToGeneralForm,
	useCreateActivityProductMutation,
	useUpdateActivityProductMutation
} from "@/entities/supplier";

import { ACTIVITY_PRODUCT_GENERAL_LIST } from "../model";

interface IActivityProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IActivityProduct | null;
}

const ActivityProductGeneralBase: FC<IActivityProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t, i18n } = useTranslation("activity_product_edit_page");
	const navigate = useNavigate();
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const geoProps = useGeoSearchFieldProps(language);

	const form = useForm<TActivityProductGeneralSchema>({
		resolver: zodResolver(ACTIVITY_PRODUCT_GENERAL_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapActivityProductToGeneralForm(product)
	});

	useGeoFormFieldEnrichment({
		form,
		name: ENUM_FORM.LOCATION,
		language
	});

	useEffect(() => {
		form.reset(mapActivityProductToGeneralForm(product));
	}, [product, form]);

	const [createActivityProduct, { isLoading: isCreating }] =
		useCreateActivityProductMutation();
	const [updateActivityProduct, { isLoading: isUpdating }] =
		useUpdateActivityProductMutation();
	const isLoading = isCreating || isUpdating;

	async function onSubmit(data: TActivityProductGeneralSchema) {
		try {
			if (isCreate) {
				const created = await createActivityProduct({
					supplierId,
					values: data,
					language
				}).unwrap();
				toast.success(t("form.toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.SUPPLIER_ACTIVITY_PRODUCT, {
						supplierId,
						productId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateActivityProduct({
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid">
				<div className="grid gap-x-4 gap-y-1 grid-cols-2">
					{ACTIVITY_PRODUCT_GENERAL_LIST(geoProps).map(
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
				</div>
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

export const ActivityProductGeneral = withErrorBoundary(
	ActivityProductGeneralBase
);

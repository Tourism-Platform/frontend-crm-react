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
	ENUM_FORM_HOTEL_PRODUCT as ENUM_FORM,
	HOTEL_PRODUCT_NAME_SCHEMA,
	type THotelProductNameSchema,
	useCreateHotelProductMutation,
	useUpdateHotelProductNameMutation
} from "@/entities/supplier";

interface IHotelProductGeneralProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	name?: string;
}

const HotelProductGeneralBase: FC<IHotelProductGeneralProps> = ({
	supplierId,
	productId,
	isCreate,
	name = ""
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const navigate = useNavigate();
	const [createHotelProduct, { isLoading: isCreating }] =
		useCreateHotelProductMutation();
	const [updateHotelProductName, { isLoading: isUpdating }] =
		useUpdateHotelProductNameMutation();
	const isLoading = isCreating || isUpdating;

	const form = useForm<THotelProductNameSchema>({
		resolver: zodResolver(HOTEL_PRODUCT_NAME_SCHEMA),
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
				const created = await createHotelProduct({
					supplierId,
					data: {
						name: values[ENUM_FORM.NAME],
						amenities: []
					}
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

			await updateHotelProductName({
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

export const HotelProductGeneral = withErrorBoundary(HotelProductGeneralBase);

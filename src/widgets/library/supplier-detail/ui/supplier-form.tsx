import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Card,
	CardContent,
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_SUPPLIER as ENUM_FORM,
	SUPPLIER_UPDATE_SCHEMA,
	type TSupplierUpdateSchema,
	useGetSupplierQuery,
	useUpdateSupplierMutation
} from "@/entities/supplier";

import { FORM_SUPPLIER_DETAIL_LIST } from "../model";

import { SupplierLogoInfo } from "./supplier-logo-info";

interface ISupplierFormProps {
	supplierId: string;
}

const SupplierFormBase: FC<ISupplierFormProps> = ({ supplierId }) => {
	const { t } = useTranslation("supplier_id_page");

	const { data: supplier, isRealError: isSupplierError } =
		useOptionalResourceQuery(
			useGetSupplierQuery({ supplierId }, { skip: !supplierId })
		);

	const [updateSupplier, { isLoading: isSaving }] =
		useUpdateSupplierMutation();

	const form = useForm<TSupplierUpdateSchema>({
		resolver: zodResolver(SUPPLIER_UPDATE_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FORM.BRAND_NAME]: "",
			[ENUM_FORM.LEGAL_NAME]: "",
			[ENUM_FORM.PHONE]: "",
			[ENUM_FORM.WEBSITE]: ""
		}
	});

	useEffect(() => {
		if (!supplier) return;
		form.reset({
			[ENUM_FORM.BRAND_NAME]: supplier.brandName ?? "",
			[ENUM_FORM.LEGAL_NAME]: supplier.legalName ?? "",
			[ENUM_FORM.PHONE]: supplier.phone ?? "",
			[ENUM_FORM.WEBSITE]: supplier.website ?? ""
		});
	}, [supplier, form]);

	useEffect(() => {
		if (isSupplierError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isSupplierError, t]);

	async function onSubmit(data: TSupplierUpdateSchema) {
		try {
			await updateSupplier({
				supplierId,
				data
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error("Failed to update supplier:", error);
		}
	}

	return (
		<Card>
			<CardContent className="space-y-6">
				<SupplierLogoInfo
					supplierId={supplierId}
					brandName={supplier?.brandName ?? ""}
					logoPath={supplier?.logoPath ?? ""}
				/>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_SUPPLIER_DETAIL_LIST().map(
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
								size="lg"
								isLoading={isSaving}
								label={t("form.buttons.save")}
								loadingLabel={t("form.buttons.saving")}
							/>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export const SupplierForm = withErrorBoundary(SupplierFormBase);

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	Form,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_OPERATOR_TAX_SETTINGS,
	OPERATOR_TAX_SETTINGS_SCHEMA,
	type TOperatorTaxSettingsSchema,
	useGetOperatorFinanceInfoQuery,
	useUpdateOperatorFinanceInfoMutation
} from "@/entities/finance";

import { TAX_SETTINGS_PROFIT_TAX, TAX_SETTINGS_VAT } from "../../model";

const TaxSettingsBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");
	const {
		data: taxSettingsData,
		isError: isTaxSettingsError,
		isLoading: isTaxSettingsLoading
	} = useGetOperatorFinanceInfoQuery();
	const [updateOperatorFinanceInfo, { isLoading: isUpdating }] =
		useUpdateOperatorFinanceInfoMutation();

	const form = useForm<TOperatorTaxSettingsSchema>({
		resolver: zodResolver(OPERATOR_TAX_SETTINGS_SCHEMA),
		mode: "onSubmit"
	});

	const vatEnabled = useWatch({
		control: form.control,
		name: ENUM_FORM_OPERATOR_TAX_SETTINGS.VAT_ENABLED
	});
	const profitTaxEnabled = useWatch({
		control: form.control,
		name: ENUM_FORM_OPERATOR_TAX_SETTINGS.PROFIT_TAX_ENABLED
	});

	useEffect(() => {
		if (taxSettingsData) {
			form.reset(taxSettingsData);
		}
	}, [taxSettingsData, form.reset]);

	useEffect(() => {
		if (isTaxSettingsError) {
			toast.error(t("tax_settings.form.toasts.save.error"));
		}
	}, [isTaxSettingsError, t]);

	async function handleSave(data: TOperatorTaxSettingsSchema) {
		try {
			await updateOperatorFinanceInfo(data).unwrap();
			toast.success(t("tax_settings.form.toasts.save.success"));
		} catch (e) {
			toast.error(t("tax_settings.form.toasts.save.error"));
			console.error(e);
		}
	}

	const isLoading =
		isUpdating || isTaxSettingsLoading || form.formState.isSubmitting;
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSave)}
				className="flex flex-col gap-8"
			>
				<div className="flex flex-col gap-6">
					<div className="flex justify-between gap-6 items-center">
						<div className="flex flex-col gap-2">
							<h2 className="text-xl">
								{t("tax_settings.form.fields.vat.label")}
							</h2>
							<p className="text-sm text-muted-foreground">
								{t("tax_settings.form.fields.vat.description")}
							</p>
						</div>
						<CustomField
							control={form.control}
							{...TAX_SETTINGS_VAT[0]}
							name={TAX_SETTINGS_VAT[0].key}
							t={t}
						/>
					</div>
					<CustomField
						control={form.control}
						{...TAX_SETTINGS_VAT[1]}
						name={TAX_SETTINGS_VAT[1].key}
						disabled={!vatEnabled}
						t={t}
					/>
				</div>
				<Separator />
				<div className="flex flex-col gap-6">
					<div className="flex justify-between gap-6 items-center">
						<div className="flex flex-col gap-2">
							<h2 className="text-xl">
								{t("tax_settings.form.fields.profit_tax.label")}
							</h2>
							<p className="text-sm text-muted-foreground">
								{t(
									"tax_settings.form.fields.profit_tax.description"
								)}
							</p>
						</div>
						<CustomField
							control={form.control}
							{...TAX_SETTINGS_PROFIT_TAX[0]}
							name={TAX_SETTINGS_PROFIT_TAX[0].key}
							t={t}
						/>
					</div>
					<CustomField
						control={form.control}
						{...TAX_SETTINGS_PROFIT_TAX[1]}
						name={TAX_SETTINGS_PROFIT_TAX[1].key}
						disabled={!profitTaxEnabled}
						t={t}
					/>
				</div>

				<div>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader className="mr-2 h-4 w-4 animate-spin" />
								{isTaxSettingsLoading
									? t("tax_settings.form.buttons.loading")
									: t("tax_settings.form.buttons.saving")}
							</>
						) : (
							t("tax_settings.form.buttons.save")
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const TaxSettings = withErrorBoundary(TaxSettingsBase);

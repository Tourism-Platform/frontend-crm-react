import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_SETTINGS_FINANCE_FORM,
	SETTINGS_FINANCE_FORM_SCHEMA,
	type TSettingsFinanceFormSchema,
	useCreateTourFinanceMutation,
	useGetTourFinanceQuery,
	useUpdateTourFinanceMutation
} from "@/entities/tour";

import { FINANCE_FORM_LIST } from "../../model/config/finance.config";

import { FocTiersDetails } from "./foc-tiers-details";

const FinanceInfoBase: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const financeQuery = useGetTourFinanceQuery(tourId, {
		skip: !tourId
	});
	const {
		data: tour,
		isLoading: isTourLoading,
		isRealError,
		isNotFound,
		mode
	} = useOptionalResourceQuery(financeQuery);

	const [createFinance, { isLoading: isCreating }] =
		useCreateTourFinanceMutation();
	const [updateFinance, { isLoading: isUpdating }] =
		useUpdateTourFinanceMutation();

	const isSaving = isCreating || isUpdating;

	const form = useForm<TSettingsFinanceFormSchema>({
		resolver: zodResolver(SETTINGS_FINANCE_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS]: []
		}
	});

	useEffect(() => {
		if (isTourLoading) return;

		if (tour) {
			form.reset(tour);
			return;
		}

		if (isNotFound) {
			form.reset({
				[ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS]: []
			});
		}
	}, [tour, isNotFound, isTourLoading, form]);

	useEffect(() => {
		if (isRealError) {
			toast.error(t("finance.form.toasts.load.error"));
		}
	}, [isRealError, t]);

	async function onSubmit(data: TSettingsFinanceFormSchema) {
		if (!tourId) return;

		try {
			if (mode === "create") {
				await createFinance({ id: tourId, data }).unwrap();
			} else {
				await updateFinance({ id: tourId, data }).unwrap();
			}

			toast.success(t("finance.form.toasts.save.success"));
		} catch (error) {
			toast.error(t("finance.form.toasts.save.error"));
			console.error("Failed to save tour finance:", error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<h2 className="text-xl col-span-2">{t("finance.title")}</h2>
				<div className="col-span-2">
					{FINANCE_FORM_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
				<FocTiersDetails form={form} />
				<div className="col-span-2 flex justify-end">
					<Button type="submit" disabled={isSaving || isTourLoading}>
						{isSaving || isTourLoading ? (
							<>
								<Loader className="mr-2 h-4 w-4 animate-spin" />
								{isTourLoading
									? t("finance.form.buttons.loading")
									: t("finance.form.buttons.saving")}
							</>
						) : (
							t("finance.form.buttons.save")
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const FinanceInfo = withErrorBoundary(FinanceInfoBase);

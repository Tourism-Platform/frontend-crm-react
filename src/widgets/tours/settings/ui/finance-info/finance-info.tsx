import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button, CustomField, Form } from "@/shared/ui";

import {
	ENUM_SETTINGS_FINANCE_FORM,
	SETTINGS_FINANCE_FORM_SCHEMA,
	type TSettingsFinanceFormSchema,
	useGetTourFinanceQuery,
	useUpdateTourFinanceMutation
} from "@/entities/tour";

import { FINANCE_FORM_LIST } from "../../model";

export const FinanceInfo: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId } = useParams<{ tourId: string }>();

	const { data: tour } = useGetTourFinanceQuery(tourId as string, {
		skip: !tourId
	});
	const [updateTour, { isLoading: isUpdating }] =
		useUpdateTourFinanceMutation();

	const form = useForm<TSettingsFinanceFormSchema>({
		resolver: zodResolver(SETTINGS_FINANCE_FORM_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (tour) {
			form.reset({
				[ENUM_SETTINGS_FINANCE_FORM.CURRENCY_TYPE]: tour.currencyType,
				[ENUM_SETTINGS_FINANCE_FORM.PRICING_VISIBILITY]:
					tour.pricingVisibility
			});
		}
	}, [tour, form]);

	async function onSubmit(data: TSettingsFinanceFormSchema) {
		if (!tourId) return;
		try {
			await updateTour({ id: tourId, data }).unwrap();
			toast.success(t("finance.toasts.success"));
		} catch (error) {
			toast.error(t("finance.toasts.error"));
			console.error("Failed to update tour finance:", error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<h2 className="text-xl">{t("finance.title")}</h2>
				<div className="grid grid-cols-1 gap-4">
					{FINANCE_FORM_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
				<div className="flex justify-end mt-6">
					<Button type="submit" disabled={isUpdating}>
						{isUpdating && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{t("finance.buttons.save")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

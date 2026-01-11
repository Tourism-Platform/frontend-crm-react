import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button, CustomField, CustomRangeField, Form } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_SETTINGS_GENERAL_FORM,
	SETTINGS_GENERAL_FORM_SCHEMA,
	TOUR_CATEGORY_LABELS,
	type TSettingsGeneralFormSchema,
	useGetTourGeneralQuery,
	useUpdateTourGeneralMutation
} from "@/entities/tour";

import { GENERAL_FORM_LIST } from "../../model";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		data: tour,
		isLoading: isTourLoading,
		isError: isTourError
	} = useGetTourGeneralQuery(tourId, {
		skip: !tourId
	});
	const [updateTour, { isLoading: isUpdating }] =
		useUpdateTourGeneralMutation();

	const form = useForm<TSettingsGeneralFormSchema>({
		resolver: zodResolver(SETTINGS_GENERAL_FORM_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (tour) {
			form.reset(tour);
		}
	}, [tour, form]);

	useEffect(() => {
		if (isTourError) {
			toast.error(t("general.form.toasts.load.error"));
		}
	}, [isTourError, t]);

	async function onSubmit(data: TSettingsGeneralFormSchema) {
		if (!tourId) return;
		try {
			await updateTour({ id: tourId, data }).unwrap();
			toast.success(t("general.form.toasts.save.success"));
		} catch (error) {
			toast.error(t("general.form.toasts.save.error"));
			console.error("Failed to update tour:", error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<h2 className="text-xl">{t("general.title")}</h2>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{GENERAL_FORM_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
					<CustomRangeField
						control={form?.control}
						name={ENUM_SETTINGS_GENERAL_FORM.DURATION}
						label="general.form.fields.duration.label"
						placeholder_left="general.form.fields.duration.placeholder_left"
						placeholder_right="general.form.fields.duration.placeholder_right"
						t={t}
					/>
					<CustomRangeField
						control={form?.control}
						name={ENUM_SETTINGS_GENERAL_FORM.AGE_REQUIRES}
						label="general.form.fields.ageRequires.label"
						placeholder_left="general.form.fields.ageRequires.placeholder_left"
						placeholder_right="general.form.fields.ageRequires.placeholder_right"
						t={t}
					/>
					<CustomField
						control={form?.control}
						name={ENUM_SETTINGS_GENERAL_FORM.TOUR_CATEGORIES}
						label="general.form.fields.tourCategories.label"
						placeholder="general.form.fields.tourCategories.placeholder"
						options={useValueToTranslateLabel(TOUR_CATEGORY_LABELS)}
						fieldType="multiselect"
						className="col-span-2"
						badgeVariant="secondary"
						t={t}
					/>
				</div>
				<div className="flex justify-end mt-6">
					<Button
						type="submit"
						disabled={isUpdating || isTourLoading}
					>
						{isUpdating || isTourLoading ? (
							<>
								<Loader className="mr-2 h-4 w-4 animate-spin" />
								{isTourLoading
									? t("general.form.buttons.loading")
									: t("general.form.buttons.saving")}
							</>
						) : (
							t("general.form.buttons.save")
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

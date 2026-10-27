import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, Fragment, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	CustomField,
	CustomRangeField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_TOUR_SETTINGS_GENERAL_FORM,
	ENUM_TOUR_TYPES,
	TOUR_SETTINGS_GENERAL_FORM_SCHEMA,
	type TTourSettingsGeneralFormSchema,
	useGetTourGeneralQuery,
	useUpdateTourGeneralMutation
} from "@/entities/tour";
import {
	AgencyOptionCard,
	AgencyOptionCardSkeleton,
	type TAgencySelectOption,
	useAgencySearchOptions,
	useGetOperatorAgencyInfoByIdQuery
} from "@/entities/user";

import { GENERAL_FORM_LIST } from "../../model/config/general.config";

const GeneralInfoBase: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		data: tour,
		isLoading: isTourLoading,
		isRealError: isTourError
	} = useOptionalResourceQuery(
		useGetTourGeneralQuery(tourId, {
			skip: !tourId
		})
	);
	const [updateTour, { isLoading: isUpdating }] =
		useUpdateTourGeneralMutation();

	const form = useForm<TTourSettingsGeneralFormSchema>({
		resolver: zodResolver(TOUR_SETTINGS_GENERAL_FORM_SCHEMA),
		mode: "onSubmit"
	});

	const tourType = useWatch({
		control: form.control,
		name: ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TYPE
	});
	const isPrivateTour = tourType === ENUM_TOUR_TYPES.PRIVATE;
	const agency = useAgencySearchOptions({ enabled: isPrivateTour });
	const { data: tourAgency } = useGetOperatorAgencyInfoByIdQuery(
		tour?.agencyId ?? "",
		{ skip: !tour?.agencyId }
	);
	const agencyId = useWatch({
		control: form.control,
		name: ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID
	});

	useEffect(() => {
		if (tourType && !isPrivateTour) {
			form.setValue(ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID, null);
		}
	}, [tourType, isPrivateTour, form]);

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

	async function onSubmit(data: TTourSettingsGeneralFormSchema) {
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
		<div className="flex flex-col gap-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<h2 className="text-xl">{t("general.title")}</h2>
					<div className="grid grid-cols-2 gap-x-4 gap-y-1">
						{GENERAL_FORM_LIST({ defaultValues: tour }).map(
							({ key, ...item }) => {
								if (
									key ===
										ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION ||
									key ===
										ENUM_TOUR_SETTINGS_GENERAL_FORM.AGE_REQUIRES
								) {
									return (
										<CustomRangeField
											key={key}
											control={form.control}
											name={key}
											label={`general.form.fields.${key}.label`}
											placeholder_left={`general.form.fields.${key}.placeholder_left`}
											placeholder_right={`general.form.fields.${key}.placeholder_right`}
											t={t}
										/>
									);
								}

								if (
									key ===
									ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE
								) {
									return (
										<Fragment key={key}>
											<CustomField
												control={form.control}
												name={key}
												t={t}
												{...item}
											/>
											{isPrivateTour ? (
												<CustomField
													fieldType="asyncSelect"
													control={form.control}
													className="col-span-2"
													name={
														ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID
													}
													t={t}
													label="general.form.fields.agencyId.label"
													placeholder="general.form.fields.agencyId.placeholder"
													emptyText="general.form.fields.agencyId.empty"
													selectedLabel={
														agencyId &&
														agencyId ===
															tour?.agencyId
															? (tourAgency?.businessName ??
																tourAgency?.legalName ??
																undefined)
															: undefined
													}
													options={agency.options}
													onQueryChange={
														agency.setQuery
													}
													onLoadMore={agency.loadMore}
													hasMore={agency.hasMore}
													isLoading={agency.isLoading}
													isLoadingMore={
														agency.isLoadingMore
													}
													renderOption={(option) => (
														<AgencyOptionCard
															option={
																option as TAgencySelectOption
															}
														/>
													)}
													renderSkeleton={() => (
														<AgencyOptionCardSkeleton />
													)}
												/>
											) : null}
										</Fragment>
									);
								}

								return (
									<CustomField
										key={key}
										control={form.control}
										name={key}
										t={t}
										{...item}
									/>
								);
							}
						)}
					</div>
					<div className="flex justify-end mt-6">
						<LoaderButton
							type="submit"
							disabled={isUpdating || isTourLoading}
							isLoading={isUpdating || isTourLoading}
							label={t("general.form.buttons.save")}
							loadingLabel={
								isTourLoading
									? t("general.form.buttons.loading")
									: t("general.form.buttons.saving")
							}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

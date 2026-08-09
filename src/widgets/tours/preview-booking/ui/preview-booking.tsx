import { ArrowLeft } from "lucide-react";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router";

import type { TPreviewBookingPageKeys } from "@/shared/config";
import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import { useIsMobile } from "@/shared/hooks";
import {
	Button,
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
	withErrorBoundary
} from "@/shared/ui";

import { usePreviewBooking } from "../model/hooks/use-preview-booking";

import { BookingStepperCarousel } from "./booking-stepper-carousel";
import { PreviewBookingSidebar } from "./preview-booking-sidebar";
import { Step1DateTravellers } from "./steps/step1-date-travellers";
import { Step2TravellerDetails } from "./steps/step2-traveller-details";
import { Step3Confirmation } from "./steps/step3-confirmation";

const BOOKING_FORM_ID = "preview-booking-form";

const STEPS: Array<{
	step: number;
	labelKey: TPreviewBookingPageKeys;
	titleKey: TPreviewBookingPageKeys;
}> = [
	{
		step: 1,
		labelKey: "stepper.step_1.label",
		titleKey: "stepper.step_1.title"
	},
	{
		step: 2,
		labelKey: "stepper.step_2.label",
		titleKey: "stepper.step_2.title"
	},
	{
		step: 3,
		labelKey: "stepper.step_3.label",
		titleKey: "stepper.step_3.title"
	}
];

const LAST_STEP = STEPS[STEPS.length - 1].step;

const PreviewBookingBase: FC = () => {
	const { t } = useTranslation("preview_booking_page");
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const { tourId = "" } = useParams<{ tourId: string; bookingId?: string }>();
	const {
		form,
		currentStep,
		handleNextStep,
		handlePrevStep,
		handleAddTraveller,
		handleRemoveTraveller,
		canAddTraveller,
		onSubmit,
		isLoading,
		isPaxLoading,
		isCreating,
		isUpdating,
		submittedBooking,
		tourData,
		options,
		availableDates,
		handleCalendarMonthChange,
		isOptionsLoading,
		bookingId
	} = usePreviewBooking();

	const isStepActionLoading =
		currentStep === 1 ? isCreating || isUpdating : isLoading;

	const sidebarAction =
		currentStep === 1
			? {
					label: t("step_1.continue"),
					onClick: handleNextStep,
					isLoading: isStepActionLoading,
					type: "button" as const
				}
			: currentStep === 2
				? {
						label: t("step_2.submit"),
						type: "submit" as const,
						form: BOOKING_FORM_ID,
						isLoading: isStepActionLoading
					}
				: undefined;

	const stepperSteps = STEPS.map(({ step, labelKey, titleKey }) => ({
		step,
		label: t(labelKey),
		title: t(titleKey)
	}));

	return (
		<FormProvider {...form}>
			<div className="w-full py-8">
				{currentStep < LAST_STEP && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="mb-8 w-fit"
						onClick={() =>
							navigate(
								generatePath(
									ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR,
									{ tourId }
								)
							)
						}
					>
						<ArrowLeft className="h-4 w-4" />
						{t("back_to_tour")}
					</Button>
				)}

				<div
					className={`mb-8 ${currentStep === LAST_STEP ? "mx-auto max-w-3xl" : "w-full"}`}
				>
					{isMobile ? (
						<BookingStepperCarousel
							steps={stepperSteps}
							currentStep={currentStep}
						/>
					) : (
						<Stepper value={currentStep}>
							{STEPS.map(
								({ step, labelKey, titleKey }, index) => (
									<StepperItem
										key={step}
										step={step}
										className="not-last:flex-1"
									>
										<StepperTrigger asChild>
											<StepperIndicator />
										</StepperTrigger>
										<div className="ml-2 flex flex-col">
											<span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
												{t(labelKey)}
											</span>
											<span
												className={`text-sm font-medium ${step === currentStep ? "text-foreground" : "text-muted-foreground"}`}
											>
												{t(titleKey)}
											</span>
										</div>
										{index < STEPS.length - 1 && (
											<StepperSeparator />
										)}
									</StepperItem>
								)
							)}
						</Stepper>
					)}
				</div>

				<div
					className={`grid items-start gap-8 ${currentStep < LAST_STEP ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}
				>
					<form
						id={BOOKING_FORM_ID}
						onSubmit={form.handleSubmit(onSubmit)}
						className={`flex w-full min-w-0 flex-col gap-8 ${currentStep === LAST_STEP ? "mx-auto max-w-3xl" : ""}`}
					>
						{currentStep === 1 && (
							<Step1DateTravellers
								onMonthChange={handleCalendarMonthChange}
								options={options}
								availableDates={availableDates}
								isOptionsLoading={isOptionsLoading}
								isOptionLocked={!!bookingId}
							/>
						)}
						{currentStep === 2 && (
							<Step2TravellerDetails
								onPrev={handlePrevStep}
								onAddTraveller={handleAddTraveller}
								onRemoveTraveller={handleRemoveTraveller}
								canAddTraveller={canAddTraveller}
								isLoading={isLoading}
								isPaxLoading={isPaxLoading}
							/>
						)}
						{currentStep === 3 && (
							<Step3Confirmation
								submittedBooking={submittedBooking}
								tourData={tourData}
								options={options}
							/>
						)}
					</form>

					{currentStep < LAST_STEP && (
						<PreviewBookingSidebar
							tourData={tourData}
							options={options}
							submittedBooking={submittedBooking}
							action={sidebarAction}
						/>
					)}
				</div>
			</div>
		</FormProvider>
	);
};

export const PreviewBooking = withErrorBoundary(PreviewBookingBase);

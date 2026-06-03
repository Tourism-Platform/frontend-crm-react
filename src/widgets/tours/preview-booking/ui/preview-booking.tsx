import { ArrowLeft } from "lucide-react";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router";

import type { TPreviewBookingPageKeys } from "@/shared/config";
import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
	withErrorBoundary
} from "@/shared/ui";

import { usePreviewBooking } from "../model/hooks/use-preview-booking";

import { PreviewBookingSidebar } from "./preview-booking-sidebar";
import { Step1DateTravellers } from "./steps/step1-date-travellers";
import { Step2TravellerDetails } from "./steps/step2-traveller-details";
import { Step3Confirmation } from "./steps/step3-confirmation";

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
		isOptionsLoading,
		bookingId
	} = usePreviewBooking();

	return (
		<FormProvider {...form}>
			<div className="container py-8 max-w-[1200px]">
				{currentStep < LAST_STEP && (
					<button
						onClick={() =>
							navigate(
								generatePath(
									ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR,
									{ tourId }
								)
							)
						}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						{t("back_to_tour")}
					</button>
				)}

				<div
					className={`mb-8 ${currentStep === LAST_STEP ? "max-w-3xl mx-auto" : "max-w-3xl"}`}
				>
					<Stepper value={currentStep}>
						{STEPS.map(({ step, labelKey, titleKey }, index) => (
							<StepperItem
								key={step}
								step={step}
								className="not-last:flex-1"
							>
								<StepperTrigger asChild>
									<StepperIndicator />
								</StepperTrigger>
								<div className="ml-2 flex flex-col">
									<span className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
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
						))}
					</Stepper>
				</div>

				<div
					className={`grid gap-8 items-start ${currentStep < LAST_STEP ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}
				>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={`flex flex-col gap-8 w-full min-w-0 ${currentStep === LAST_STEP ? "max-w-3xl mx-auto" : ""}`}
					>
						{currentStep === 1 && (
							<Step1DateTravellers
								onNext={handleNextStep}
								isLoading={isCreating || isUpdating}
								options={options}
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
						/>
					)}
				</div>
			</div>
		</FormProvider>
	);
};

export const PreviewBooking = withErrorBoundary(PreviewBookingBase);

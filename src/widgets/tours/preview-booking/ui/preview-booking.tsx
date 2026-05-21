import { ArrowLeft } from "lucide-react";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

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

const steps = [1, 2, 3];

const PreviewBookingBase: FC = () => {
	const { t } = useTranslation("preview_booking_page");
	const navigate = useNavigate();
	const {
		form,
		currentStep,
		handleNextStep,
		handlePrevStep,
		onSubmit,
		isLoading,
		bookingData,
		tourData
	} = usePreviewBooking();

	return (
		<FormProvider {...form}>
			<div className="container py-8 max-w-[1200px]">
				{currentStep < 3 && (
					<button
						onClick={() => navigate("..")}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						{t("back_to_tour")}
					</button>
				)}

				<div
					className={`mb-8 ${currentStep === 3 ? "max-w-3xl mx-auto" : "max-w-3xl"}`}
				>
					<Stepper value={currentStep}>
						{steps.map((step) => (
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
										{t(`stepper.step_${step}.label` as any)}
									</span>
									<span
										className={`text-sm font-medium ${step === currentStep ? "text-foreground" : "text-muted-foreground"}`}
									>
										{t(`stepper.step_${step}.title` as any)}
									</span>
								</div>
								{step < steps.length && <StepperSeparator />}
							</StepperItem>
						))}
					</Stepper>
				</div>

				<div
					className={`grid gap-8 items-start ${currentStep < 3 ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}
				>
					<form
						onSubmit={form.handleSubmit(onSubmit as any)}
						className={`flex flex-col gap-8 w-full min-w-0 ${currentStep === 3 ? "max-w-3xl mx-auto" : ""}`}
					>
						{currentStep === 1 && (
							<Step1DateTravellers onNext={handleNextStep} />
						)}
						{currentStep === 2 && (
							<Step2TravellerDetails
								onPrev={handlePrevStep}
								isLoading={isLoading}
							/>
						)}
						{currentStep === 3 && (
							<Step3Confirmation bookingData={bookingData} />
						)}
					</form>

					{currentStep < 3 && (
						<PreviewBookingSidebar tourData={tourData} />
					)}
				</div>
			</div>
		</FormProvider>
	);
};

export const PreviewBooking = withErrorBoundary(PreviewBookingBase);

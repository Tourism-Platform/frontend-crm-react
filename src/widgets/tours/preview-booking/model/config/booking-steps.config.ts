import type { IPreviewBookingStep } from "../types";

export const PREVIEW_BOOKING_STEPS: IPreviewBookingStep[] = [
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

export const PREVIEW_BOOKING_LAST_STEP =
	PREVIEW_BOOKING_STEPS[PREVIEW_BOOKING_STEPS.length - 1].step;

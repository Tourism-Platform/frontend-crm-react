import type { TPreviewBookingPageKeys } from "@/shared/config";

export interface IPreviewBookingStep {
	step: number;
	labelKey: TPreviewBookingPageKeys;
	titleKey: TPreviewBookingPageKeys;
}

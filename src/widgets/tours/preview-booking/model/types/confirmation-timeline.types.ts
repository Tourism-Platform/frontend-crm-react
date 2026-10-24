import type { LucideIcon } from "lucide-react";

import type { TPreviewBookingPageKeys } from "@/shared/config";

export interface IConfirmationTimelineItem {
	titleKey: TPreviewBookingPageKeys;
	descKey: TPreviewBookingPageKeys;
	icon: LucideIcon;
}

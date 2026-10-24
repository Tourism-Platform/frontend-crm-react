import { Check, Clock, DollarSign, Star, ThumbsUp } from "lucide-react";

import type { IConfirmationTimelineItem } from "../types";

/** Шаги «что дальше» на экране подтверждения */
export const CONFIRMATION_TIMELINE: IConfirmationTimelineItem[] = [
	{
		titleKey: "step_3.timeline.request_submitted.title",
		descKey: "step_3.timeline.request_submitted.desc",
		icon: Check
	},
	{
		titleKey: "step_3.timeline.provider_review.title",
		descKey: "step_3.timeline.provider_review.desc",
		icon: Clock
	},
	{
		titleKey: "step_3.timeline.booking_confirmed.title",
		descKey: "step_3.timeline.booking_confirmed.desc",
		icon: ThumbsUp
	},
	{
		titleKey: "step_3.timeline.payment_info.title",
		descKey: "step_3.timeline.payment_info.desc",
		icon: DollarSign
	},
	{
		titleKey: "step_3.timeline.voucher_time.title",
		descKey: "step_3.timeline.voucher_time.desc",
		icon: Star
	}
];

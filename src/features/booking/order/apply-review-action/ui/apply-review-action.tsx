import { Check, CircleCheckBig, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import {
	ENUM_AVAILABILITY_STATUS,
	type ENUM_AVAILABILITY_STATUS_TYPE,
	getNextAvailabilityApplyStatus,
	useApplyEventAvailabilityMutation
} from "@/entities/booking";

interface IApplyReviewActionProps {
	bookingId: string;
	eventId?: string;
	optionIndex: number;
	availabilityStatus?: ENUM_AVAILABILITY_STATUS_TYPE;
}

export const ApplyReviewAction = ({
	bookingId,
	eventId,
	optionIndex,
	availabilityStatus
}: IApplyReviewActionProps) => {
	const { t } = useTranslation("order_id_page");
	const [apply, { isLoading }] = useApplyEventAvailabilityMutation();

	const nextStatus = getNextAvailabilityApplyStatus(availabilityStatus);
	const isApplied = availabilityStatus === ENUM_AVAILABILITY_STATUS.SELECTED;

	async function handleApply() {
		if (!eventId || !nextStatus || isApplied) return;

		try {
			await apply({
				bookingId,
				eventId,
				optionIndex,
				status: nextStatus
			}).unwrap();
			toast.success(t("tour_review.table.toasts.success"));
		} catch (error) {
			toast.error(t("tour_review.table.toasts.error"));
			console.error("Failed to apply event availability:", error);
		}
	}

	return (
		<Button
			variant={isApplied ? "green_outline" : "cyan_outline"}
			onClick={handleApply}
			disabled={isLoading || isApplied || !eventId || !nextStatus}
			className="min-w-24"
		>
			{isApplied ? (
				<>
					{t("tour_review.table.applied")}
					<CircleCheckBig className="size-4" />
				</>
			) : (
				<>
					{t("tour_review.table.apply")}
					{isLoading ? (
						<Loader2 className="size-4 text-primary animate-spin" />
					) : (
						<Check className="size-4" />
					)}
				</>
			)}
		</Button>
	);
};

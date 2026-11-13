import { CheckCircleIcon } from "@solar-icons/react/outline";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

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
		<LoaderButton
			type="button"
			variant={isApplied ? "secondary" : "default"}
			onClick={handleApply}
			disabled={isLoading || isApplied || !eventId || !nextStatus}
			isLoading={isLoading}
			className="min-w-24"
			icon={<CheckCircleIcon />}
			label={
				isApplied
					? t("tour_review.table.applied")
					: t("tour_review.table.apply")
			}
		/>
	);
};

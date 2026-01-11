import { Check, CircleCheckBig, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import { useApplyReviewItemMutation } from "@/entities/booking";

interface IApplyReviewActionProps {
	id: string;
	parentId?: string;
	isApplied?: boolean;
}

export const ApplyReviewAction = ({
	id,
	parentId,
	isApplied
}: IApplyReviewActionProps) => {
	const { t } = useTranslation("order_id_page");
	const [apply, { isLoading }] = useApplyReviewItemMutation();

	async function handleApply() {
		if (isApplied) return;
		try {
			await apply({ id, parentId }).unwrap();
			toast.success(t("tour_review.table.toasts.success"));
		} catch (error) {
			toast.error(t("tour_review.table.toasts.error"));
			console.error("Failed to apply review item:", error);
		}
	}

	return (
		<Button
			variant={isApplied ? "green_outline" : "cyan_outline"}
			onClick={handleApply}
			disabled={isLoading || isApplied}
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

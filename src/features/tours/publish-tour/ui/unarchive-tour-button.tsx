import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import { useUnarchiveTourMutation } from "@/entities/tour";

interface IUnarchiveTourButtonProps {
	tourId: string;
}

export const UnarchiveTourButton: FC<IUnarchiveTourButtonProps> = ({
	tourId
}) => {
	const { t } = useTranslation("common_tours");
	const [unarchiveTour, { isLoading }] = useUnarchiveTourMutation();

	const handleUnarchive = async () => {
		if (!tourId) return;
		try {
			await unarchiveTour(tourId).unwrap();
			toast.success(t("toast.unarchive.success"));
		} catch {
			toast.error(t("toast.unarchive.error"));
		}
	};

	return (
		<Button
			variant="green_outline"
			onClick={handleUnarchive}
			disabled={isLoading || !tourId}
		>
			{isLoading ? (
				<>
					<Loader className="mr-2 h-4 w-4 animate-spin" />
					{t("actions.unarchiving")}
				</>
			) : (
				t("actions.unarchive")
			)}
		</Button>
	);
};

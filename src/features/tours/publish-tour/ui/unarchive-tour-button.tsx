import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

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
		<LoaderButton
			type="button"
			variant="green_outline"
			onClick={handleUnarchive}
			isLoading={isLoading}
			disabled={!tourId}
			label={t("actions.unarchive")}
			loadingLabel={t("actions.unarchiving")}
		/>
	);
};

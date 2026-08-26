import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

import { useArchiveTourMutation } from "@/entities/tour";

interface IArchiveTourButtonProps {
	tourId: string;
}

export const ArchiveTourButton: FC<IArchiveTourButtonProps> = ({ tourId }) => {
	const { t } = useTranslation("common_tours");
	const [archiveTour, { isLoading }] = useArchiveTourMutation();

	const handleArchive = async () => {
		if (!tourId) return;
		try {
			await archiveTour(tourId).unwrap();
			toast.success(t("toast.archive.success"));
		} catch {
			toast.error(t("toast.archive.error"));
		}
	};

	return (
		<LoaderButton
			type="button"
			variant="slate"
			onClick={handleArchive}
			isLoading={isLoading}
			disabled={!tourId}
			label={t("actions.archive")}
			loadingLabel={t("actions.archiving")}
		/>
	);
};

import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

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
		<Button
			variant="slate"
			onClick={handleArchive}
			disabled={isLoading || !tourId}
		>
			{isLoading ? (
				<>
					<Loader className="mr-2 h-4 w-4 animate-spin" />
					{t("actions.archiving")}
				</>
			) : (
				t("actions.archive")
			)}
		</Button>
	);
};

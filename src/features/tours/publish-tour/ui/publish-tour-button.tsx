import { Loader2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import { usePublishTourMutation } from "@/entities/tour";

export const PublishTourButton: FC = () => {
	const { t } = useTranslation("common_tours");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const [publishTour, { isLoading }] = usePublishTourMutation();

	const handlePublish = async () => {
		try {
			await publishTour(tourId).unwrap();
			toast.success(t("toast.publish.success"));
		} catch {
			toast.error(t("toast.publish.error"));
		}
	};

	return (
		<Button onClick={handlePublish} disabled={isLoading}>
			{isLoading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{t("actions.publishing")}
				</>
			) : (
				t("actions.publish")
			)}
		</Button>
	);
};

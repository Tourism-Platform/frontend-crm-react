import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

import { usePublishTourMutation } from "@/entities/tour";

import { resolvePublishErrorCode } from "../model";

interface IPublishTourButtonProps {
	tourId: string;
}

export const PublishTourButton: FC<IPublishTourButtonProps> = ({ tourId }) => {
	const { t } = useTranslation("common_tours");
	const [publishTour, { isLoading }] = usePublishTourMutation();

	const handlePublish = async () => {
		if (!tourId) return;
		try {
			await publishTour(tourId).unwrap();
			toast.success(t("toast.publish.success"));
		} catch (error) {
			const code = resolvePublishErrorCode(error);
			toast.error(
				code
					? t(`toast.publish.errors.${code}`)
					: t("toast.publish.error")
			);
		}
	};

	return (
		<LoaderButton
			type="button"
			variant="default"
			onClick={handlePublish}
			isLoading={isLoading}
			disabled={!tourId}
			label={t("actions.publish")}
			loadingLabel={t("actions.publishing")}
		/>
	);
};

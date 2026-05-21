import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import { type IPreviewOption, PreviewOptionCard } from "./preview-option-card";

interface IPreviewOptionsCardsProps {
	options: IPreviewOption[];
}

export const PreviewOptionsCardsBase: FC<IPreviewOptionsCardsProps> = ({
	options
}) => {
	const { t } = useTranslation("preview_tour_page");

	if (!options || options.length === 0) return null;

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="text-2xl font-bold mb-2">
					{t("sections.itinerary.title")}
				</h3>
				<p className="text-sm text-muted-foreground">
					{t("sections.itinerary.subtitle")}
				</p>
			</div>

			<div className="flex flex-col gap-6">
				{options.map((option) => (
					<PreviewOptionCard key={option.id} option={option} />
				))}
			</div>
		</div>
	);
};

export const PreviewOptionsCards = withErrorBoundary(PreviewOptionsCardsBase);

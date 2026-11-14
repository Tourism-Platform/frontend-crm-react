import { Routing2Icon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

import { PreviewOptionCard } from "./preview-option-card";

interface IPreviewOptionsCardsProps {
	options: IPreviewOptionCard[];
}

export const PreviewOptionsCardsBase: FC<IPreviewOptionsCardsProps> = ({
	options
}) => {
	const { t } = useTranslation("preview_tour_page");

	if (!options || options.length === 0) return null;

	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-start gap-3">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Routing2Icon className="size-5" />
				</span>
				<div className="flex min-w-0 flex-col gap-1">
					<h2 className="flex items-center gap-2.5 text-lg font-semibold">
						{t("sections.itinerary.title")}
						<span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground tabular-nums">
							{options.length}
						</span>
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("sections.itinerary.subtitle")}
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{options.map((option) => (
					<PreviewOptionCard key={option.id} option={option} />
				))}
			</div>
		</section>
	);
};

export const PreviewOptionsCards = withErrorBoundary(PreviewOptionsCardsBase);

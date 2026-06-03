import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { Badge } from "@/shared/ui/shadcn-ui/badge";

import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

interface IPreviewBookingOptionCardProps {
	option: IPreviewOptionCard;
	isSelected: boolean;
	onSelect: (optionId: string) => void;
	disabled?: boolean;
}

export const PreviewBookingOptionCardBase: FC<
	IPreviewBookingOptionCardProps
> = ({ option, isSelected, onSelect, disabled = false }) => {
	const { t } = useTranslation("preview_tour_page");

	return (
		<Card
			className={`transition-colors ${
				disabled
					? "cursor-default opacity-60"
					: `cursor-pointer ${isSelected ? "border-blue-200 bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"}`
			} ${disabled && isSelected ? "border-blue-200 bg-blue-50 ring-1 ring-blue-200" : ""}`}
			onClick={() => !disabled && onSelect(option.id)}
		>
			<CardContent>
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="flex-1 flex flex-col gap-4">
						<div className="gap-3 grid">
							<div className="flex items-start justify-between gap-3">
								<Badge>
									<CardTitle>{option.title}</CardTitle>
								</Badge>
								<div
									className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
										isSelected
											? "bg-primary border-primary"
											: "border-input"
									}`}
								>
									{isSelected && (
										<span className="w-2 h-2 rounded-full bg-white" />
									)}
								</div>
							</div>
							<CardDescription>
								{option.description}
							</CardDescription>
						</div>

						<div className="mt-auto">
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
								{t("sections.itinerary.card.from")}
							</p>
							<p className="text-xl font-bold">
								{option.price}{" "}
								<span className="text-base font-normal">
									{t("sections.itinerary.card.per_person")}
								</span>
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								{t("sections.itinerary.card.price_depends")}
							</p>
						</div>
					</div>

					<div className="w-full lg:w-[320px] shrink-0">
						<img
							src={option.image}
							alt={option.title}
							className="w-full h-[240px] object-cover rounded-xl"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const PreviewBookingOptionCard = withErrorBoundary(
	PreviewBookingOptionCardBase
);

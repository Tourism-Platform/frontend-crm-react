import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
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
			className={cn(
				"transition-colors",
				disabled && "cursor-default opacity-60",
				!disabled && "cursor-pointer",
				isSelected
					? "border-primary/30 bg-primary/5 ring-1 ring-primary/20"
					: !disabled && "hover:bg-muted/50"
			)}
			onClick={() => !disabled && onSelect(option.id)}
		>
			<CardContent>
				<div className="flex flex-col gap-6 lg:flex-row">
					<div className="flex flex-1 flex-col gap-4">
						<div className="grid gap-3">
							<div className="flex items-start justify-between gap-3">
								<Badge>
									<CardTitle>{option.title}</CardTitle>
								</Badge>
								<div
									className={cn(
										"mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border",
										isSelected
											? "border-primary bg-primary"
											: "border-input"
									)}
								>
									{isSelected && (
										<span className="size-2 rounded-full bg-primary-foreground" />
									)}
								</div>
							</div>
							<CardDescription>
								{option.description}
							</CardDescription>
						</div>

						<div className="mt-auto">
							<p className="mb-1 text-xs tracking-wider text-muted-foreground uppercase">
								{t("sections.itinerary.card.from")}
							</p>
							<p className="text-xl font-bold">
								{option.price}{" "}
								<span className="text-base font-normal">
									{t("sections.itinerary.card.per_person")}
								</span>
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								{t("sections.itinerary.card.price_depends")}
							</p>
						</div>
					</div>

					<div className="w-full shrink-0 lg:w-[320px]">
						<img
							src={option.image}
							alt={option.title}
							className="h-[240px] w-full rounded-xl object-cover"
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

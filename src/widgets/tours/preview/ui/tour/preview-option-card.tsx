import { GalleryIcon } from "@solar-icons/react/outline";
import { ArrowRight } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { useImageStatus } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	Previewer,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

import { buildPreviewOptionPath, useIsDraftPreview } from "../../model";

interface IPreviewOptionCardProps {
	option: IPreviewOptionCard;
}

export const PreviewOptionCardBase: FC<IPreviewOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation("preview_tour_page");
	const navigate = useNavigate();
	const { tourId = "" } = useParams<{ tourId: string }>();
	const isDraftPreview = useIsDraftPreview();
	const { isLoaded, isLoading, isError, onLoad, onError } = useImageStatus(
		option.image
	);

	const handleNavigate = () => {
		navigate(buildPreviewOptionPath(tourId, option.id, isDraftPreview));
	};

	return (
		<Card className="overflow-hidden py-0">
			<CardContent className="flex min-w-0 flex-col gap-0 p-0 md:flex-row md:items-stretch">
				<div className="relative min-h-36 w-full shrink-0 overflow-hidden bg-muted md:w-1/3">
					{!isLoaded && (
						<div className="absolute inset-0 z-0 flex items-center justify-center">
							{isLoading && (
								<Skeleton className="absolute inset-0 size-full" />
							)}
							<GalleryIcon
								className={cn(
									"size-20 text-muted-foreground/40",
									isLoading &&
										"animate-pulse text-muted-foreground/20"
								)}
							/>
						</div>
					)}
					{option.image && !isError && (
						<img
							src={option.image}
							alt={option.title}
							onLoad={onLoad}
							onError={onError}
							className={cn(
								"absolute inset-0 size-full object-cover transition-opacity duration-500",
								isLoaded ? "opacity-100" : "opacity-0"
							)}
						/>
					)}
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-3 px-4 py-4">
					<div className="flex min-w-0 flex-col gap-1.5">
						<span className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base">
							{option.title}
						</span>
						{!!option.description && (
							<Previewer
								text={option.description}
								className="text-sm leading-relaxed text-muted-foreground"
							/>
						)}
					</div>

					<div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t pt-3">
						<div>
							<p className="mb-1 text-xs tracking-wider text-muted-foreground uppercase">
								{t("sections.itinerary.card.from")}
							</p>
							<p className="text-xl font-bold">
								{option.price}{" "}
								<span className="text-base font-normal">
									{t("sections.itinerary.card.per_person")}
								</span>
							</p>
							{option.totalPrice ? (
								<p className="mt-1 text-sm text-muted-foreground">
									{t("sections.itinerary.card.group_total")}:{" "}
									<span className="font-medium text-foreground">
										{option.totalPrice}
									</span>
								</p>
							) : null}
							<p className="mt-1 text-xs text-muted-foreground">
								{t("sections.itinerary.card.price_depends")}
							</p>
						</div>

						<Button
							type="button"
							onClick={handleNavigate}
							className="shrink-0"
						>
							{t("sections.itinerary.card.book_package")}
							<ArrowRight className="size-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const PreviewOptionCard = withErrorBoundary(PreviewOptionCardBase);

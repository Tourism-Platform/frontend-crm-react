import { GalleryIcon, TicketIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { useImageStatus } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import {
	Card,
	LoaderButton,
	PreviewerSimple,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

// Прямые пути, не корень `model`: его `index` тянет конфиги вкладок, а те — `ui/tour` (цикл)
import { useIsDraftPreview, usePreviewCurrency } from "../../model/hooks";
import { buildPreviewOptionPath } from "../../model/lib/draft-preview";

interface IPreviewOptionCardProps {
	option: IPreviewOptionCard;
}

/**
 * Карточка варианта как витрина каталога (`CatalogTourCard`): внутренний отступ `p-1.5`,
 * обложка с концентричным радиусом; справа — название, описание до трёх строк и цена акцентом
 */
export const PreviewOptionCardBase: FC<IPreviewOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation("preview_tour_page");
	const navigate = useNavigate();
	const { tourId = "" } = useParams<{ tourId: string }>();
	const isDraftPreview = useIsDraftPreview();
	const { currency } = usePreviewCurrency();
	const { isLoaded, isLoading, isError, onLoad, onError } = useImageStatus(
		option.image
	);

	const handleNavigate = () => {
		navigate(
			buildPreviewOptionPath(tourId, option.id, isDraftPreview, {
				currency
			})
		);
	};

	return (
		<Card
			variant="glass"
			className="group/card gap-0 overflow-hidden p-1.5 md:flex-row"
		>
			<div className="relative aspect-video shrink-0 overflow-hidden rounded-md bg-muted md:aspect-auto md:min-h-48 md:w-64">
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						{isLoading && (
							<Skeleton className="absolute inset-0 size-full" />
						)}
						<GalleryIcon
							className={cn(
								"size-14 text-muted-foreground/40",
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
							"absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 group-hover/card:scale-105 motion-reduce:transition-none",
							isLoaded ? "opacity-100" : "opacity-0"
						)}
					/>
				)}
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-4 p-3 md:p-4">
				<div className="flex min-w-0 flex-col gap-1.5">
					<h3 className="line-clamp-2 text-base leading-snug font-semibold">
						{option.title}
					</h3>
					<PreviewerSimple
						text={option.description}
						lines={3}
						className="text-sm leading-relaxed text-muted-foreground"
					/>
				</div>

				<div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border/60 pt-3">
					{/* Без цены (черновой вариант без расчёта) — только кнопка, как в шапке */}
					{option.price ? (
						<div className="flex flex-col gap-0.5">
							<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
								{t("sections.itinerary.card.from")}
							</span>
							<span className="text-xl font-bold text-primary tabular-nums">
								{option.price}{" "}
								<span className="text-sm font-normal text-muted-foreground">
									{t("sections.itinerary.card.per_person")}
								</span>
							</span>
							{option.totalPrice ? (
								<span className="text-sm text-muted-foreground">
									{t("sections.itinerary.card.group_total")}:{" "}
									<span className="font-medium text-foreground tabular-nums">
										{option.totalPrice}
									</span>
								</span>
							) : null}
							<span className="text-xs text-muted-foreground">
								{t("sections.itinerary.card.price_depends")}
							</span>
						</div>
					) : null}

					<LoaderButton
						type="button"
						onClick={handleNavigate}
						className="ml-auto"
						icon={<TicketIcon />}
						label={t("sections.itinerary.card.book_package")}
					/>
				</div>
			</div>
		</Card>
	);
};

export const PreviewOptionCard = withErrorBoundary(PreviewOptionCardBase);

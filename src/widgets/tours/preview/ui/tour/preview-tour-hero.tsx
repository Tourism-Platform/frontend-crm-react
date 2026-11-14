import { LayersIcon, TicketIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router";

import { ENUM_PATH } from "@/shared/config";
import {
	Card,
	LoaderButton,
	PreviewerSimple,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import {
	TOUR_CATEGORY_LABELS,
	TOUR_TYPE_ICONS,
	TOUR_TYPE_LABELS,
	TourCardChips
} from "@/entities/tour";
import type { IPreviewTourGeneral } from "@/entities/tour/preview-tour";

// Прямые пути, не корень `model`: его `index` тянет конфиги вкладок, а те — `ui/tour` (цикл)
import { HERO_INFO } from "../../model/config/hero.config";
import { useIsDraftPreview } from "../../model/hooks";

import { PreviewCurrencySelect } from "./preview-currency-select";

/** Сколько категорий видно свёрнутыми; остальные — «+N», как в каталоге */
const VISIBLE_CATEGORIES = 4;

/** Сколько флагов языков видно свёрнутыми */
const VISIBLE_LANGUAGES = 6;

interface IPreviewTourHeroProps {
	tour?: IPreviewTourGeneral;
	/** «Краткий обзор» лендинга — подзаголовок под названием */
	overview?: string;
	/** Название варианта — над названием тура в превью варианта */
	optionTitle?: string;
	/** Цена за человека — в панели бронирования; пусто — без цены */
	price?: string;
	/** Цена ещё грузится — на её месте скелетон высотой строки цены */
	isPriceLoading?: boolean;
}

/**
 * Шапка тура: слева название с флагами языков справа, краткий обзор, категории,
 * факты (тип тура, длительность, группа, возраст);
 * справа — панель бронирования на акцентной подложке: валюта, цена «от», кнопка «Забронировать»
 */
const PreviewTourHeroBase: FC<IPreviewTourHeroProps> = ({
	tour,
	overview,
	optionTitle,
	price,
	isPriceLoading
}) => {
	const { t } = useTranslation(["preview_tour_page", "options"]);
	const navigate = useNavigate();
	const { tourId = "" } = useParams<{ tourId: string }>();
	const isDraftPreview = useIsDraftPreview();

	if (!tour) return null;

	const heroData = HERO_INFO(tour, t);
	const TypeIcon = TOUR_TYPE_ICONS[tour.tourType];
	const typeLabel = t(TOUR_TYPE_LABELS[tour.tourType], { ns: "options" });
	const categoryLabels = tour.tourCategories.map((category) =>
		t(TOUR_CATEGORY_LABELS[category], { ns: "options" })
	);

	const handleBooking = () => {
		if (isDraftPreview) return;

		navigate(
			generatePath(ENUM_PATH.TOURS.CATALOG.BOOKING, {
				tourId,
				bookingId: null
			})
		);
	};

	return (
		<Card
			variant="glass"
			className="gap-0 overflow-hidden py-0 md:flex-row"
		>
			<div className="flex min-w-0 flex-1 flex-col gap-4 p-6">
				{/* Название и флаги языков справа на уровне его первой строки */}
				<div className="flex items-start justify-between gap-4">
					<div className="flex min-w-0 flex-col gap-2">
						{optionTitle ? (
							<span className="flex items-center gap-1.5 text-sm font-medium text-primary">
								<LayersIcon className="size-4 shrink-0" />
								{optionTitle}
							</span>
						) : null}
						<h1 className="text-3xl leading-tight font-semibold tracking-tight break-words md:text-4xl">
							{tour.tourTitle || "—"}
						</h1>
					</div>
					<TourCardChips
						mode="flags"
						appearance="table"
						items={tour.languages}
						visible={VISIBLE_LANGUAGES}
						className="mt-2 shrink-0"
					/>
				</div>

				<PreviewerSimple
					text={overview}
					lines={3}
					className="text-base leading-relaxed text-muted-foreground"
				/>

				<TourCardChips
					mode="chips"
					appearance="table"
					items={categoryLabels}
					visible={VISIBLE_CATEGORIES}
				/>

				{/* Факты сеткой 2 × 2, как метрики карточки каталога: тип, длительность, группа, возраст */}
				<div className="mt-auto grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border/60 pt-4 text-sm font-medium">
					<span
						title={typeLabel}
						className="flex min-w-0 items-center gap-2"
					>
						<TypeIcon className="size-4.5 shrink-0 text-primary" />
						<span className="truncate">{typeLabel}</span>
					</span>
					{heroData.map((item) => (
						<span
							key={item.label}
							title={item.label}
							className="flex min-w-0 items-center gap-2"
						>
							<item.icon className="size-4.5 shrink-0 text-primary" />
							<span className="truncate">{item.label}</span>
						</span>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-4 border-t border-border/60 bg-primary/5 p-6 md:w-64 md:shrink-0 md:border-t-0 md:border-l">
				<PreviewCurrencySelect />
				{price || isPriceLoading ? (
					<div className="flex flex-col gap-1">
						<span className="text-sm text-muted-foreground">
							{t("sections.itinerary.card.from")}
						</span>
						{/* text-3xl leading-none — строка 30 px, скелетон той же высоты */}
						{isPriceLoading ? (
							<Skeleton className="h-7.5 w-32" />
						) : (
							<span className="text-3xl leading-none font-bold break-words text-primary tabular-nums">
								{price}
							</span>
						)}
						<span className="text-sm text-muted-foreground">
							{t("sections.itinerary.card.per_person")}
						</span>
						<span className="mt-1 text-xs text-muted-foreground">
							{t("sections.itinerary.card.price_depends")}
						</span>
					</div>
				) : null}
				<LoaderButton
					type="button"
					size="lg"
					className="mt-auto w-full"
					onClick={handleBooking}
					disabled={isDraftPreview}
					icon={<TicketIcon />}
					label={t("book_now")}
				/>
			</div>
		</Card>
	);
};

export const PreviewTourHero = withErrorBoundary(PreviewTourHeroBase);

import { AltArrowLeftIcon } from "@solar-icons/react/outline";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config";
import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	DataState,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import { usePreviewTourPageData } from "@/entities/tour/preview-tour";

import {
	ENUM_PREVIEW_TOUR_TAB,
	PREVIEW_TOUR_SINGLE_OPTION_TABS,
	getCheapestOptionPrice,
	useIsDraftPreview,
	usePreviewCurrency
} from "../model";

import {
	PreviewOptionsCards,
	PreviewTourHero,
	PreviewTourInformationSections,
	PreviewTourPhotos,
	PreviewTourProviderCard
} from "./tour";

const PreviewTourBase: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const isDraftPreview = useIsDraftPreview();
	const { currency } = usePreviewCurrency();
	const { t, ready } = useTranslation([
		"preview_tour_page",
		"preview_option_page"
	]);

	const {
		tour: tourData,
		landing: previewData,
		options: optionsData,
		singleOption,
		optionDetail,
		isLoading: isPageLoading,
		isError,
		isOptionDetailError
	} = usePreviewTourPageData({
		tourId,
		isDraft: isDraftPreview,
		currency
	});

	const isLoading = !ready || isPageLoading;
	const showOptionsCards = optionsData.length > 1;

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	useEffect(() => {
		if (singleOption && isOptionDetailError) {
			toast.error(t("toasts.option.error"));
		}
	}, [singleOption, isOptionDetailError, t]);

	return (
		<section className="flex flex-1 flex-col gap-6 w-full max-w-6xl mx-auto relative">
			<DataState
				variant="page"
				data={tourData}
				isLoading={isLoading}
				isEmpty={() => false}
			>
				{() => (
					<>
						{isDraftPreview ? (
							<Button
								variant="glass"
								size="sm"
								className="self-start"
								disabled
							>
								<AltArrowLeftIcon />
								{t("back", { ns: "preview_tour_page" })}
							</Button>
						) : (
							<Button
								variant="glass"
								size="sm"
								className="self-start"
								asChild
							>
								<Link to={ENUM_PATH.TOURS.CATALOG.ROOT}>
									<AltArrowLeftIcon />
									{t("back", { ns: "preview_tour_page" })}
								</Link>
							</Button>
						)}

						{/* Сверху вниз: шапка тура (с валютой и ценой) и организатор 2 к 1, галерея, вкладки или разделы */}
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
							<PreviewTourHero
								tour={tourData}
								overview={previewData?.overview}
								price={getCheapestOptionPrice(optionsData)}
							/>
							<PreviewTourProviderCard />
						</div>
						<PreviewTourPhotos data={previewData} />

						{singleOption ? (
							<CustomOptionTabs
								defaultValue={
									ENUM_PREVIEW_TOUR_TAB.TOUR_INFORMATION
								}
							>
								<CustomOptionTabsList className="grid w-fit mb-4 grid-cols-3">
									{PREVIEW_TOUR_SINGLE_OPTION_TABS.map(
										(item) => (
											<CustomOptionTabsTrigger
												key={item.type}
												value={item.type}
												variant="tongue"
											>
												{t(item.label)}
											</CustomOptionTabsTrigger>
										)
									)}
								</CustomOptionTabsList>
								<Separator className="mb-6" />
								{PREVIEW_TOUR_SINGLE_OPTION_TABS.map((item) => (
									<CustomOptionTabsContent
										key={item.type}
										value={item.type}
									>
										{item.type ===
										ENUM_PREVIEW_TOUR_TAB.TOUR_INFORMATION ? (
											<item.slot data={previewData} />
										) : (
											<item.slot
												optionData={optionDetail}
											/>
										)}
									</CustomOptionTabsContent>
								))}
							</CustomOptionTabs>
						) : (
							<>
								<PreviewTourInformationSections
									data={previewData}
								/>
								{showOptionsCards && (
									<PreviewOptionsCards
										options={optionsData}
									/>
								)}
							</>
						)}
					</>
				)}
			</DataState>
		</section>
	);
};

export const PreviewTour = withErrorBoundary(PreviewTourBase);

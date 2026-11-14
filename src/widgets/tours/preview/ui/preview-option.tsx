import { AltArrowLeftIcon } from "@solar-icons/react/outline";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import {
	Button,
	CustomQueryTabs,
	DataState,
	withErrorBoundary
} from "@/shared/ui";

import { usePreviewOptionPageData } from "@/entities/tour/preview-tour";

import {
	PREVIEW_OPTION_TABS_LIST,
	buildPreviewTourPath,
	useIsDraftPreview,
	usePreviewCurrency
} from "../model";

import {
	PreviewTourHero,
	PreviewTourPhotos,
	PreviewTourProviderCard
} from "./tour";

export const PreviewOptionBase: FC = () => {
	const { tourId = "", optionId = "" } = useParams<{
		tourId: string;
		optionId: string;
	}>();
	const isDraftPreview = useIsDraftPreview();
	const { currency } = usePreviewCurrency();
	const { t, ready } = useTranslation("preview_option_page");

	const {
		tour: tourData,
		landing,
		optionDetail,
		isOptionPriceLoading,
		isLoading: isPageLoading,
		isError
	} = usePreviewOptionPageData({
		tourId,
		optionId,
		isDraft: isDraftPreview,
		currency
	});

	const isLoading = !ready || isPageLoading;

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<section className="flex flex-1 flex-col gap-6 w-full max-w-6xl mx-auto relative">
			<DataState
				variant="page"
				data={tourData}
				isLoading={isLoading}
				isEmpty={() => false}
			>
				{(tourData) => (
					<>
						<Button
							variant="glass"
							size="sm"
							className="self-start"
							asChild
						>
							<Link
								to={buildPreviewTourPath(
									tourId,
									isDraftPreview,
									{
										currency
									}
								)}
							>
								<AltArrowLeftIcon />
								{t("back")}
							</Link>
						</Button>

						{/* Как у превью тура: шапка тура (с валютой и ценой варианта) и организатор 2 к 1, галерея, вкладки */}
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
							<PreviewTourHero
								tour={tourData}
								overview={landing?.overview}
								optionTitle={optionDetail?.title}
								price={optionDetail?.pricePerPerson}
								isPriceLoading={isOptionPriceLoading}
							/>
							<PreviewTourProviderCard />
						</div>
						<PreviewTourPhotos data={landing} />
						<CustomQueryTabs
							ns="preview_option_page"
							tabs={PREVIEW_OPTION_TABS_LIST}
						/>
					</>
				)}
			</DataState>
		</section>
	);
};

export const PreviewOption = withErrorBoundary(PreviewOptionBase);

import { ArrowLeft, Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { Separator, withErrorBoundary } from "@/shared/ui";

import {
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourOptionsQuery,
	useGetPreviewTourQuery
} from "@/entities/tour/preview-tour";

import {
	PreviewOptionsCards,
	PreviewTourAdditionalInfo,
	PreviewTourAmenities,
	PreviewTourCancellation,
	PreviewTourHero,
	PreviewTourMeta,
	PreviewTourOverview,
	PreviewTourPhotos,
	PreviewTourPickup,
	PreviewTourProviderCard
} from "./tour";

const PreviewTourBase: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const { t } = useTranslation("preview_tour_page");

	const {
		data: previewData,
		isLoading: isPreviewLoading,
		isError: isPreviewError
	} = useGetPreviewTourQuery(tourId, {
		skip: !tourId
	});

	const {
		data: tourData,
		isLoading: isTourLoading,
		isError: isTourError
	} = useGetPreviewTourGeneralQuery(tourId, {
		skip: !tourId
	});

	const {
		data: optionsData,
		isLoading: isOptionsLoading,
		isError: isOptionsError
	} = useGetPreviewTourOptionsQuery(tourId, {
		skip: !tourId
	});

	const isLoading = isPreviewLoading || isTourLoading || isOptionsLoading;

	useEffect(() => {
		if (isPreviewError || isTourError || isOptionsError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isPreviewError, isTourError, isOptionsError, t]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	// if (!previewData || !tourData) {
	// 	return (
	// 		<div className="flex justify-center items-center py-20">
	// 			<p className="text-muted-foreground">{t("not_found")}</p>
	// 		</div>
	// 	);
	// }

	return (
		<section className="flex flex-col gap-8 container pb-12 max-w-6xl mx-auto">
			<Link
				to=".."
				className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
			>
				<ArrowLeft className="w-4 h-4" />
				{t("back_to_catalogue")}
			</Link>

			<div className="grid grid-cols-[1fr_auto] gap-8 items-start">
				<PreviewTourHero tour={tourData} />
				<PreviewTourProviderCard />
			</div>

			<div className="flex flex-col gap-8">
				<PreviewTourPhotos data={previewData} />
				<Separator />
				<PreviewTourOverview data={previewData} />
				<Separator />
				<PreviewTourMeta data={previewData} />
				<Separator />
				<PreviewTourAmenities data={previewData} />
				<Separator />
				<PreviewTourPickup data={previewData} />
				<Separator />
				<PreviewTourCancellation data={previewData} />
				<Separator />
				<PreviewTourAdditionalInfo data={previewData} />
				<Separator />
				<PreviewOptionsCards options={optionsData ?? []} />
			</div>
		</section>
	);
};

export const PreviewTour = withErrorBoundary(PreviewTourBase);

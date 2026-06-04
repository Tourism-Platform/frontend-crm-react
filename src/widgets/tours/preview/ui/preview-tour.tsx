import { ArrowLeft, Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourOptionsQuery,
	useGetPreviewTourQuery,
	usePreviewOptionDetail
} from "@/entities/tour/preview-tour";

import {
	ENUM_PREVIEW_TOUR_TAB,
	PREVIEW_TOUR_SINGLE_OPTION_TABS
} from "../model";

import {
	PreviewOptionsCards,
	PreviewTourHero,
	PreviewTourInformationSections,
	PreviewTourProviderCard
} from "./tour";

const PreviewTourBase: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const { t, ready } = useTranslation([
		"preview_tour_page",
		"preview_option_page"
	]);

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

	const singleOption = optionsData?.length === 1 ? optionsData[0] : undefined;

	const {
		data: optionDetail,
		isLoading: isOptionDetailLoading,
		isError: isOptionDetailError
	} = usePreviewOptionDetail({
		tourId,
		optionId: singleOption?.id ?? "",
		skip: !singleOption
	});

	const isLoading =
		!ready ||
		isPreviewLoading ||
		isTourLoading ||
		isOptionsLoading ||
		(Boolean(singleOption) && isOptionDetailLoading);

	const showOptionsCards = (optionsData?.length ?? 0) > 1;

	useEffect(() => {
		if (isPreviewError || isTourError || isOptionsError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isPreviewError, isTourError, isOptionsError, t]);

	useEffect(() => {
		if (singleOption && isOptionDetailError) {
			toast.error(t("toasts.option.error"));
		}
	}, [singleOption, isOptionDetailError, t]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-8 container pb-12 max-w-6xl mx-auto relative">
			<Link
				to={ENUM_PATH.TOURS.CATALOG.ROOT}
				className="absolute top-0 left-0"
			>
				<Button variant="ghost" size="sm">
					<ArrowLeft className="w-4 h-4" />
					{t("back", { ns: "preview_tour_page" })}
				</Button>
			</Link>

			<div className="grid grid-cols-[1fr_auto] gap-8 items-start">
				<PreviewTourHero tour={tourData} />
				<PreviewTourProviderCard />
			</div>

			<div className="flex flex-col gap-8">
				{singleOption ? (
					<CustomOptionTabs
						defaultValue={ENUM_PREVIEW_TOUR_TAB.TOUR_INFORMATION}
					>
						<CustomOptionTabsList
							className={cn("grid w-fit mb-4 grid-cols-3")}
						>
							{PREVIEW_TOUR_SINGLE_OPTION_TABS.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant="tongue"
								>
									{t(item.label)}
								</CustomOptionTabsTrigger>
							))}
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
									<item.slot optionData={optionDetail} />
								)}
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>
				) : (
					<>
						<PreviewTourInformationSections data={previewData} />
						{showOptionsCards && (
							<>
								<Separator />
								<PreviewOptionsCards
									options={optionsData ?? []}
								/>
							</>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export const PreviewTour = withErrorBoundary(PreviewTourBase);

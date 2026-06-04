import { ArrowLeft, Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
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
	usePreviewOptionDetail
} from "@/entities/tour/preview-tour";

import { PREVIEW_OPTION_TABS_LIST } from "../model";

import { PreviewTourHero, PreviewTourProviderCard } from "./tour";

export const PreviewOptionBase: FC = () => {
	const { tourId = "", optionId = "" } = useParams<{
		tourId: string;
		optionId: string;
	}>();
	const { t, ready } = useTranslation("preview_option_page");

	const {
		data: tourData,
		isLoading: isTourLoading,
		isError: isTourError
	} = useGetPreviewTourGeneralQuery(tourId, {
		skip: !tourId
	});

	const {
		data: optionDetail,
		isLoading: isOptionLoading,
		isError: isOptionError
	} = usePreviewOptionDetail({ tourId, optionId });

	const isLoading = !ready || isTourLoading || isOptionLoading;

	useEffect(() => {
		if (isTourError || isOptionError) {
			toast.error("Failed to load tour data");
		}
	}, [isTourError, isOptionError]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	const defaultTab = PREVIEW_OPTION_TABS_LIST[0]?.type ?? "";

	return (
		<section className="flex flex-col gap-8 container pb-12 mt-6 max-w-6xl mx-auto relative">
			<Link
				to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
					tourId
				})}
				className="absolute top-0 left-0"
			>
				<Button variant="ghost" size="sm">
					<ArrowLeft className="w-4 h-4" />
					{t("back")}
				</Button>
			</Link>

			<div className="grid grid-cols-[1fr_auto] gap-8 items-start mb-8">
				{tourData && <PreviewTourHero tour={tourData} />}
				<PreviewTourProviderCard />
			</div>

			<div className="flex flex-col mt-4">
				<CustomOptionTabs defaultValue={defaultTab}>
					<CustomOptionTabsList
						className={cn("grid w-fit mb-4 grid-cols-2")}
					>
						{PREVIEW_OPTION_TABS_LIST.map((item) => (
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
					{PREVIEW_OPTION_TABS_LIST.map((item) => (
						<CustomOptionTabsContent
							key={item.type}
							value={item.type}
						>
							<item.slot optionData={optionDetail} />
						</CustomOptionTabsContent>
					))}
				</CustomOptionTabs>
			</div>
		</section>
	);
};

export const PreviewOption = withErrorBoundary(PreviewOptionBase);

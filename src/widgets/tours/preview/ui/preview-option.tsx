import { ArrowLeft, Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import { useGetPreviewTourGeneralQuery } from "@/entities/tour/preview-tour";
import { PREVIEW_OPTION_DETAIL_MOCK } from "@/entities/tour/preview-tour/mock";

import { PREVIEW_OPTION_TABS_LIST } from "../model/config/preview-option-tabs.config";

import { PreviewTourHero, PreviewTourProviderCard } from "./tour";

export const PreviewOptionBase: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const { t } = useTranslation("preview_option_page");

	const {
		data: tourData,
		isLoading: isTourLoading,
		isError: isTourError
	} = useGetPreviewTourGeneralQuery(tourId, {
		skip: !tourId
	});

	// В будущем здесь будет реальный запрос по optionId
	const optionData = PREVIEW_OPTION_DETAIL_MOCK;
	const isLoading = isTourLoading;

	useEffect(() => {
		if (isTourError) {
			toast.error("Failed to load tour data"); // В будущем добавить ключ
		}
	}, [isTourError]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<Loader className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-8 container pb-12 mt-6">
			<Link
				to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
					tourId
				})}
				className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
			>
				<ArrowLeft className="w-4 h-4" />
				{t("back_to_catalogue")}
			</Link>

			<div className="grid grid-cols-[1fr_auto] gap-8 items-start mb-8">
				{tourData && <PreviewTourHero tour={tourData} />}
				<PreviewTourProviderCard />
			</div>

			<div className="flex flex-col mt-4">
				<CustomOptionTabs
					defaultValue={PREVIEW_OPTION_TABS_LIST[0]?.type}
				>
					<CustomOptionTabsList className="grid-cols-3 w-fit mb-4">
						{PREVIEW_OPTION_TABS_LIST.map((item) => (
							<CustomOptionTabsTrigger
								key={item.type}
								value={item.type}
								variant="tongue"
							>
								{t(item.label as any)}
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
					<Separator className="mb-6" />
					{PREVIEW_OPTION_TABS_LIST.map((item) => (
						<CustomOptionTabsContent
							key={item.type}
							value={item.type}
						>
							<item.slot optionData={optionData} />
						</CustomOptionTabsContent>
					))}
				</CustomOptionTabs>
			</div>
		</section>
	);
};

export const PreviewOption = withErrorBoundary(PreviewOptionBase);

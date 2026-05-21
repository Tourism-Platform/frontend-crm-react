import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config";
import {
	Button,
	Card,
	CardContent,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import { useGetPreviewOperatorQuery } from "@/entities/tour";

import { PROVIDER_CONTACTS } from "../../model";

const PreviewTourProviderCardBase: FC = () => {
	const { t } = useTranslation("preview_tour_page");
	const navigate = useNavigate();
	const { tourId = "" } = useParams<{ tourId: string }>();
	const {
		data,
		isError: isPreviewError,
		isLoading: isLoadingTourPreview
	} = useGetPreviewOperatorQuery(tourId);

	const providerData = PROVIDER_CONTACTS(data!);

	const handleBooking = () => {
		const path = generatePath(ENUM_PATH.TOURS.CATALOG.BOOKING, { tourId });
		navigate(path);
	};

	useEffect(() => {
		if (isPreviewError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isPreviewError, t]);

	return (
		<Card className="w-[400px] shrink-0 relative overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-30 bg-blue-100" />
			<CardContent className="flex flex-col gap-4 pt-10">
				<div>
					<img
						src={data?.logo}
						alt={data?.business_name}
						className="h-26 w-26 rounded-full z-10 border-4 border-background relative z-10"
					/>
				</div>
				<p className="text-xs text-muted-foreground">
					{t("provider.title")}
				</p>
				<p className="font-semibold">
					{isLoadingTourPreview ? (
						<Skeleton className="h-6 w-1/2" />
					) : (
						data?.business_name
					)}
				</p>

				<div className="flex flex-col gap-2 text-sm text-muted-foreground">
					{providerData.map((item, index) => (
						<span key={index} className="flex items-center gap-2">
							<item.icon className="w-4 h-4" />
							{isLoadingTourPreview ? (
								<Skeleton className="h-5 w-1/2" />
							) : (
								item.value
							)}
						</span>
					))}
				</div>

				<Button onClick={handleBooking}>{t("book_now")} </Button>
			</CardContent>
		</Card>
	);
};

export const PreviewTourProviderCard = withErrorBoundary(
	PreviewTourProviderCardBase
);

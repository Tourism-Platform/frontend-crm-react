import { UserIcon } from "@solar-icons/react/outline";
import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";

import { useImageStatus } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import {
	Card,
	PreviewerSimple,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import { usePreviewOperatorData } from "@/entities/tour";

// Прямые пути, не корень `model`: его `index` тянет конфиги вкладок, а те — `ui/tour` (цикл)
import { PROVIDER_CONTACTS } from "../../model/config/provider.config";
import { useIsDraftPreview } from "../../model/hooks";

/**
 * Организатор — колонка 1/3 рядом с шапкой тура: логотип, название, описание,
 * контакты внизу. Бронирование — в панели цены шапки
 */
const PreviewTourProviderCardBase: FC = () => {
	const { t } = useTranslation("preview_tour_page");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const isDraftPreview = useIsDraftPreview();
	const {
		operator: data,
		isError: isPreviewError,
		isLoading: isLoadingTourPreview
	} = usePreviewOperatorData({ tourId, isDraft: isDraftPreview });

	const providerData = PROVIDER_CONTACTS(data);
	const { isLoaded, isLoading, isError, onLoad, onError } = useImageStatus(
		data?.logo
	);

	useEffect(() => {
		if (isPreviewError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isPreviewError, t]);

	return (
		<Card variant="glass" className="gap-4 px-6">
			<div className="flex min-w-0 items-center gap-3.5">
				<div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
					{!isLoaded && (
						<div className="absolute inset-0 flex items-center justify-center">
							{isLoading && (
								<Skeleton className="absolute inset-0 size-full" />
							)}
							<UserIcon
								className={cn(
									"size-6 text-muted-foreground/40",
									isLoading &&
										"animate-pulse text-muted-foreground/20"
								)}
							/>
						</div>
					)}
					{data?.logo && !isError && (
						<img
							src={data.logo}
							alt={data.business_name}
							onLoad={onLoad}
							onError={onError}
							className={cn(
								"absolute inset-0 size-full object-cover transition-opacity duration-500",
								isLoaded ? "opacity-100" : "opacity-0"
							)}
						/>
					)}
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
						{t("provider.title")}
					</span>
					{isLoadingTourPreview ? (
						<Skeleton className="h-5 w-2/3" />
					) : (
						<span className="truncate font-semibold">
							{data?.business_name}
						</span>
					)}
				</div>
			</div>

			<PreviewerSimple
				text={data?.description}
				lines={4}
				className="text-sm leading-relaxed text-muted-foreground"
			/>

			<ul className="mt-auto flex flex-col gap-2.5 border-t border-border/60 pt-4 text-sm">
				{providerData.map((item, index) => (
					<li
						key={index}
						className="flex min-w-0 items-center gap-2.5"
					>
						<item.icon className="size-4 shrink-0 text-muted-foreground" />
						{isLoadingTourPreview ? (
							<Skeleton className="h-5 w-1/2" />
						) : (
							<span className="truncate" title={item.value}>
								{item.value}
							</span>
						)}
					</li>
				))}
			</ul>
		</Card>
	);
};

export const PreviewTourProviderCard = withErrorBoundary(
	PreviewTourProviderCardBase
);

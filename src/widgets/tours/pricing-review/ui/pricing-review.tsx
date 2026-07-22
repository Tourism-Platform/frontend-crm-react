import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	EmptyState,
	ErrorState,
	PageLoader,
	withErrorBoundary
} from "@/shared/ui";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { usePricingReview } from "../model";

import {
	PricingReviewSummary,
	PricingReviewTable,
	PricingReviewTabs
} from "./index";

const PricingReviewBase: FC = () => {
	const { t } = useTranslation("tour_pricing_review_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		options,
		activeOptionId,
		setActiveOptionId,
		pricingReview,
		isOptionsLoading,
		isOptionsNotFound,
		isOptionsRealError,
		isSummaryLoading,
		isSummaryFetching,
		isSummaryNotFound,
		isSummaryRealError,
		hasOptions
	} = usePricingReview(tourId);

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	if (
		isOptionsLoading ||
		isSummaryLoading ||
		(isSummaryFetching && !pricingReview)
	) {
		return (
			<section className="flex flex-col gap-6 container">
				<ConnectedTourHeader
					title={t("page_name")}
					actions={actionsJsx}
				/>
				<PageLoader />
			</section>
		);
	}

	if (isOptionsRealError || isSummaryRealError) {
		return (
			<section className="flex flex-col gap-6 container">
				<ConnectedTourHeader
					title={t("page_name")}
					actions={actionsJsx}
				/>
				<ErrorState />
			</section>
		);
	}

	if (
		isOptionsNotFound ||
		!hasOptions ||
		isSummaryNotFound ||
		!pricingReview
	) {
		return (
			<section className="flex flex-col gap-6 container">
				<ConnectedTourHeader
					title={t("page_name")}
					actions={actionsJsx}
				/>
				<EmptyState />
			</section>
		);
	}

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			<PricingReviewTabs
				options={options}
				activeId={activeOptionId}
				onChange={setActiveOptionId}
			/>

			<PricingReviewSummary summary={pricingReview.summary} />
			<PricingReviewTable items={pricingReview.items} />
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

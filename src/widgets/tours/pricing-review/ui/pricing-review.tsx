import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { withErrorBoundary } from "@/shared/ui";

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
		isOptionsError,
		isSummaryLoading,
		isSummaryError,
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

	if (isOptionsLoading) {
		return <div className="container py-6">Loading...</div>;
	}

	if (isOptionsError) {
		return (
			<div className="container py-6 text-destructive">
				{t("errors.load_options", {
					defaultValue: "Failed to load options"
				})}
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			{hasOptions ? (
				<PricingReviewTabs
					options={options}
					activeId={activeOptionId}
					onChange={setActiveOptionId}
				/>
			) : (
				<p className="text-muted-foreground">
					{t("empty.no_options", {
						defaultValue: "No tour options yet"
					})}
				</p>
			)}

			{hasOptions && isSummaryLoading && !pricingReview && (
				<div>Loading...</div>
			)}

			{hasOptions && isSummaryError && (
				<div className="text-destructive">
					{t("errors.load_summary", {
						defaultValue: "Failed to load pricing summary"
					})}
				</div>
			)}

			{pricingReview && (
				<>
					<PricingReviewSummary summary={pricingReview.summary} />
					<PricingReviewTable items={pricingReview.items} />
				</>
			)}
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

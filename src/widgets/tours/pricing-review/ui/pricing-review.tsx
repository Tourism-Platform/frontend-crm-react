import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { CustomQueryTabs, DataState, withErrorBoundary } from "@/shared/ui";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { PRICING_REVIEW_TABLE_TABS, usePricingReview } from "../model";

import { PricingReviewParams } from "./pricing-review-params";
import { PricingReviewSummary } from "./pricing-review-summary";
import { PricingReviewTabs } from "./pricing-review-tabs";

const PricingReviewBase: FC = () => {
	const { t } = useTranslation("tour_pricing_review_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		options,
		activeOptionId,
		setActiveOptionId,
		paramsForm,
		handleResetParams,
		pricingReview,
		isOptionsLoading,
		isOptionsNotFound,
		isOptionsRealError,
		isSummaryLoading,
		isSummaryFetching,
		isSummaryNotFound,
		isSummaryRealError,
		isSummaryNoFxRate,
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

	return (
		<section className="flex flex-1 flex-col gap-5">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			<DataState
				variant="page"
				data={pricingReview}
				isLoading={
					isOptionsLoading ||
					isSummaryLoading ||
					(isSummaryFetching && !pricingReview)
				}
				isError={isOptionsRealError || isSummaryRealError}
				isEmpty={() =>
					isOptionsNotFound || !hasOptions || isSummaryNotFound
				}
				error={
					isSummaryNoFxRate
						? {
								title: t("errors.no_fx_rate.title"),
								description: t("errors.no_fx_rate.description")
							}
						: undefined
				}
			>
				{(pricingReview) => (
					<>
						<PricingReviewTabs
							options={options}
							activeId={activeOptionId}
							onChange={setActiveOptionId}
						/>

						<PricingReviewParams
							form={paramsForm}
							onReset={handleResetParams}
						/>

						<PricingReviewSummary summary={pricingReview.summary} />
						<CustomQueryTabs
							ns="tour_pricing_review_page"
							tabs={PRICING_REVIEW_TABLE_TABS}
							slotContext={{
								tourId,
								optionId: activeOptionId,
								items: pricingReview.items
							}}
						/>
					</>
				)}
			</DataState>
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

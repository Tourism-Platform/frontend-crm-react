import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	Button,
	CustomField,
	CustomQueryTabs,
	EmptyState,
	ErrorState,
	Form,
	PageLoader,
	withErrorBoundary
} from "@/shared/ui";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import {
	PRICING_PARAMS_LIST,
	PRICING_REVIEW_TABLE_TABS,
	usePricingReview
} from "../model";

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

			<Form {...paramsForm}>
				<div className="flex flex-wrap items-end gap-4">
					{PRICING_PARAMS_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={paramsForm.control}
							name={key}
							t={t}
							className="w-60"
							{...item}
						/>
					))}
					<Button
						type="button"
						variant="outline"
						className="mb-5"
						onClick={handleResetParams}
					>
						{t("params.reset")}
					</Button>
				</div>
			</Form>

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
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

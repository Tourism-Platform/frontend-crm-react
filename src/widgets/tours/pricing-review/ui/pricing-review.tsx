import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
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
	PricingReviewPackagesTable,
	PricingReviewSummary,
	PricingReviewTable,
	PricingReviewTabs
} from "./index";

const TABLE_TAB = {
	EVENTS: "events",
	PACKAGES: "packages"
} as const;

const PricingReviewBase: FC = () => {
	const { t } = useTranslation("tour_pricing_review_page");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [tableTab, setTableTab] = useState<string>(TABLE_TAB.EVENTS);

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
			<CustomOptionTabs
				value={tableTab}
				onValueChange={setTableTab}
				className="flex flex-col gap-6"
			>
				<CustomOptionTabsList className="grid grid-cols-2 w-70">
					<CustomOptionTabsTrigger
						value={TABLE_TAB.EVENTS}
						variant="tongue"
					>
						{t("tabs.events")}
					</CustomOptionTabsTrigger>
					<CustomOptionTabsTrigger
						value={TABLE_TAB.PACKAGES}
						variant="tongue"
					>
						{t("tabs.packages")}
					</CustomOptionTabsTrigger>
				</CustomOptionTabsList>
				<CustomOptionTabsContent value={TABLE_TAB.EVENTS}>
					<PricingReviewTable
						items={pricingReview.items}
						tourId={tourId}
						optionId={activeOptionId}
					/>
				</CustomOptionTabsContent>
				<CustomOptionTabsContent value={TABLE_TAB.PACKAGES}>
					<PricingReviewPackagesTable
						tourId={tourId}
						optionId={activeOptionId}
					/>
				</CustomOptionTabsContent>
			</CustomOptionTabs>
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

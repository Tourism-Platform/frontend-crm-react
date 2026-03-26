import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { MOCK_PRICING_DATA } from "@/shared/config";
import { withErrorBoundary } from "@/shared/ui";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import {
	PricingReviewSummary,
	PricingReviewTable,
	PricingReviewTabs
} from "./index";

const PricingReviewBase: FC = () => {
	const { t } = useTranslation("tour_pricing_review_page");
	const [activeOptionId, setActiveOptionId] = useState<number>(
		MOCK_PRICING_DATA[0].id
	);

	const activeOption = useMemo(
		() =>
			MOCK_PRICING_DATA.find((o) => o.id === activeOptionId) ||
			MOCK_PRICING_DATA[0],
		[activeOptionId]
	);

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
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			<PricingReviewTabs
				options={MOCK_PRICING_DATA}
				activeId={activeOptionId}
				onChange={setActiveOptionId}
			/>

			<PricingReviewSummary summary={activeOption.summary} />

			<PricingReviewTable items={activeOption.items} />
		</section>
	);
};

export const PricingReview = withErrorBoundary(PricingReviewBase);

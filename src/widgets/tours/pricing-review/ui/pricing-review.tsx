import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { MOCK_PRICING_DATA } from "@/shared/config";

import { TourHeader } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import {
	PricingReviewSummary,
	PricingReviewTable,
	PricingReviewTabs
} from "./index";

export const PricingReview: FC = () => {
	const { t } = useTranslation("tour_pricing_review_page");
	const [activeOptionId, setActiveOptionId] = useState<number>(
		MOCK_PRICING_DATA[0].id
	);

	const activeOption =
		MOCK_PRICING_DATA.find((o) => o.id === activeOptionId) ||
		MOCK_PRICING_DATA[0];

	return (
		<section className="flex flex-col gap-6 container">
			<TourHeader
				title={t("page_name", {
					name: "Embark on an Unforgettable Archaeological Journey"
				})}
				badgeText="Planning"
				badgeVariant="cyan"
				duration="6 days / 5 nights"
				type="Group"
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>

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

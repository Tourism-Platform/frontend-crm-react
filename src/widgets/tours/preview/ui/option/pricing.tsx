import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Separator } from "@/shared/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/shared/ui/shadcn-ui/accordion";

import type {
	IOptionDetail,
	TOptionSheetSource
} from "@/entities/tour/preview-tour";

import {
	type TPricingAccommodationRow,
	groupPricingEvents
} from "../../model/lib/group-pricing-events";

import { OptionEventDetailSheet } from "./option-event-detail-sheet";

interface IPricingProps {
	optionData?: IOptionDetail;
}

const PricingEventLink: FC<{ source: TOptionSheetSource }> = ({ source }) => (
	<OptionEventDetailSheet
		source={source}
		trigger={
			<button
				type="button"
				className="text-sm underline underline-offset-4 text-left w-fit hover:text-primary"
			>
				{source.title}
			</button>
		}
	/>
);

const AccommodationRow: FC<{ row: TPricingAccommodationRow }> = ({ row }) => {
	if (row.kind === "single") {
		return <PricingEventLink source={row.source} />;
	}

	return (
		<div className="flex flex-wrap items-baseline gap-x-1 text-sm">
			{row.sources.map((source, index) => (
				<span
					key={`${source.title}-${index}`}
					className="inline-flex items-baseline"
				>
					<PricingEventLink source={source} />
					{index < row.sources.length - 1 && (
						<span className="mx-1 text-muted-foreground">or</span>
					)}
				</span>
			))}
		</div>
	);
};

interface IPricingSectionProps {
	value: string;
	label: string;
	isLast?: boolean;
	children: ReactNode;
}

const PricingSection: FC<IPricingSectionProps> = ({
	value,
	label,
	isLast,
	children
}) => (
	<AccordionItem
		value={value}
		className={isLast ? "border-b border-b-transparent" : "border-b"}
	>
		<AccordionTrigger className="hover:no-underline font-semibold text-base">
			{label}
		</AccordionTrigger>
		<AccordionContent className="flex flex-col gap-2 pb-4">
			{children}
		</AccordionContent>
	</AccordionItem>
);

export const Pricing: FC<IPricingProps> = ({ optionData }) => {
	const { t } = useTranslation("preview_option_page");
	const groups = groupPricingEvents(optionData?.days);

	const sections: {
		value: string;
		label: string;
		content: ReactNode;
	}[] = [];

	if (groups.accommodation.length > 0) {
		sections.push({
			value: "accommodation",
			label: t("pricing.accomodation"),
			content: groups.accommodation.map((row, index) => (
				<AccommodationRow key={index} row={row} />
			))
		});
	}

	if (groups.activity.length > 0) {
		sections.push({
			value: "activity",
			label: t("pricing.activity"),
			content: groups.activity.map((source, index) => (
				<PricingEventLink
					key={`${source.title}-${index}`}
					source={source}
				/>
			))
		});
	}

	if (groups.transportation.length > 0) {
		sections.push({
			value: "transportation",
			label: t("pricing.transportation"),
			content: groups.transportation.map((source, index) => (
				<PricingEventLink
					key={`${source.title}-${index}`}
					source={source}
				/>
			))
		});
	}

	return (
		<div className="flex flex-col w-full py-2">
			<h2 className="text-2xl font-bold mb-6">{t("pricing.title")}</h2>

			<div className="flex items-center justify-between mb-8">
				<span className="font-semibold text-base">
					{t("pricing.total_price")}
				</span>
				<span className="font-bold text-base">
					{optionData?.price ?? "—"}
				</span>
			</div>

			{sections.length > 0 && (
				<>
					<h3 className="text-xl font-bold mb-4">
						{t("pricing.details")}
					</h3>
					<Separator className="mb-2" />

					<Accordion type="multiple" className="w-full">
						{sections.map((section, index) => (
							<PricingSection
								key={section.value}
								value={section.value}
								label={section.label}
								isLast={index === sections.length - 1}
							>
								{section.content}
							</PricingSection>
						))}
					</Accordion>
				</>
			)}
		</div>
	);
};

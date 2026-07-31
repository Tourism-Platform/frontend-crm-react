import { Bed, Bus, Map } from "lucide-react";
import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { PreviewerSimple, Separator, withErrorBoundary } from "@/shared/ui";
import { Badge } from "@/shared/ui/shadcn-ui/badge";

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

const PricingEventItem: FC<{ source: TOptionSheetSource }> = ({ source }) => (
	<li className="flex flex-col gap-1.5 py-3 border-b border-border/60 last:border-b-0 last:pb-0 first:pt-0">
		<p className="text-sm font-medium">{source.title}</p>
		{source.sheet.description ? (
			<PreviewerSimple
				text={source.sheet.description}
				lines={2}
				className="text-sm text-muted-foreground"
			/>
		) : null}
		<OptionEventDetailSheet source={source} />
	</li>
);

const AccommodationRow: FC<{ row: TPricingAccommodationRow }> = ({ row }) => {
	const { t } = useTranslation("preview_option_page");

	if (row.kind === "single") {
		return <PricingEventItem source={row.source} />;
	}

	return (
		<li className="flex flex-col gap-2 py-3 border-b border-border/60 last:border-b-0 last:pb-0 first:pt-0">
			<p className="text-xs text-muted-foreground">
				{t("pricing.choice_of")}
			</p>
			<div className="flex flex-col gap-3">
				{row.sources.map((source, index) => (
					<div
						key={`${source.title}-${index}`}
						className="flex flex-col gap-1.5"
					>
						{index > 0 ? (
							<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{t("pricing.or")}
							</span>
						) : null}
						<p className="text-sm font-medium">{source.title}</p>
						{source.sheet.description ? (
							<PreviewerSimple
								text={source.sheet.description}
								lines={2}
								className="text-sm text-muted-foreground"
							/>
						) : null}
						<OptionEventDetailSheet source={source} />
					</div>
				))}
			</div>
		</li>
	);
};

interface IPricingGroupProps {
	icon: ReactNode;
	title: string;
	blurb: string;
	count: number;
	children: ReactNode;
}

const PricingGroup: FC<IPricingGroupProps> = ({
	icon,
	title,
	blurb,
	count,
	children
}) => (
	<section className="flex flex-col gap-4 py-6 border-b border-border last:border-b-0">
		<div className="flex items-start gap-3">
			<div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
				{icon}
			</div>
			<div className="flex flex-col gap-1 min-w-0">
				<div className="flex items-center gap-2 flex-wrap">
					<h4 className="font-semibold text-base">{title}</h4>
					<Badge variant="black" size="sm">
						{count}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{blurb}</p>
			</div>
		</div>
		<ul className="flex flex-col pl-[52px]">{children}</ul>
	</section>
);

const PricingBase: FC<IPricingProps> = ({ optionData }) => {
	const { t } = useTranslation("preview_option_page");
	const groups = groupPricingEvents(optionData?.days);

	const accommodationCount = groups.accommodation.reduce((sum, row) => {
		if (row.kind === "single") return sum + 1;
		return sum + row.sources.length;
	}, 0);

	return (
		<div className="flex flex-col w-full py-2">
			<h2 className="text-2xl font-bold mb-6">{t("pricing.title")}</h2>

			<div className="flex items-end justify-between gap-4 mb-2">
				<span className="text-sm text-muted-foreground">
					{t("pricing.total_price")}
				</span>
				<span className="font-bold text-2xl tracking-tight">
					{optionData?.price ?? "—"}
				</span>
			</div>
			<p className="text-sm text-muted-foreground mb-8">
				{t("pricing.total_hint")}
			</p>

			{(accommodationCount > 0 ||
				groups.activity.length > 0 ||
				groups.transportation.length > 0) && (
				<>
					<h3 className="text-xl font-bold mb-2">
						{t("pricing.details")}
					</h3>
					<p className="text-sm text-muted-foreground mb-4">
						{t("pricing.details_hint")}
					</p>
					<Separator className="mb-2" />

					<div className="flex flex-col">
						{accommodationCount > 0 && (
							<PricingGroup
								icon={<Bed className="w-5 h-5 text-primary" />}
								title={t("pricing.accomodation")}
								blurb={t(
									"pricing.sections.accommodation.blurb"
								)}
								count={accommodationCount}
							>
								{groups.accommodation.map((row, index) => (
									<AccommodationRow key={index} row={row} />
								))}
							</PricingGroup>
						)}

						{groups.activity.length > 0 && (
							<PricingGroup
								icon={<Map className="w-5 h-5 text-primary" />}
								title={t("pricing.activity")}
								blurb={t("pricing.sections.activity.blurb")}
								count={groups.activity.length}
							>
								{groups.activity.map((source, index) => (
									<PricingEventItem
										key={`${source.title}-${index}`}
										source={source}
									/>
								))}
							</PricingGroup>
						)}

						{groups.transportation.length > 0 && (
							<PricingGroup
								icon={<Bus className="w-5 h-5 text-primary" />}
								title={t("pricing.transportation")}
								blurb={t(
									"pricing.sections.transportation.blurb"
								)}
								count={groups.transportation.length}
							>
								{groups.transportation.map((source, index) => (
									<PricingEventItem
										key={`${source.title}-${index}`}
										source={source}
									/>
								))}
							</PricingGroup>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);

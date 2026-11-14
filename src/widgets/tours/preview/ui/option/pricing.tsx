import { TagPriceIcon } from "@solar-icons/react/outline";
import {
	type ComponentType,
	type FC,
	type ReactNode,
	type SVGProps
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import {
	Badge,
	Card,
	PreviewerSimple,
	Skeleton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_PREVIEW_OPTION_EVENT,
	type IOptionDetail,
	type TOptionSheetSource,
	usePreviewOptionPageData
} from "@/entities/tour/preview-tour";

import { OPTION_EVENT_ICONS } from "../../model/config/option-event-icons.config";
import { useIsDraftPreview, usePreviewCurrency } from "../../model/hooks";
import {
	type TPricingAccommodationRow,
	groupPricingEvents
} from "../../model/lib/group-pricing-events";

import { OptionEventDetailSheet } from "./option-event-detail-sheet";

interface IPricingProps {
	optionData?: IOptionDetail;
}

/** Позиция группы: название и описание слева, «Подробнее» справа */
const PricingSource: FC<{ source: TOptionSheetSource }> = ({ source }) => (
	<div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
		<div className="flex min-w-0 flex-1 flex-col gap-1">
			<p className="text-sm font-medium">{source.title}</p>
			<PreviewerSimple
				text={source.sheet.description}
				lines={2}
				className="text-sm text-muted-foreground"
			/>
		</div>
		<OptionEventDetailSheet source={source} />
	</div>
);

const AccommodationRow: FC<{ row: TPricingAccommodationRow }> = ({ row }) => {
	const { t } = useTranslation("preview_option_page");

	if (row.kind === "single") {
		return (
			<li className="py-4">
				<PricingSource source={row.source} />
			</li>
		);
	}

	return (
		<li className="py-4">
			<div className="flex flex-col gap-3 rounded-lg bg-muted/40 p-4">
				<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
					{t("pricing.choice_of")}
				</span>
				{row.sources.map((source, index) => (
					<div
						key={`${source.title}-${index}`}
						className="flex flex-col gap-3"
					>
						{index > 0 ? (
							<div className="flex items-center gap-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
								<span className="h-px flex-1 bg-border" />
								{t("pricing.or")}
								<span className="h-px flex-1 bg-border" />
							</div>
						) : null}
						<PricingSource source={source} />
					</div>
				))}
			</div>
		</li>
	);
};

interface IPricingGroupProps {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	blurb: string;
	count: number;
	children: ReactNode;
}

const PricingGroup: FC<IPricingGroupProps> = ({
	icon: GroupIcon,
	title,
	blurb,
	count,
	children
}) => (
	<Card variant="glass" className="gap-0 py-0">
		<div className="flex items-start gap-3 border-b border-border/60 px-5 py-4">
			<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<GroupIcon className="size-5" />
			</span>
			<div className="flex min-w-0 flex-col gap-0.5">
				<div className="flex flex-wrap items-center gap-2">
					<h4 className="text-base font-semibold">{title}</h4>
					<Badge variant="secondary" className="tabular-nums">
						{count}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{blurb}</p>
			</div>
		</div>
		<ul className="divide-y divide-border/60 px-5">{children}</ul>
	</Card>
);

const PricingBase: FC<IPricingProps> = ({ optionData: optionDataProp }) => {
	const { t } = useTranslation("preview_option_page");
	const { tourId = "", optionId = "" } = useParams<{
		tourId: string;
		optionId: string;
	}>();
	const isDraftPreview = useIsDraftPreview();
	const { currency } = usePreviewCurrency();
	const { optionDetail, isOptionPriceLoading } = usePreviewOptionPageData({
		tourId,
		optionId,
		isDraft: isDraftPreview,
		currency
	});
	const optionData = optionDataProp ?? optionDetail;
	// Цена за человека — из списка вариантов (`pricePerPerson`): в детальном ответе только итог за группу.
	// С пропом (превью тура с одним вариантом) список уже передан — грузить нечего
	const isPriceLoading = !optionDataProp && isOptionPriceLoading;
	const groups = groupPricingEvents(optionData?.days);

	const accommodationCount = groups.accommodation.reduce((sum, row) => {
		if (row.kind === "single") return sum + 1;
		return sum + row.sources.length;
	}, 0);

	return (
		<div className="flex w-full flex-col gap-6">
			<Card
				variant="glass"
				className="flex-row flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
			>
				<div className="flex min-w-0 items-center gap-3.5">
					<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<TagPriceIcon className="size-6" />
					</span>
					<div className="flex min-w-0 flex-col gap-0.5">
						<h2 className="text-lg font-semibold">
							{t("pricing.title")}
						</h2>
						<p className="text-sm text-muted-foreground">
							{t("pricing.total_hint")}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-end gap-0.5">
					<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
						{t("pricing.total_price")}
					</span>
					{/* text-2xl — строка 32 px, скелетон той же высоты */}
					{isPriceLoading ? (
						<Skeleton className="h-8 w-28" />
					) : (
						<span className="text-2xl font-bold tracking-tight text-primary tabular-nums">
							{optionData?.pricePerPerson || "—"}
						</span>
					)}
					<span className="text-xs text-muted-foreground">
						{t("pricing.per_person")}
					</span>
				</div>
			</Card>

			{(accommodationCount > 0 ||
				groups.activity.length > 0 ||
				groups.transportation.length > 0) && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<h3 className="text-lg font-semibold">
							{t("pricing.details")}
						</h3>
						<p className="text-sm text-muted-foreground">
							{t("pricing.details_hint")}
						</p>
					</div>

					{accommodationCount > 0 && (
						<PricingGroup
							icon={
								OPTION_EVENT_ICONS[
									ENUM_PREVIEW_OPTION_EVENT.ACCOMMODATION
								]
							}
							title={t("pricing.accomodation")}
							blurb={t("pricing.sections.accommodation.blurb")}
							count={accommodationCount}
						>
							{groups.accommodation.map((row, index) => (
								<AccommodationRow key={index} row={row} />
							))}
						</PricingGroup>
					)}

					{groups.activity.length > 0 && (
						<PricingGroup
							icon={
								OPTION_EVENT_ICONS[
									ENUM_PREVIEW_OPTION_EVENT.ACTIVITY
								]
							}
							title={t("pricing.activity")}
							blurb={t("pricing.sections.activity.blurb")}
							count={groups.activity.length}
						>
							{groups.activity.map((source, index) => (
								<li
									key={`${source.title}-${index}`}
									className="py-4"
								>
									<PricingSource source={source} />
								</li>
							))}
						</PricingGroup>
					)}

					{groups.transportation.length > 0 && (
						<PricingGroup
							icon={
								OPTION_EVENT_ICONS[
									ENUM_PREVIEW_OPTION_EVENT.TRANSPORTATION
								]
							}
							title={t("pricing.transportation")}
							blurb={t("pricing.sections.transportation.blurb")}
							count={groups.transportation.length}
						>
							{groups.transportation.map((source, index) => (
								<li
									key={`${source.title}-${index}`}
									className="py-4"
								>
									<PricingSource source={source} />
								</li>
							))}
						</PricingGroup>
					)}
				</div>
			)}
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);

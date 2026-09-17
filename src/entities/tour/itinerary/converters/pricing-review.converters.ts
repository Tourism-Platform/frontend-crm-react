import { formatToDollars } from "@/shared/utils";

import { ENUM_PRICING_REVIEW_ROW } from "@/entities/tour/tour/types/pricing-breakdown.types";
import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ITourPricingReview,
	type TGetPricingBreakdownBackendResponse,
	type TOperatorEventBackend,
	type TPackageBillableBackend,
	type TTourMinMaxCostBackend,
	type TTourSummaryEventBackend
} from "../types";

import {
	backendEventTypeMapper,
	isEventBackendTyp
} from "./backend-event-type.converters";
import {
	getMainPoolMember,
	getPoolMember,
	mapEventPoolToSummary
} from "./event/common/event-pool.helpers";
import { attachBreakdownToReviewItem } from "./pricing-breakdown.converters";

/**
 * Supplier label for display (contract 6): a linked product carries the
 * resolved `supplier` ref; inline supply only has `supplier_id`.
 */
const resolveSupplierLabel = (
	supply:
		| { source: "inline"; supplier_id?: string | null }
		| { source: "product"; supplier: { id: string; name: string } }
): string => {
	if (supply.source === "product") {
		return supply.supplier.name || supply.supplier.id;
	}
	return supply.supplier_id ?? "-";
};

const resolveSupplierLabelFromDetails = (
	details:
		| { pool?: { supply: Parameters<typeof resolveSupplierLabel>[0] }[] }
		| null
		| undefined
): string => {
	const supply =
		getPoolMember(details)?.supply ?? getMainPoolMember(details)?.supply;
	if (!supply) return "-";
	return resolveSupplierLabel(supply);
};

const isPackageBillable = (
	item: TTourSummaryEventBackend
): item is TPackageBillableBackend => item.typ === "package_bill";

const mapMinMaxCostToRange = (
	cost: TTourMinMaxCostBackend
): ITourSummaryRange => ({
	from: cost.min.val,
	to: cost.max.val
});

const mapMinMaxCostToDisplay = (cost: TTourMinMaxCostBackend): string => {
	const min = cost.min.val;
	const max = cost.max.val;

	if (min === max) {
		return formatToDollars(min);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

const mapEventPayloadToReviewItem = (
	eventId: string,
	event: TOperatorEventBackend,
	cost?: TTourMinMaxCostBackend,
	markup?: TTourMinMaxCostBackend
): ITourReviewItem => {
	const plannedCost = cost ? mapMinMaxCostToDisplay(cost) : "-";
	const estimatedRevenue = markup ? mapMinMaxCostToDisplay(markup) : "-";

	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return {
			id: eventId,
			item: "",
			supplier: "-",
			plannedCost,
			estimatedRevenue,
			type: ENUM_EVENT.MULTIPLY_OPTION,
			day: event.day,
			position: event.position,
			optionIndex: 0,
			rowKind: ENUM_PRICING_REVIEW_ROW.EVENT,
			subRows: (event.details ?? []).flatMap((detail, index) => {
				if (!isEventBackendTyp(detail.typ)) {
					return [];
				}
				return [
					{
						id: detail.id ?? `${eventId}:${index}`,
						item: detail.name ?? "-",
						supplier: resolveSupplierLabelFromDetails(
							detail.details
						),
						plannedCost: "-",
						estimatedRevenue: "-",
						type: backendEventTypeMapper.to(detail.typ),
						backendTyp: detail.typ,
						day: event.day,
						position: event.position,
						optionIndex: index,
						rowKind: ENUM_PRICING_REVIEW_ROW.EVENT,
						pool: mapEventPoolToSummary(detail.details)
					}
				];
			})
		};
	}

	if (!isEventBackendTyp(event.typ)) {
		throw new Error("Unexpected event typ");
	}

	return {
		id: eventId,
		item: event.name ?? "",
		supplier: resolveSupplierLabelFromDetails(event.details),
		plannedCost,
		estimatedRevenue,
		type: backendEventTypeMapper.to(event.typ),
		backendTyp: event.typ,
		day: event.day,
		position: event.position,
		optionIndex: 0,
		rowKind: ENUM_PRICING_REVIEW_ROW.EVENT,
		pool: mapEventPoolToSummary(event.details)
	};
};

const mapPackageToReviewItem = (
	backend: TPackageBillableBackend
): ITourReviewItem => {
	const eventChildren = backend.events.map((line) =>
		mapEventPayloadToReviewItem(line.event_id, line.event)
	);

	return attachBreakdownToReviewItem(
		{
			id: backend.package.id,
			item: backend.package.name,
			supplier: "-",
			plannedCost: mapMinMaxCostToDisplay(backend.cost),
			estimatedRevenue: mapMinMaxCostToDisplay(backend.markup),
			type: ENUM_EVENT.PACKAGE,
			day: 0,
			position: 0,
			optionIndex: 0,
			rowKind: ENUM_PRICING_REVIEW_ROW.EVENT,
			subRows: eventChildren.length ? eventChildren : undefined
		},
		backend.breakdown
	);
};

const mapIndividualBillToReviewItem = (
	backend: Extract<TTourSummaryEventBackend, { typ: "individual_bill" }>
): ITourReviewItem =>
	attachBreakdownToReviewItem(
		mapEventPayloadToReviewItem(
			backend.event_id,
			backend.event,
			backend.cost,
			backend.markup
		),
		backend.breakdown,
		backend.warnings
	);

export const mapPricingBreakdownToFrontend = (
	backend: TGetPricingBreakdownBackendResponse
): ITourPricingReview => ({
	summary: {
		pax: {
			from: backend.pax.min,
			to: backend.pax.max
		},
		revenue: mapMinMaxCostToRange(backend.estimated_revenue),
		revenuePerPerson: mapMinMaxCostToRange(
			backend.estimated_revenue_per_person
		),
		cost: mapMinMaxCostToRange(backend.estimated_cost),
		profit: mapMinMaxCostToRange(backend.estimated_profit)
	},
	items: backend.events.map((item) =>
		isPackageBillable(item)
			? mapPackageToReviewItem(item)
			: mapIndividualBillToReviewItem(item)
	)
});

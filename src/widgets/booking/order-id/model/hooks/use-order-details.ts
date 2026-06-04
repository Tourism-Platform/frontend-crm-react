import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
	EMPTY_ORDER_TOUR_REVIEW_SUMMARY,
	ENUM_ORDER_STATUS,
	buildOrderTourReviewData,
	mapBookingPaxListToPaxReview,
	mergeTourReviewWithAvailability,
	resolveOrderTourId,
	useGetBookingOrderByIdQuery,
	useListBookingAvailabilityQuery,
	useListPassengerInfoQuery
} from "@/entities/booking";
import { useGetTourSummaryQuery } from "@/entities/tour";

import { getContactItems, getOrderItems } from "../helpers";

export const useOrderDetails = (orderId: string) => {
	const { t } = useTranslation(["order_id_page", "options"]);
	const [searchParams] = useSearchParams();

	const orderQuery = useGetBookingOrderByIdQuery(orderId, {
		skip: !orderId
	});
	const order = orderQuery.data;

	const isInProcessing = order?.status === ENUM_ORDER_STATUS.IN_PROCESSING;

	const paxQuery = useListPassengerInfoQuery(orderId, {
		skip: !orderId
	});

	const tourOptionId = order?.tourOptionId ?? "";

	const tourId = useMemo(
		() =>
			orderId && tourOptionId
				? resolveOrderTourId(
						orderId,
						tourOptionId,
						searchParams.get("tourId")
					)
				: undefined,
		[searchParams, orderId, tourOptionId]
	);

	const pricingQuery = useGetTourSummaryQuery(
		{
			tourId: tourId ?? "",
			optionId: tourOptionId
		},
		{ skip: !tourOptionId || !tourId }
	);

	const availabilityQuery = useListBookingAvailabilityQuery(orderId, {
		skip: !orderId || !isInProcessing
	});

	const orderItems = useMemo(
		() => (order ? getOrderItems(order, t) : []),
		[order, t]
	);

	const contactItems = useMemo(
		() => getContactItems(order?.agency, t),
		[order?.agency, t]
	);

	const paxDetails = useMemo(
		() => mapBookingPaxListToPaxReview(paxQuery.data ?? []),
		[paxQuery.data]
	);

	const tourReview = useMemo(() => {
		if (!order) {
			return { items: [], summary: EMPTY_ORDER_TOUR_REVIEW_SUMMARY };
		}

		const base = buildOrderTourReviewData(pricingQuery.data, order);

		if (!isInProcessing) {
			return base;
		}

		return {
			...base,
			items: mergeTourReviewWithAvailability(
				base.items,
				availabilityQuery.data ?? []
			)
		};
	}, [order, pricingQuery.data, isInProcessing, availabilityQuery.data]);

	const isLoading =
		orderQuery.isLoading ||
		paxQuery.isLoading ||
		pricingQuery.isLoading ||
		(isInProcessing && availabilityQuery.isLoading);

	return {
		order,
		orderItems,
		contactItems,
		paxDetails,
		tourReview,
		isLoading,
		isOrderLoading: orderQuery.isLoading,
		isPaxLoading: paxQuery.isLoading,
		isPricingLoading: pricingQuery.isLoading
	};
};

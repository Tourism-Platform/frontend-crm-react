import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	EMPTY_ORDER_TOUR_REVIEW_SUMMARY,
	ENUM_ORDER_STATUS,
	attachAvailabilityToItineraryItems,
	mapBookingPaxListToPaxReview,
	mapOperatorItineraryToTourReviewItems,
	mapOperatorOverviewToTourReviewSummary,
	useGetOperatorBookingItineraryQuery,
	useGetOperatorBookingOrderQuery,
	useGetOperatorOrderOverviewQuery,
	useListBookingAvailabilityQuery,
	useListPassengerInfoQuery
} from "@/entities/booking";

import { getContactItems, getOrderItems } from "../helpers";

export const useOrderDetails = (orderId: string) => {
	const { t } = useTranslation(["order_id_page", "options"]);

	const orderQuery = useGetOperatorBookingOrderQuery(orderId, {
		skip: !orderId
	});
	const order = orderQuery.data;

	const overviewQuery = useGetOperatorOrderOverviewQuery(orderId, {
		skip: !orderId
	});

	const itineraryQuery = useGetOperatorBookingItineraryQuery(orderId, {
		skip: !orderId
	});

	const paxQuery = useListPassengerInfoQuery(orderId, {
		skip: !orderId
	});

	const availabilityQuery = useListBookingAvailabilityQuery(orderId, {
		skip: !orderId || order?.status === ENUM_ORDER_STATUS.CANCELLED
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
		const items = attachAvailabilityToItineraryItems(
			mapOperatorItineraryToTourReviewItems(itineraryQuery.data),
			availabilityQuery.data ?? []
		);
		const summary = overviewQuery.data
			? mapOperatorOverviewToTourReviewSummary(overviewQuery.data)
			: EMPTY_ORDER_TOUR_REVIEW_SUMMARY;

		return { items, summary };
	}, [itineraryQuery.data, availabilityQuery.data, overviewQuery.data]);

	const isLoading =
		orderQuery.isLoading ||
		overviewQuery.isLoading ||
		itineraryQuery.isLoading ||
		paxQuery.isLoading;

	return {
		order,
		orderItems,
		contactItems,
		paxDetails,
		tourReview,
		isLoading,
		isOrderLoading: orderQuery.isLoading,
		isPaxLoading: paxQuery.isLoading,
		isAvailabilityLoading: availabilityQuery.isLoading
	};
};

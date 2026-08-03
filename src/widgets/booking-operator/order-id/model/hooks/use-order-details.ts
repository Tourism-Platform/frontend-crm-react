import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	EMPTY_ORDER_TOUR_REVIEW_SUMMARY,
	buildOrderTourReviewData,
	mapAvailabilityToTourReviewItems,
	mapBookingPaxListToPaxReview,
	useGetBookingOrderByIdQuery,
	useListBookingAvailabilityQuery,
	useListPassengerInfoQuery
} from "@/entities/booking";

import { getContactItems, getOrderItems } from "../helpers";

export const useOrderDetails = (orderId: string) => {
	const { t } = useTranslation(["order_id_page", "options"]);

	const orderQuery = useGetBookingOrderByIdQuery(orderId, {
		skip: !orderId
	});
	const order = orderQuery.data;

	const paxQuery = useListPassengerInfoQuery(orderId, {
		skip: !orderId
	});

	const availabilityQuery = useListBookingAvailabilityQuery(orderId, {
		skip: !orderId
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

		const items = mapAvailabilityToTourReviewItems(
			availabilityQuery.data ?? []
		);

		return buildOrderTourReviewData(items, order);
	}, [order, availabilityQuery.data]);

	const isLoading =
		orderQuery.isLoading ||
		paxQuery.isLoading ||
		availabilityQuery.isLoading;

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

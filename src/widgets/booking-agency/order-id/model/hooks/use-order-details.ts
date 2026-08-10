import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	mapBookingItineraryToTourReviewItems,
	mapBookingPaxListToPaxReview,
	useGetAgencyBookingOrderQuery,
	useGetBookingItineraryQuery,
	useListPassengerInfoQuery
} from "@/entities/booking";

import { getContactItems, getOrderItems } from "../helpers";

export const useOrderDetails = (orderId: string) => {
	const { t } = useTranslation(["order_id_page", "options"]);

	const orderQuery = useGetAgencyBookingOrderQuery(orderId, {
		skip: !orderId
	});
	const order = orderQuery.data;

	const itineraryQuery = useGetBookingItineraryQuery(orderId, {
		skip: !orderId
	});

	const paxQuery = useListPassengerInfoQuery(orderId, {
		skip: !orderId
	});

	const orderItems = useMemo(
		() => (order ? getOrderItems(order, t) : []),
		[order, t]
	);

	const contactItems = useMemo(
		() => getContactItems(order?.operator, t),
		[order?.operator, t]
	);

	const paxDetails = useMemo(
		() => mapBookingPaxListToPaxReview(paxQuery.data ?? []),
		[paxQuery.data]
	);

	const tourReviewItems = useMemo(
		() => mapBookingItineraryToTourReviewItems(itineraryQuery.data),
		[itineraryQuery.data]
	);

	const isLoading =
		orderQuery.isLoading || itineraryQuery.isLoading || paxQuery.isLoading;

	return {
		order,
		orderItems,
		contactItems,
		paxDetails,
		tourReviewItems,
		isLoading,
		isOrderLoading: orderQuery.isLoading,
		isPaxLoading: paxQuery.isLoading,
		isItineraryLoading: itineraryQuery.isLoading
	};
};

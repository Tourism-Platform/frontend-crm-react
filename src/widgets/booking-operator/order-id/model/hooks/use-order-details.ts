import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	ENUM_ORDER_STATUS,
	attachAvailabilityToItineraryItems,
	mapBookingPaxListToPaxReview,
	mapOperatorItineraryToTourReviewItems,
	useGetOperatorBookingItineraryQuery,
	useGetOperatorBookingOrderQuery,
	useListBookingAvailabilityQuery,
	useListPassengerInfoQuery
} from "@/entities/booking";
import { useGetOperatorOrderFinancialsQuery } from "@/entities/finance";

import { getContactItems, getOrderItems } from "../helpers";

export const useOrderDetails = (orderId: string) => {
	const { t } = useTranslation(["order_id_page", "options"]);

	const orderQuery = useGetOperatorBookingOrderQuery(orderId, {
		skip: !orderId
	});
	const order = orderQuery.data;

	const financialsQuery = useGetOperatorOrderFinancialsQuery(orderId, {
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

	const tourReviewItems = useMemo(
		() =>
			attachAvailabilityToItineraryItems(
				mapOperatorItineraryToTourReviewItems(itineraryQuery.data),
				availabilityQuery.data ?? []
			),
		[itineraryQuery.data, availabilityQuery.data]
	);

	const isLoading =
		orderQuery.isLoading ||
		financialsQuery.isLoading ||
		itineraryQuery.isLoading ||
		paxQuery.isLoading;

	return {
		order,
		orderItems,
		contactItems,
		paxDetails,
		tourReviewItems,
		financials: financialsQuery.data,
		isLoading,
		isOrderLoading: orderQuery.isLoading,
		isPaxLoading: paxQuery.isLoading,
		isAvailabilityLoading: availabilityQuery.isLoading
	};
};

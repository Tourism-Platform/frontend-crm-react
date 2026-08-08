import { formatDate } from "@/shared/utils";

import type {
	IOperatorOrderDetail,
	IOrderAgencyInfo,
	IOrderTourInfo,
	IOrderUserInfo,
	TOperatorOrderDetailBackend
} from "../types";

import { bookingTourTypeMapper } from "./booking-tour-type.convert";
import { orderStatusMapper } from "./order-status.convert";

const mapOrderTourInfo = (
	tour: TOperatorOrderDetailBackend["tour"]
): IOrderTourInfo => {
	const orderType = bookingTourTypeMapper.from(tour.typ)!;
	const tourName = tour.title ?? "";

	return {
		name: tourName,
		type: orderType,
		days: tour.days,
		nights: tour.nights,
		route: tour.route?.join(" - ") ?? "-",
		duration: ""
	};
};

const mapOrderAgencyInfo = (
	agency: TOperatorOrderDetailBackend["agency"]
): IOrderAgencyInfo | null => {
	if (!agency) return null;

	return {
		id: agency.id,
		name: agency.name,
		businessName: agency.business_name ?? null,
		contactPerson: agency.contact_person ?? null,
		contactEmail: agency.contact_email ?? null,
		contactPhone: agency.contact_phone ?? null
	};
};

const mapOrderUserInfo = (
	user: TOperatorOrderDetailBackend["user"]
): IOrderUserInfo | null => {
	if (!user) return null;

	return {
		id: user.id,
		email: user.email,
		firstName: user.first_name ?? null,
		lastName: user.last_name ?? null,
		phoneNumber: user.phone_number ?? null
	};
};

export const mapOperatorBookingOrderToFrontend = (
	data: TOperatorOrderDetailBackend
): IOperatorOrderDetail => {
	const { order, tour: tourRaw, agency, user } = data;
	const tour = mapOrderTourInfo(tourRaw);

	return {
		orderId: order.id,
		orderNumber: order.order_number,
		orderType: tour.type,
		status: orderStatusMapper.from(order.status)!,
		pax: order.pax,
		dates: {
			from: formatDate(order.date),
			to: formatDate(order.end_date)
		},
		tourName: tour.name,
		tourOptionId: order.tour_option_id,
		tour,
		duration: tour.duration,
		route: tour.route,
		comment: order.comment ?? undefined,
		tourAmount: order.tour_amount,
		paidAmount: order.paid_amount,
		agencyId: order.agency_id ?? null,
		userId: order.user_id ?? null,
		agency: mapOrderAgencyInfo(agency),
		user: mapOrderUserInfo(user)
	};
};

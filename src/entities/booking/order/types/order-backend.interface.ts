import type {
	BOOKING_ORDER_PATHS,
	BookingOrderClientDetail,
	BookingOrderDetail,
	BookingOrderListResponse,
	BookingOrderResponse,
	BookingOrderRow,
	EventBreakdownSchemaOutput,
	EventEditOpOutput,
	OperatorItineraryResponse,
	OrderAgencyInfo,
	OrderOperatorInfo,
	OrderTourEventSchemaOutput,
	OrderTourInfo,
	OrderUserInfo
} from "@/shared/api";

export type TBookingOrderListItemBackend = BookingOrderRow;

export type TBookingOrderBackendResponse =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.response;

export type TBookingOrderPaginatedQuery =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.query;
export type TOrderAgencyInfoBackend = OrderAgencyInfo;
export type TOrderTourInfoBackend = OrderTourInfo;
export type TOrderUserInfoBackend = OrderUserInfo;
export type TBookingOrderDetailBackend = BookingOrderDetail;
export type TBookingOrderResponseBackend = BookingOrderResponse;
export type TOrderOperatorInfoBackend = OrderOperatorInfo;
export type TBookingOrderClientDetailBackend = BookingOrderClientDetail;
export type TBookingOrderListResponseBackend = BookingOrderListResponse;
export type TEventBreakdownSchemaOutputBackend = EventBreakdownSchemaOutput;
export type TEventEditOpOutputBackend = EventEditOpOutput;
export type TOperatorItineraryResponseBackend = OperatorItineraryResponse;
export type TOrderTourEventSchemaOutputBackend = OrderTourEventSchemaOutput;

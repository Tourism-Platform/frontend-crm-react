import type { BOOKING_ORDER_AGENCY_PATHS } from "@/shared/api";

export type TAgencyOrderDetailBackend = ReturnType<
	typeof BOOKING_ORDER_AGENCY_PATHS.getAgencyBookingOrder
>["_types"]["response"];

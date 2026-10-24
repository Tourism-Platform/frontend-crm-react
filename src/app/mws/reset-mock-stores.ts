import { resetAuthStore } from "@/entities/auth/mock/auth.store";
import { resetBookingPaxStore } from "@/entities/booking/order/mock/booking-order-pax.mock";
import { resetBookingOrderStore } from "@/entities/booking/order/mock/booking-order.store";
import { resetBookingPriceStore } from "@/entities/booking/order/mock/booking-price.store";
import { resetBookingSnapshotStore } from "@/entities/booking/order/mock/booking-snapshot.store";
import { resetClientPaymentsForTests } from "@/entities/finance/client-payment/mock/payment.store";
import { resetPaymentRoutesStore } from "@/entities/finance/finance-information/mock/operator-payment-routes.mock";
import { resetStaffStore } from "@/entities/staff/mock/staff.store";
import { resetSupplierStore } from "@/entities/supplier/mock/supplier.store";
import { resetEventLibraryStore } from "@/entities/tour/event-library/mock/event-library.store";
import { resetItineraryStore } from "@/entities/tour/itinerary/mock/itinerary.store";
import { resetLandingStore } from "@/entities/tour/landing/mock/landing.store";
import { resetScheduleStore } from "@/entities/tour/schedule/mock/schedule.store";
import { resetTourStore } from "@/entities/tour/tour/mock/tour.store";
import { resetAccountStore } from "@/entities/user/account/mock/account.store";
import { resetAgencyStore } from "@/entities/user/agency/mock/agency.store";
import { resetOperatorStore } from "@/entities/user/operator/mock/operator.store";

/** Тесты: вернуть все мок-сторы к исходным сидам */
export const resetMockStores = () => {
	resetAuthStore();
	resetAccountStore();
	resetOperatorStore();
	resetAgencyStore();
	resetStaffStore();
	resetPaymentRoutesStore();
	resetSupplierStore();
	resetTourStore();
	resetScheduleStore();
	resetLandingStore();
	resetItineraryStore();
	resetEventLibraryStore();
	resetBookingOrderStore();
	resetBookingPriceStore();
	resetBookingPaxStore();
	resetBookingSnapshotStore();
	resetClientPaymentsForTests();
};

import type { TBookingVoucherBackend } from "../types";

const voucherStore = new Map<string, TBookingVoucherBackend>();

export const getVoucherFromStore = (bookingId: string) =>
	voucherStore.get(bookingId);

export const setVoucherInStore = (voucher: TBookingVoucherBackend) => {
	voucherStore.set(voucher.booking_id, voucher);
	return voucher;
};

export const deleteVoucherFromStore = (bookingId: string) =>
	voucherStore.delete(bookingId);

export const resetBookingVoucherStore = () => {
	voucherStore.clear();
};

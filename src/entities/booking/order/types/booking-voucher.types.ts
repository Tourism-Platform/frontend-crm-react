import type { VoucherResponse } from "@/shared/api";

export type TBookingVoucherBackend = VoucherResponse;

export interface IBookingVoucher {
	bookingId: string;
	orderNumber: string;
	url: string;
	fileName: string | null;
}

export interface IUploadBookingVoucherRequest {
	bookingId: string;
	file: File;
}

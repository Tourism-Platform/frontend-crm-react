import type {
	HotelProductCreate,
	HotelProductReadOutput,
	HotelProductUpdate,
	PerRoomHotelDetails,
	StayRateInput,
	WholeHotelDetails
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type THotelProductDetailsBackend =
	| PerRoomHotelDetails
	| WholeHotelDetails;
/**
 * Opaque whole-stay price payload of a whole-priced hotel. The general form
 * never edits it; it is carried through so an update can resend it unchanged.
 */
export type THotelStayRateInputBackend = StayRateInput;
export type TCreateHotelProductBackend = Extract<
	TCreateProductBodyBackend,
	HotelProductCreate
>;
export type THotelProductReadBackend = HotelProductReadOutput;
export type TUpdateHotelProductBackend = HotelProductUpdate;

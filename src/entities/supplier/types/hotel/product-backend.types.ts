import type {
	HotelProductCreate,
	HotelProductDetails,
	HotelProductReadOutput,
	HotelProductUpdate
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type THotelProductDetailsBackend = HotelProductDetails;
export type TCreateHotelProductBackend = Extract<
	TCreateProductBodyBackend,
	HotelProductCreate
>;
export type THotelProductReadBackend = HotelProductReadOutput;
export type TUpdateHotelProductBackend = HotelProductUpdate;

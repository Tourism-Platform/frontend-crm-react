import type {
	HotelPolicySchemaInput,
	HotelPolicySchemaOutput,
	SupplierPolicyBandInput
} from "@/shared/api/generated/Api";

export type TSupplierPolicyBandInputBackend = SupplierPolicyBandInput;
export type THotelPolicyInputBackend = HotelPolicySchemaInput;
export type THotelPolicyReadBackend = HotelPolicySchemaOutput | null;

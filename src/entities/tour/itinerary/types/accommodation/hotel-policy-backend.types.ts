import type {
	HotelPolicySchemaInput,
	HotelPolicySchemaOutput,
	MonetaryValueSchema,
	SupplierPolicyBandInput
} from "@/shared/api";

export type THotelPolicyBandInputBackend = SupplierPolicyBandInput;
export type THotelPolicyInputBackend = HotelPolicySchemaInput;
export type THotelPolicyOutputBackend = HotelPolicySchemaOutput;
export type THotelPolicyMonetaryBackend = MonetaryValueSchema;

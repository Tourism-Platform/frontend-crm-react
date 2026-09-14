import type {
	FixedChargeInput,
	FixedChargeOutput,
	PerPersonChargeOutput
} from "@/shared/api/generated/Api";

export type TChargeMarkupInputBackend = NonNullable<FixedChargeInput["markup"]>;
export type TChargeMarkupReadBackend = NonNullable<FixedChargeOutput["markup"]>;

export type TSupplierVariantChargeReadBackend =
	| ({ typ: "fixed" } & FixedChargeOutput)
	| ({ typ: "per_person" } & PerPersonChargeOutput);

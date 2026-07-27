import type {
	FixedChargeInput,
	FixedChargeOutput,
	FixedExpenseInput,
	FixedExpenseOutput,
	PerPersonChargeInput,
	PerPersonChargeOutput
} from "@/shared/api";

export type TFixedChargeBackend = FixedChargeOutput;
export type TFixedChargeInputBackend = FixedChargeInput;

export type TPerPersonChargeBackend = PerPersonChargeOutput;
export type TPerPersonChargeInputBackend = PerPersonChargeInput;

export type TFixedExpenseBackend = FixedExpenseOutput;
export type TFixedExpenseInputBackend = FixedExpenseInput;

export type TCommissionMarkupBackend = NonNullable<FixedChargeOutput["markup"]>;
export type TCommissionMarkupInputBackend = NonNullable<
	FixedChargeInput["markup"]
>;

import type {
	DurationChargeInput,
	DurationChargeOutput,
	FixedChargeInput,
	FixedChargeOutput,
	FixedExpenseInput,
	FixedExpenseOutput,
	GroupSizeTierInput,
	GroupSizeTierOutput,
	PerPersonChargeInput,
	PerPersonChargeOutput
} from "@/shared/api";

export type TFixedChargeBackend = FixedChargeOutput;
export type TFixedChargeInputBackend = FixedChargeInput;

export type TDurationChargeBackend = DurationChargeOutput;
export type TDurationChargeInputBackend = DurationChargeInput;

export type TPerPersonChargeBackend = PerPersonChargeOutput;
export type TPerPersonChargeInputBackend = PerPersonChargeInput;

export type TFixedExpenseBackend = FixedExpenseOutput;
export type TFixedExpenseInputBackend = FixedExpenseInput;

export type TPerGroupTierBackend = GroupSizeTierOutput;
export type TPerGroupTierInputBackend = GroupSizeTierInput;

export type TCommissionMarkupBackend = NonNullable<FixedChargeOutput["markup"]>;
export type TCommissionMarkupInputBackend = NonNullable<
	FixedChargeInput["markup"]
>;

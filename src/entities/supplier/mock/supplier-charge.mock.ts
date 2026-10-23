import type { FixedChargeOutput, PerPersonChargeOutput } from "@/shared/api";

/** Фиксированная цена без сборов и наценки */
export const fixedChargeMock = (val: number): FixedChargeOutput => ({
	typ: "fixed",
	cost: { val },
	fees: null,
	extra_costs: [],
	markup: null
});

export const perPersonChargeMock = (val: number): PerPersonChargeOutput => ({
	typ: "per_person",
	cost_per_person: { val },
	fees: null,
	extra_costs: [],
	markup: null
});

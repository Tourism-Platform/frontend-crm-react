/** Фиксированная цена без сборов и наценки */
import type {
	TFixedChargeBackend,
	TPerPersonChargeBackend
} from "@/entities/tour/itinerary/types/commission-backend.types";

export const fixedChargeMock = (val: number): TFixedChargeBackend => ({
	typ: "fixed",
	cost: { val },
	fees: null,
	extra_costs: [],
	markup: null
});

export const perPersonChargeMock = (val: number): TPerPersonChargeBackend => ({
	typ: "per_person",
	cost_per_person: { val },
	fees: null,
	extra_costs: [],
	markup: null
});

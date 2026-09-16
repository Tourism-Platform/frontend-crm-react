import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";
import type {
	ActivityDetailsOutput,
	BusDetailsOutput,
	FlightDetailsOutput,
	GuideDetailsOutput,
	HousingDetailsOutput,
	InformationDetailsOutput,
	SupplementaryDetailsOutput,
	TransferDetailsOutput
} from "@/shared/api";

import type { TSingleEventReadBackend } from "../types";

import { mapBackendEventToTimeSubtitle } from "./event-time-range.converters";

const INLINE_MEMBER_ID = "11111111-1111-1111-1111-111111111111";
const INLINE = { source: "inline" as const, supplier_id: null };

const inlinePool = <T>(spec: T) => [
	{
		id: INLINE_MEMBER_ID,
		is_main: true,
		supply: INLINE,
		spec
	}
];

const META = {
	id: "00000000-0000-0000-0000-000000000001",
	day: 1,
	position: 0,
	is_optional: false,
	images: [] as [],
	name: null,
	description: null,
	package_id: null
};

const ZERO_FIXED = {
	typ: "fixed" as const,
	cost: { val: 0, currency: Currency.USD },
	fees: null,
	extra_costs: [] as [],
	markup: null
};

const activityEvent = (
	plan: ActivityDetailsOutput["plan"]
): TSingleEventReadBackend => ({
	...META,
	typ: "activity",
	details: {
		plan,
		pool: inlinePool({
			sub_typ: "food",
			images: [],
			name: null,
			location: null,
			offerings: []
		})
	}
});

const housingEvent = (
	plan: HousingDetailsOutput["plan"]
): TSingleEventReadBackend => ({
	...META,
	typ: "housing",
	details: {
		plan,
		pool: inlinePool({
			pricing: "whole" as const,
			images: [],
			name: null,
			location: null,
			stars: null,
			typs: [],
			amenities: [],
			policy: null,
			price: { base: ZERO_FIXED, seasons: [] },
			categories: []
		})
	}
});

const transferEvent = (
	plan: TransferDetailsOutput["plan"]
): TSingleEventReadBackend => ({
	...META,
	typ: "transfer",
	details: {
		plan,
		pool: inlinePool({
			pricing: "whole" as const,
			images: [],
			name: null,
			cars: [],
			charge: ZERO_FIXED
		})
	}
});

const flightEvent = (
	plan: FlightDetailsOutput["plan"]
): TSingleEventReadBackend => ({
	...META,
	typ: "flight",
	details: {
		plan,
		pool: inlinePool({
			pricing: "whole" as const,
			images: [],
			name: null,
			legs: [],
			fares: [],
			charge: ZERO_FIXED
		})
	}
});

const busEvent = (plan: BusDetailsOutput["plan"]): TSingleEventReadBackend => ({
	...META,
	typ: "bus",
	details: {
		plan,
		pool: inlinePool({
			pricing: "whole" as const,
			images: [],
			name: null,
			vehicles: [],
			charge: ZERO_FIXED
		})
	}
});

const refEvent = (
	plan: InformationDetailsOutput["plan"]
): TSingleEventReadBackend => ({
	...META,
	typ: "ref",
	details: {
		plan,
		pool: inlinePool({})
	}
});

const guideEvent = (): TSingleEventReadBackend => ({
	...META,
	typ: "guide",
	details: {
		plan: {},
		pool: inlinePool({ name: null, typ_tiers: [], categories: [] })
	} satisfies GuideDetailsOutput
});

const supplementaryEvent = (): TSingleEventReadBackend => ({
	...META,
	typ: "supplementary",
	details: {
		plan: {},
		pool: inlinePool({ item: [] })
	} satisfies SupplementaryDetailsOutput
});

describe("mapBackendEventToTimeSubtitle", () => {
	it("formats activity start/end from plan", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				activityEvent({
					start_time: { time: "09:00:00", timezone: 5 },
					end_time: { time: "17:30:00", timezone: 5 }
				})
			)
		).toBe("09:00 – 17:30");
	});

	it("formats housing check-in/out from plan", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				housingEvent({
					check_in: { time: "14:00:00" },
					check_out: { time: "11:00:00" }
				})
			)
		).toBe("14:00 – 11:00");
	});

	it("formats housing check-in/out for a product-linked stay (plan only)", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				housingEvent({
					check_in: { time: "11:00:00" },
					check_out: { time: "12:00:00" }
				})
			)
		).toBe("11:00 – 12:00");
	});

	it("formats transfer departure/arrival from plan", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				transferEvent({
					typ: null,
					departure: { time: { time: "08:15:00" }, location: null },
					arrival: { time: { time: "09:45:00" }, location: null }
				})
			)
		).toBe("08:15 – 09:45");
	});

	it("formats flight departure/arrival from plan", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				flightEvent({
					departure_time: { time: "10:00:00" },
					arrival_time: { time: "15:20:00" }
				})
			)
		).toBe("10:00 – 15:20");
	});

	it("does not invent a flight arrival when plan only has departure", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				flightEvent({
					departure_time: { time: "10:00:00" }
				})
			)
		).toBe("10:00");
	});

	it("formats bus journey from first departure and last arrival on plan.legs", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				busEvent({
					legs: [
						{
							departure: {
								time: { time: "06:30:00" },
								location: null
							},
							arrival: {
								time: { time: "08:00:00" },
								location: null
							}
						}
					]
				})
			)
		).toBe("06:30 – 08:00");
	});

	it("returns undefined for guide/supplement (no clock plan)", () => {
		expect(mapBackendEventToTimeSubtitle(guideEvent())).toBeUndefined();
		expect(
			mapBackendEventToTimeSubtitle(supplementaryEvent())
		).toBeUndefined();
	});

	it("returns single edge when only one time is present", () => {
		expect(
			mapBackendEventToTimeSubtitle(
				refEvent({ start_time: { time: "12:00:00" } })
			)
		).toBe("12:00");
	});
});

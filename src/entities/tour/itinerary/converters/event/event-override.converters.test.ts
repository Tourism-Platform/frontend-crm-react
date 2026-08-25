import { describe, expect, it, vi } from "vitest";

import {
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE
} from "../../types";

import {
	mapEventOverrideFromDetails,
	mapEventOverrideToBackend
} from "./event-override.converters";
import {
	mapHousingOverrideExpensesToBackend,
	mapHousingOverrideFromBackend
} from "./housing-override.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

vi.mock("@/entities/commission", () => ({
	DEFAULT_EVENT_CURRENCY: "USD",
	currencyConverter: {
		from: (value?: string) => value ?? "USD",
		to: (value?: string) => value
	},
	ENUM_CURRENCY_OPTIONS: { USD: "USD", EUR: "EUR" }
}));

describe("event-override.converters", () => {
	it("mapHousingOverrideExpensesToBackend returns null for empty input", () => {
		expect(mapHousingOverrideExpensesToBackend(null)).toBeNull();
		expect(mapHousingOverrideExpensesToBackend(undefined)).toBeNull();
	});

	it("maps housing expenses + policy to backend", () => {
		const body = mapEventOverrideToBackend({
			typ: "housing",
			expenses: {
				invoicing: ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				price_based_on_class: false,
				add_margin_separately: false,
				expenses: {
					typ: "per_room",
					rooms: []
				},
				[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: null,
				package_id: "",
				total_price: 95,
				fees: [],
				currency: "USD"
			},
			policy: {
				checkInFrom: "10:00",
				checkOutUntil: "12:00",
				earlyCheckIn: [],
				lateCheckOut: []
			}
		});

		expect(body.typ).toBe("housing");
		expect(body.expenses?.typ).toBe("fixed");
		if ("policy" in body) {
			expect(body.policy?.check_in_from).toBe("10:00");
		}
	});

	it("maps train expenses only", () => {
		const body = mapEventOverrideToBackend({
			typ: "train",
			expenses: {
				invoicing: ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
				pricing_type: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
				add_margin_separately: false,
				markup: null,
				package_id: "",
				[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: 30,
				[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: "USD"
			}
		});

		expect(body.typ).toBe("train");
		expect(body.expenses?.typ).toBe("per_person");
	});

	it("mapHousingOverrideFromBackend null-in → null", () => {
		expect(mapHousingOverrideFromBackend(null)).toBeNull();
	});

	it("mapEventOverrideFromDetails null override → null", () => {
		expect(mapEventOverrideFromDetails({}, "housing")).toBeNull();
		expect(
			mapEventOverrideFromDetails({ override: null }, "train")
		).toBeNull();
	});

	it("mapEventOverrideFromDetails maps housing override", () => {
		const form = mapEventOverrideFromDetails(
			{
				override: {
					typ: "housing",
					expenses: {
						typ: "fixed",
						cost: { val: 95, currency: "USD" },
						fees: null,
						markup: null
					},
					policy: {
						check_in_from: "10:00",
						check_out_until: null,
						early_check_in: [],
						late_check_out: []
					}
				}
			},
			"housing"
		);

		expect(form?.typ).toBe("housing");
		if (form?.typ === "housing") {
			expect(form.expenses?.total_price).toBe(95);
			expect(form.policy?.checkInFrom).toBe("10:00");
		}
	});
});

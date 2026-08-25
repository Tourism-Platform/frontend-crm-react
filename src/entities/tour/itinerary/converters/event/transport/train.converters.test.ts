import { describe, expect, it, vi } from "vitest";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_TRAIN,
	ENUM_HOUSING_SOURCE
} from "../../../types";

import { mapTrainEventToForm, mapTrainFormToUpdate } from "./train.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

vi.mock("@/shared/converters", () => ({
	mapBackendLocationToGeoForm: (
		location: { lat?: number; long?: number } | null
	) =>
		location && location.lat != null
			? { lat: location.lat, long: location.long }
			: null,
	mapGeoFormToBackendLocation: () => ({ lat: 0, long: 0 })
}));

vi.mock("@/shared/hooks", () => ({
	getDeviceUtcOffset: () => 0
}));

describe("mapTrainEventToForm — inherited", () => {
	it("fills product_id and maps product hops for RO", () => {
		const form = mapTrainEventToForm({
			id: "e11e0000-0000-0000-0000-000000000002",
			tour_option_id: "0pt00000-0000-0000-0000-000000000002",
			event: {
				typ: ENUM_EVENT_BACKEND.TRAIN,
				day: 1,
				position: 0,
				name: "Afrosiyob",
				description: null,
				package_id: null,
				details: {
					product_id: "b0c1c0de-0000-0000-0000-000000000002",
					variant_id: null,
					source: "inherited",
					override: null,
					product: {
						typ: "train",
						id: "b0c1c0de-0000-0000-0000-000000000002",
						supplier_id: "5upp0000-0000-0000-0000-000000000001",
						name: "Afrosiyob TAS–SKD",
						hop: [
							{
								departure: {
									time: { time: "08:00" },
									location: { lat: 41.29, long: 69.28 }
								},
								arrival: {
									time: { time: "10:10" },
									location: { lat: 39.65, long: 66.97 }
								}
							}
						],
						variants: []
					}
				}
			}
		} as never);

		expect(form.product_id).toBe("b0c1c0de-0000-0000-0000-000000000002");
		expect(form.source).toBe(ENUM_HOUSING_SOURCE.INHERITED);
		expect(form.has_override).toBe(false);
		expect(form.general.route[0]).toMatchObject({
			[ENUM_FORM_TRAIN.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
			[ENUM_FORM_TRAIN.DEPARTURE_TIME]: "08:00",
			[ENUM_FORM_TRAIN.ARRIVAL_TIME]: "10:10"
		});
	});
});

describe("mapTrainFormToUpdate — inherited", () => {
	it("sends product link without hop/expenses", () => {
		const body = mapTrainFormToUpdate({
			name: "Afrosiyob",
			product_id: "b0c1c0de-0000-0000-0000-000000000002",
			variant_id: "a2f30000-0000-0000-0000-000000000002",
			source: ENUM_HOUSING_SOURCE.INHERITED,
			general: {
				description: "leg",
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
				route: [
					{
						[ENUM_FORM_TRAIN.TRANSPORT_TYPE]:
							ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
						[ENUM_FORM_TRAIN.CARRIER]: "",
						[ENUM_FORM_TRAIN.TRAIN_NUMBER]: "",
						[ENUM_FORM_TRAIN.DEPARTURE_STATION]: null,
						[ENUM_FORM_TRAIN.ARRIVAL_STATION]: null,
						[ENUM_FORM_TRAIN.DEPARTURE_TIME]: "08:00",
						[ENUM_FORM_TRAIN.ARRIVAL_TIME]: "10:10",
						[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: "0",
						[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: "0"
					}
				]
			},
			pricing: {
				invoicing: "individual",
				pricing_type: "flat_rate",
				package_id: ""
			} as never
		});

		expect(body).toEqual({
			typ: "train",
			name: "Afrosiyob",
			description: "leg",
			package_id: null,
			details: {
				product_id: "b0c1c0de-0000-0000-0000-000000000002",
				variant_id: "a2f30000-0000-0000-0000-000000000002"
			}
		});
		expect(body.details).not.toHaveProperty("hop");
		expect(body.details).not.toHaveProperty("expenses");
		expect(body.details).not.toHaveProperty("source");
	});
});

describe("mapTrainFormToUpdate — custom regression", () => {
	it("still sends hop without product_id", () => {
		const body = mapTrainFormToUpdate({
			name: "Custom train",
			source: ENUM_HOUSING_SOURCE.CUSTOM,
			general: {
				description: "",
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
				route: [
					{
						[ENUM_FORM_TRAIN.TRANSPORT_TYPE]:
							ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
						[ENUM_FORM_TRAIN.CARRIER]: "",
						[ENUM_FORM_TRAIN.TRAIN_NUMBER]: "",
						[ENUM_FORM_TRAIN.DEPARTURE_STATION]: {
							lat: 41.29,
							long: 69.28
						} as never,
						[ENUM_FORM_TRAIN.ARRIVAL_STATION]: {
							lat: 39.65,
							long: 66.97
						} as never,
						[ENUM_FORM_TRAIN.DEPARTURE_TIME]: "08:00",
						[ENUM_FORM_TRAIN.ARRIVAL_TIME]: "10:10",
						[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: "0",
						[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: "0"
					}
				]
			},
			pricing: {
				invoicing: "individual",
				pricing_type: "flat_rate",
				package_id: "",
				total_price: 50,
				currency: "USD"
			} as never
		});

		expect(body.details).not.toHaveProperty("product_id");
		expect(body.details).toHaveProperty("hop");
	});
});

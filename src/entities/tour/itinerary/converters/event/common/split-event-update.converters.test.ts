import { describe, expect, it } from "vitest";

import type {
	TEventDetailsBackend,
	TTourEventUpdateBackend
} from "../../../types";

import { splitEventUpdate } from "./split-event-update.converters";

const SPEC = {
	pricing: "per_car",
	cars: [{ id: "car-1", body_type: "sedan", pax: 3 }]
};
const PLAN = { typ: "airport_transfer" };

const transferBody = (
	pool: unknown[],
	plan: unknown = PLAN
): TTourEventUpdateBackend =>
	({
		typ: "transfer",
		name: "Трансфер",
		description: "Встреча в аэропорту",
		package_id: null,
		details: { plan, pool }
	}) as unknown as TTourEventUpdateBackend;

const readDetails = (pool: unknown[]): TEventDetailsBackend =>
	({ plan: PLAN, pool }) as unknown as TEventDetailsBackend;

describe("splitEventUpdate", () => {
	it("sends texts, package and plan without the pool to PATCH O", () => {
		const { option } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "inline", spec: SPEC } }
			]),
			"s-1"
		);

		expect(option).toEqual({
			typ: "transfer",
			name: "Трансфер",
			description: "Встреча в аэропорту",
			package_id: null,
			details: { plan: PLAN }
		});
	});

	it("sends the selected inline member to PATCH M with its supplier echoed", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{
					id: "s-1",
					supply: { source: "inline", spec: { pricing: "whole" } }
				},
				{ id: "s-2", supply: { source: "inline", spec: SPEC } }
			]),
			"s-2",
			readDetails([
				{
					id: "s-1",
					is_main: true,
					supply: { source: "inline", supplier_id: "sup-1" }
				},
				{
					id: "s-2",
					is_main: false,
					supply: { source: "inline", supplier_id: "sup-2" }
				}
			])
		);

		expect(member).toEqual({
			supplyId: "s-2",
			body: { typ: "transfer", supplier_id: "sup-2", spec: SPEC }
		});
	});

	it("picks the first member when no supply id is given", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "inline", spec: SPEC } },
				{
					id: "s-2",
					supply: { source: "inline", spec: { pricing: "whole" } }
				}
			]),
			undefined
		);

		expect(member?.supplyId).toBe("s-1");
	});

	it("sends a null supplier when the read has none", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "inline", spec: SPEC } }
			]),
			"s-1",
			readDetails([
				{ id: "s-1", is_main: true, supply: { source: "inline" } }
			])
		);

		expect(member?.body).toMatchObject({ supplier_id: null });
	});

	it("never puts id, is_main or source into the PATCH M body", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "inline", spec: SPEC } }
			]),
			"s-1"
		);

		expect(Object.keys(member?.body ?? {}).sort()).toEqual([
			"spec",
			"supplier_id",
			"typ"
		]);
	});

	it("skips PATCH M for a product member", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "product", product_id: "p-1" } }
			]),
			"s-1"
		);

		expect(member).toBeUndefined();
	});

	it("skips PATCH M when the selected member has no id", () => {
		const { member } = splitEventUpdate(
			transferBody([{ supply: { source: "inline", spec: SPEC } }]),
			undefined
		);

		expect(member).toBeUndefined();
	});

	it("skips PATCH M when the selected supply id is not in the pool", () => {
		const { member } = splitEventUpdate(
			transferBody([
				{ id: "s-1", supply: { source: "inline", spec: SPEC } }
			]),
			"s-404"
		);

		expect(member).toBeUndefined();
	});

	it("sends only PATCH O when there is no pool (product-linked, info)", () => {
		const body = {
			typ: "flight",
			name: "Перелёт",
			package_id: "pkg-1",
			details: { plan: { departure_time: { time: "08:00" } } }
		} as unknown as TTourEventUpdateBackend;

		const { option, member } = splitEventUpdate(body, undefined);

		expect(member).toBeUndefined();
		expect(option).toEqual(body);
	});

	it("keeps empty details when the body has no plan", () => {
		const body = {
			typ: "supplementary",
			name: "Вода",
			details: { pool: [] }
		} as unknown as TTourEventUpdateBackend;

		expect(splitEventUpdate(body, undefined).option).toEqual({
			typ: "supplementary",
			name: "Вода",
			details: {}
		});
	});

	it("takes the package from the body and the spec from the member source", () => {
		const packaged = {
			...transferBody([
				{
					id: "s-1",
					supply: {
						source: "inline",
						spec: { pricing: "per_car_category" }
					}
				}
			]),
			package_id: "pkg-1"
		} as unknown as TTourEventUpdateBackend;
		const individual = transferBody([
			{ id: "s-1", supply: { source: "inline", spec: SPEC } }
		]);

		const { option, member } = splitEventUpdate(
			packaged,
			"s-1",
			undefined,
			individual
		);

		expect(option).toMatchObject({ package_id: "pkg-1" });
		expect(member?.body).toMatchObject({ spec: SPEC });
	});
});

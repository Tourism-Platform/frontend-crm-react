import { describe, expect, it, vi } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import {
	ENUM_LANGUAGES,
	ENUM_LANGUAGES_BACKEND
} from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_FORM_SECTION,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_TYPE,
	ENUM_GUIDE_TYPE_BACKEND,
	type TGuideDetailsBackend,
	type TGuideEditSchema
} from "../../../types";
import { ENUM_EVENT_BACKEND } from "../../../types/event-backend-enum.types";

import { getDefaultGuidePricing } from "./guide-pricing.converters";
import { mapGuideFormToUpdate } from "./guide.converters";
import { mapGuidesFromBackend } from "./guides.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

type TGuideSpec = TGuideDetailsBackend["pool"][number]["spec"];

const spec = (overrides: Partial<TGuideSpec> = {}): TGuideSpec => ({
	name: null,
	typ_tiers: [],
	categories: [],
	...overrides
});

const member = (id: string, memberSpec: TGuideSpec, isMain = false) => ({
	id,
	is_main: isMain,
	supply: { source: "inline" as const, supplier_id: null },
	spec: memberSpec
});

const guideReadDetails = (
	pool: TGuideDetailsBackend["pool"],
	plan: TGuideDetailsBackend["plan"] = { duration: 2 }
): TGuideDetailsBackend => ({ plan, pool });

const baseForm = (
	overrides: Partial<TGuideEditSchema> = {}
): TGuideEditSchema => ({
	[ENUM_GUIDE_FORM_SECTION.NAME]: "Guide",
	[ENUM_GUIDE_FORM_SECTION.DAY]: 1,
	[ENUM_GUIDE_FORM_SECTION.POSITION]: 0,
	[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
		[ENUM_FORM_GUIDES.DURATION_DAYS]: 3,
		[ENUM_FORM_GUIDES.TYP_TIERS]: [
			{
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
				[ENUM_FORM_GUIDES.UP_TO_PAX]: 10
			},
			{
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
				[ENUM_FORM_GUIDES.UP_TO_PAX]: 25
			}
		]
	},
	[ENUM_GUIDE_FORM_SECTION.PRICING]: {
		...getDefaultGuidePricing(),
		[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: "USD",
		[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
			{
				[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: ENUM_LANGUAGES.ENGLISH,
				[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: [60]
			}
		]
	},
	...overrides
});

const writtenSpecs = (result: ReturnType<typeof mapGuideFormToUpdate>) => {
	if (result.typ !== "guide" || result.details == null) {
		throw new Error("expected a guide write body");
	}
	return (result.details.pool ?? []).map((poolMember) =>
		poolMember.supply.source === "inline" ? poolMember.supply.spec : null
	);
};

describe("mapGuidesFromBackend", () => {
	it("maps plan duration and every typ tier with its bound", () => {
		const result = mapGuidesFromBackend(
			guideReadDetails(
				[
					member(
						"supply-1",
						spec({
							typ_tiers: [
								{
									up_to_pax: 10,
									typ: ENUM_GUIDE_TYPE_BACKEND.LOCAL
								},
								{
									up_to_pax: 20,
									typ: ENUM_GUIDE_TYPE_BACKEND.ROUTE
								}
							]
						}),
						true
					)
				],
				{ duration: 3 }
			)
		);

		expect(result).toEqual({
			[ENUM_FORM_GUIDES.DURATION_DAYS]: 3,
			[ENUM_FORM_GUIDES.TYP_TIERS]: [
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
					[ENUM_FORM_GUIDES.UP_TO_PAX]: 10
				},
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
					[ENUM_FORM_GUIDES.UP_TO_PAX]: 20
				}
			]
		});
	});

	it("leaves a stored plan without duration empty, a new guide at one day", () => {
		expect(
			mapGuidesFromBackend(
				guideReadDetails([member("main", spec(), true)], {
					duration: null
				})
			)[ENUM_FORM_GUIDES.DURATION_DAYS]
		).toBeNull();
		expect(mapGuidesFromBackend(null)[ENUM_FORM_GUIDES.DURATION_DAYS]).toBe(
			1
		);
	});

	it("reads the selected pool member", () => {
		const result = mapGuidesFromBackend(
			guideReadDetails([
				member("main", spec(), true),
				member(
					"second",
					spec({
						typ_tiers: [
							{ up_to_pax: 8, typ: ENUM_GUIDE_TYPE_BACKEND.ROUTE }
						]
					})
				)
			]),
			"second"
		);

		expect(result[ENUM_FORM_GUIDES.TYP_TIERS]).toEqual([
			{
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
				[ENUM_FORM_GUIDES.UP_TO_PAX]: 8
			}
		]);
	});
});

describe("mapGuideFormToUpdate", () => {
	it("writes plan, typ tiers and categories on a create", () => {
		const result = mapGuideFormToUpdate(baseForm());

		expect(result).toEqual({
			typ: ENUM_EVENT_BACKEND.GUIDE,
			package_id: null,
			name: "Guide",
			details: {
				plan: { duration: 3 },
				pool: [
					{
						supply: {
							source: "inline",
							spec: {
								name: null,
								typ_tiers: [
									{
										typ: ENUM_GUIDE_TYPE_BACKEND.LOCAL,
										up_to_pax: 10
									},
									{
										typ: ENUM_GUIDE_TYPE_BACKEND.ROUTE,
										up_to_pax: 25
									}
								],
								categories: [
									{
										lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
										expenses: {
											typ: "per_duration",
											rate: {
												typ: "per_group",
												tiers: [
													{
														up_to_pax: 1,
														cost: {
															val: 60,
															currency:
																ENUM_CURRENCY_BACKEND.USD
														}
													}
												]
											},
											fees: null,
											extra_costs: []
										}
									}
								]
							}
						}
					}
				]
			}
		});
	});

	it("edits only the selected member and keeps its spec name", () => {
		const current = guideReadDetails([
			member("main", spec({ name: "Main guide" }), true),
			member("second", spec({ name: "Second guide" }))
		]);

		const specs = writtenSpecs(
			mapGuideFormToUpdate(
				baseForm({ [ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: "second" }),
				undefined,
				current
			)
		);

		expect(specs[0]).toEqual({
			name: "Main guide",
			typ_tiers: [],
			categories: []
		});
		expect(specs[1]).toMatchObject({
			name: "Second guide",
			typ_tiers: [
				{ typ: ENUM_GUIDE_TYPE_BACKEND.LOCAL, up_to_pax: 10 },
				{ typ: ENUM_GUIDE_TYPE_BACKEND.ROUTE, up_to_pax: 25 }
			]
		});
	});

	it("echoes the current spec for sections the form does not carry", () => {
		const currentSpec = spec({
			typ_tiers: [{ up_to_pax: 12, typ: ENUM_GUIDE_TYPE_BACKEND.LOCAL }],
			categories: [
				{ lang: ENUM_LANGUAGES_BACKEND.ENGLISH, expenses: null }
			]
		});

		const [written] = writtenSpecs(
			mapGuideFormToUpdate(
				{ [ENUM_GUIDE_FORM_SECTION.NAME]: "Renamed" },
				undefined,
				guideReadDetails([member("main", currentSpec, true)])
			)
		);

		expect(written).toEqual(currentSpec);
	});

	it("sends no categories once every language is removed", () => {
		const [written] = writtenSpecs(
			mapGuideFormToUpdate(
				baseForm({
					[ENUM_GUIDE_FORM_SECTION.PRICING]: {
						...baseForm()[ENUM_GUIDE_FORM_SECTION.PRICING],
						[ENUM_GUIDE_PRICING_FIELD.ROWS]: []
					}
				})
			)
		);

		expect(written).toMatchObject({ categories: [] });
	});
});

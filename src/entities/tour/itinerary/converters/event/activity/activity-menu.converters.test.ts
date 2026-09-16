import { describe, expect, it, vi } from "vitest";

import { ENUM_FORM_ACTIVITY_MENU } from "../../../types";

import {
	mapMenuFromBackend,
	mapMenuToBackend
} from "./activity-menu.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

describe("activity-menu.converters", () => {
	it("echoes menu item id on write", () => {
		const result = mapMenuToBackend([
			{
				[ENUM_FORM_ACTIVITY_MENU.ID]:
					"11111111-1111-1111-1111-111111111111",
				[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov",
				[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: "with lamb"
			}
		]);

		expect(result).toEqual([
			{
				id: "11111111-1111-1111-1111-111111111111",
				name: "Plov",
				description: "with lamb"
			}
		]);
	});

	it("omits id for new dishes", () => {
		expect(
			mapMenuToBackend([
				{
					[ENUM_FORM_ACTIVITY_MENU.NAME]: "Tea",
					[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: null
				}
			])
		).toEqual([{ name: "Tea", description: null }]);
	});

	it("round-trips menu from backend", () => {
		expect(
			mapMenuFromBackend([
				{
					id: "11111111-1111-1111-1111-111111111111",
					name: "Plov",
					description: "with lamb"
				}
			])
		).toEqual([
			{
				[ENUM_FORM_ACTIVITY_MENU.ID]:
					"11111111-1111-1111-1111-111111111111",
				[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov",
				[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: "with lamb"
			}
		]);
	});
});

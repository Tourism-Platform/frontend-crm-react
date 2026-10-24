import { describe, expect, it } from "vitest";

import type {
	TInformationDetailsOutputBackend,
	TMultiEventDetailBackend
} from "../../../types";
import { ENUM_EVENT_BACKEND } from "../../../types/event-backend-enum.types";
import { ENUM_EVENT } from "../../../types/event-enum.types";

import { mapMultiplyOptionDetailToOption } from "./multiply-option.converters";

const INFO_DETAILS: TInformationDetailsOutputBackend = {
	plan: {},
	pool: [
		{
			id: "11111111-1111-1111-1111-111111111111",
			is_main: true,
			supply: { source: "inline", supplier_id: null },
			spec: {}
		}
	]
};

const buildDetail = (
	overrides: Partial<{
		id: string;
		name: string | null;
		description: string | null;
	}>
): TMultiEventDetailBackend => ({
	id: "opt-1",
	name: "Info",
	description: null,
	package_id: null,
	...overrides,
	typ: "ref",
	details: INFO_DETAILS
});

describe("mapMultiplyOptionDetailToOption", () => {
	it("maps the option row id and fields", () => {
		const option = mapMultiplyOptionDetailToOption(
			buildDetail({ id: "opt-1", name: "Activity" })
		);

		expect(option).toMatchObject({
			id: "opt-1",
			name: "Activity",
			eventType: ENUM_EVENT.INFO,
			backendTyp: ENUM_EVENT_BACKEND.REF,
			details: INFO_DETAILS
		});
	});
});

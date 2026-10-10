import { describe, expect, it, vi } from "vitest";

import { mapApiErrorsToForm } from "./map-api-errors-to-form";

const form = () => ({ setError: vi.fn() });

const unprocessable = (loc: (string | number)[], msg = "Field required") => ({
	status: 422,
	data: { detail: [{ type: "missing", loc, msg }] }
});

const toPath = (loc: (string | number)[]) =>
	loc[2] === "name" && loc.length === 3 ? ("name" as const) : undefined;

describe("mapApiErrorsToForm", () => {
	it("puts a mapped 422 issue on its field", () => {
		const target = form();
		const placed = mapApiErrorsToForm(
			unprocessable(["body", "transfer", "name"], "Too long"),
			target as never,
			toPath
		);

		expect(placed).toBe(1);
		expect(target.setError).toHaveBeenCalledWith("name", {
			type: "server",
			message: "Too long"
		});
	});

	it("leaves unmapped paths and non-422 errors to the caller", () => {
		const target = form();
		expect(
			mapApiErrorsToForm(
				unprocessable([
					"body",
					"transfer",
					"spec",
					"per_car",
					"cars",
					0,
					"charge"
				]),
				target as never,
				toPath
			)
		).toBe(0);
		expect(
			mapApiErrorsToForm(
				{
					status: 409,
					data: { detail: "Archived tours are immutable" }
				},
				target as never,
				toPath
			)
		).toBe(0);
		expect(target.setError).not.toHaveBeenCalled();
	});
});

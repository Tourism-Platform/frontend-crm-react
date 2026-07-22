import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { validateFormWithSectionToast } from "./validate-form-with-section-toast";

vi.mock("sonner", () => ({
	toast: {
		error: vi.fn(),
		success: vi.fn()
	}
}));

describe("validateFormWithSectionToast", () => {
	const t = vi.fn((key: string) => key);
	const keyPrefix = "form.toasts.validation.error";

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns true and does not toast when form is valid", async () => {
		const form = {
			trigger: vi.fn().mockResolvedValue(true),
			formState: { errors: {} }
		};

		await expect(
			validateFormWithSectionToast(form, t, { keyPrefix })
		).resolves.toBe(true);

		expect(toast.error).not.toHaveBeenCalled();
	});

	it("toasts guides section when only guides has errors", async () => {
		const form = {
			trigger: vi.fn().mockResolvedValue(false),
			formState: { errors: { guides: { message: "required" } } }
		};

		await expect(
			validateFormWithSectionToast(form, t, { keyPrefix })
		).resolves.toBe(false);

		expect(toast.error).toHaveBeenCalledWith(`${keyPrefix}.guides`);
		expect(t).toHaveBeenCalledWith(
			`${keyPrefix}.guides`,
			expect.objectContaining({ defaultValue: `${keyPrefix}.fallback` })
		);
	});

	it("toasts pricing section when only pricing has errors", async () => {
		const form = {
			trigger: vi.fn().mockResolvedValue(false),
			formState: { errors: { pricing: { message: "invalid" } } }
		};

		await expect(
			validateFormWithSectionToast(form, t, { keyPrefix })
		).resolves.toBe(false);

		expect(toast.error).toHaveBeenCalledWith(`${keyPrefix}.pricing`);
	});

	it("toasts multiple sections when guides and pricing both fail", async () => {
		const form = {
			trigger: vi.fn().mockResolvedValue(false),
			formState: {
				errors: {
					guides: { message: "required" },
					pricing: { message: "invalid" }
				}
			}
		};

		await expect(
			validateFormWithSectionToast(form, t, { keyPrefix })
		).resolves.toBe(false);

		expect(toast.error).toHaveBeenCalledWith(`${keyPrefix}.multiple`);
		expect(t).toHaveBeenCalledWith(
			`${keyPrefix}.multiple`,
			expect.objectContaining({
				sections: expect.stringMatching(/guides/)
			})
		);
	});

	it("toasts fallback when errors have no known section keys", async () => {
		const form = {
			trigger: vi.fn().mockResolvedValue(false),
			formState: { errors: { day: { message: "bad" } } }
		};

		await expect(
			validateFormWithSectionToast(form, t, { keyPrefix })
		).resolves.toBe(false);

		expect(toast.error).toHaveBeenCalledWith(`${keyPrefix}.fallback`);
	});
});

import { describe, expect, it, vi } from "vitest";

import {
	ENUM_HOTEL_POLICY_SURCHARGE,
	ENUM_SUPPLIER_POLICY_WARNING,
	type TSupplierPolicyWarningBackend
} from "../../../types";

import { mapSupplierPolicyWarningToFrontend } from "./event-policy-check.converters";

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

const baseWarning = {
	tour_option_id: "opt-1",
	event_id: "evt-1",
	option_id: null,
	supplier_id: "sup-1",
	supplier_name: "Hyatt Regency",
	path: ["details", "check_in"],
	detail: "arrival before check-in"
};

describe("event-policy-check.converters", () => {
	it("maps early_check_in with fixed surcharge", () => {
		const backend = {
			...baseWarning,
			code: "early_check_in",
			expected_surcharge: {
				typ: "fixed",
				cost: { val: 100, currency: "USD" }
			}
		} as unknown as TSupplierPolicyWarningBackend;

		const result = mapSupplierPolicyWarningToFrontend(backend);

		expect(result.code).toBe(ENUM_SUPPLIER_POLICY_WARNING.EARLY_CHECK_IN);
		expect(result.expectedSurcharge).toEqual({
			typ: ENUM_HOTEL_POLICY_SURCHARGE.FIXED,
			cost: { val: 100, currency: "USD" }
		});
		expect(result.tourOptionId).toBe("opt-1");
		expect(result.supplierName).toBe("Hyatt Regency");
	});

	it("maps late_check_out with percentage surcharge", () => {
		const backend = {
			...baseWarning,
			code: "late_check_out",
			path: ["details", "check_out"],
			expected_surcharge: {
				typ: "percentage",
				percentage: 0.5
			}
		} as unknown as TSupplierPolicyWarningBackend;

		const result = mapSupplierPolicyWarningToFrontend(backend);

		expect(result.code).toBe(ENUM_SUPPLIER_POLICY_WARNING.LATE_CHECK_OUT);
		expect(result.expectedSurcharge).toEqual({
			typ: ENUM_HOTEL_POLICY_SURCHARGE.PERCENTAGE,
			percentage: 0.5
		});
	});

	it("maps null expected_surcharge to null", () => {
		const backend = {
			...baseWarning,
			code: "late_check_out",
			expected_surcharge: null
		} as unknown as TSupplierPolicyWarningBackend;

		const result = mapSupplierPolicyWarningToFrontend(backend);

		expect(result.expectedSurcharge).toBeNull();
	});

	it("maps supplier_type_mismatch", () => {
		const backend = {
			...baseWarning,
			code: "supplier_type_mismatch",
			path: ["supplier_id"],
			detail: "type mismatch",
			expected_surcharge: null
		} as unknown as TSupplierPolicyWarningBackend;

		const result = mapSupplierPolicyWarningToFrontend(backend);

		expect(result.code).toBe(
			ENUM_SUPPLIER_POLICY_WARNING.SUPPLIER_TYPE_MISMATCH
		);
		expect(result.expectedSurcharge).toBeNull();
	});
});

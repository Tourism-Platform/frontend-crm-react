import { describe, expect, it } from "vitest";

import { ENUM_USER_ROLE } from "./user-role.types";
import { hasPlatformAccessRole } from "./user-role.utils";

describe("hasPlatformAccessRole", () => {
	it.each([
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.OPERATOR_ADMIN,
		ENUM_USER_ROLE.OPERATOR_STAFF,
		ENUM_USER_ROLE.AGENCY_ADMIN,
		ENUM_USER_ROLE.AGENCY_STAFF
	])("allows %s", (role) => {
		expect(hasPlatformAccessRole(role)).toBe(true);
	});

	it("denies authenticated_user", () => {
		expect(hasPlatformAccessRole(ENUM_USER_ROLE.AUTHENTICATED_USER)).toBe(
			false
		);
	});

	it("denies missing role", () => {
		expect(hasPlatformAccessRole(null)).toBe(false);
	});
});

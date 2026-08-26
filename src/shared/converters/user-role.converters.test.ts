import { describe, expect, it } from "vitest";

import { UserRoles } from "@/shared/api";
import { ENUM_USER_ROLE } from "@/shared/config";

import { userRoleMapper } from "./user-role.converters";

describe("userRoleMapper", () => {
	it.each([
		[ENUM_USER_ROLE.ADMIN, UserRoles.Admin],
		[ENUM_USER_ROLE.OPERATOR_ADMIN, UserRoles.OperatorAdmin],
		[ENUM_USER_ROLE.OPERATOR_STAFF, UserRoles.OperatorStaff],
		[ENUM_USER_ROLE.AGENCY_ADMIN, UserRoles.AgencyAdmin],
		[ENUM_USER_ROLE.AGENCY_STAFF, UserRoles.AgencyStaff],
		[ENUM_USER_ROLE.AUTHENTICATED_USER, UserRoles.AuthenticatedUser]
	] as const)("to/from %s", (fe, be) => {
		expect(userRoleMapper.to(fe)).toBe(be);
		expect(userRoleMapper.from(be)).toBe(fe);
	});

	it("from unknown → undefined", () => {
		expect(userRoleMapper.from("unknown" as UserRoles)).toBeUndefined();
	});
});

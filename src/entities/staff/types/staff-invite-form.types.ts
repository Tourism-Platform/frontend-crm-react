import { z } from "zod";

import type { INVITE_STAFF_SCHEMA } from "../schema";

export const ENUM_FORM_INVITE_STAFF = {
	EMAIL: "email",
	FIRST_NAME: "firstName",
	LAST_NAME: "lastName",
	ROLE: "role"
} as const;

export type ENUM_FORM_INVITE_STAFF_TYPE =
	(typeof ENUM_FORM_INVITE_STAFF)[keyof typeof ENUM_FORM_INVITE_STAFF];

export type TInviteStaffSchema = z.infer<typeof INVITE_STAFF_SCHEMA>;

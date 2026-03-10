import type {
	BodyInviteStaffOperatorStaffInvitePost,
	StaffRead,
	StaffUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_STAFF_PATHS = {
	listStaff: {
		url: "/operator/staff/all",
		method: "GET",
		_types: {} as { body: void; query: void; response: StaffRead[] }
	} as const,
	inviteStaff: {
		url: "/operator/staff/invite",
		method: "POST",
		_types: {} as {
			body: BodyInviteStaffOperatorStaffInvitePost;
			query: void;
			response: StaffRead;
		}
	} as const,
	updateStaffMember: (userId: string) =>
		({
			url: `/operator/staff/${userId}`,
			method: "PATCH",
			_types: {} as {
				body: StaffUpdate;
				query: void;
				response: StaffRead;
			}
		}) as const
} as const;

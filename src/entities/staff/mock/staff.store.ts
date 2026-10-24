import { createMockIdSequence, matchesQuery, omitKeys } from "@/shared/api";

import {
	type ENUM_PERMISSION_BACKEND_TYPE,
	ENUM_STAFF_STATUS_BACKEND,
	ENUM_USER_ROLES_BACKEND,
	type TPermissionGroupReadBackend,
	type TStaffInviteBackend,
	type TStaffReadBackend,
	type TStaffUpdateBackend
} from "../types";

import { PERMISSION_GROUPS_MOCK, STAFF_MOCK } from "./staff.mock";

interface IStaffMember extends TStaffReadBackend {
	permissions: ENUM_PERMISSION_BACKEND_TYPE[];
	groupIds: string[];
}

const createStaffStore = () =>
	new Map<string, IStaffMember>(
		STAFF_MOCK.map((member, index) => [
			member.user_id,
			{
				...structuredClone(member),
				groupIds: index % 3 === 0 ? [PERMISSION_GROUPS_MOCK[0].id] : []
			}
		])
	);
const createGroupStore = () =>
	new Map(
		PERMISSION_GROUPS_MOCK.map((group) => [
			group.id,
			structuredClone(group)
		])
	);

let staffStore = createStaffStore();
let groupStore = createGroupStore();
const staffIds = createMockIdSequence("e400", STAFF_MOCK.length + 1);
const groupIds = createMockIdSequence(
	"e410",
	PERMISSION_GROUPS_MOCK.length + 1
);

const toStaffRead = (member: IStaffMember): TStaffReadBackend =>
	omitKeys(member, ["permissions", "groupIds"]);

export const listStaff = (q: string | null, statuses: string[]) =>
	[...staffStore.values()]
		.filter(
			(member) =>
				matchesQuery(
					q,
					member.first_name,
					member.last_name,
					member.email
				) &&
				(!statuses.length || statuses.includes(member.status))
		)
		.map(toStaffRead);

export const hasStaffEmail = (email: string) =>
	[...staffStore.values()].some((member) => member.email === email);

export const inviteStaff = (body: TStaffInviteBackend) => {
	const member: IStaffMember = {
		user_id: staffIds.next(),
		first_name: body.first_name,
		last_name: body.last_name,
		email: body.email,
		role: ENUM_USER_ROLES_BACKEND.OPERATOR_STAFF,
		status: ENUM_STAFF_STATUS_BACKEND.PENDING,
		commission_percent: null,
		permissions: body.permissions ?? [],
		groupIds: body.group_ids ?? []
	};
	staffStore.set(member.user_id, member);
	return {
		...toStaffRead(member),
		generated_password: body.password ? null : "Mock-Pass-123"
	};
};

export const updateStaff = (userId: string, body: TStaffUpdateBackend) => {
	const member = staffStore.get(userId);
	if (!member) return undefined;
	for (const [key, value] of Object.entries(body)) {
		if (value !== undefined) Object.assign(member, { [key]: value });
	}
	return toStaffRead(member);
};

export const deleteStaff = (userId: string) => staffStore.delete(userId);

/** Прямые права + права групп */
export const getStaffPermissions = (userId: string) => {
	const member = staffStore.get(userId);
	if (!member) return undefined;

	const fromGroups = member.groupIds.flatMap(
		(groupId) => groupStore.get(groupId)?.permissions ?? []
	);
	return {
		direct: member.permissions,
		group_ids: member.groupIds,
		effective: [...new Set([...member.permissions, ...fromGroups])]
	};
};

export const replaceStaffAccess = (
	userId: string,
	permissions: ENUM_PERMISSION_BACKEND_TYPE[],
	groups: string[]
) => {
	const member = staffStore.get(userId);
	if (!member) return undefined;
	member.permissions = permissions;
	member.groupIds = groups.filter((groupId) => groupStore.has(groupId));
	return getStaffPermissions(userId);
};

export const listPermissionGroups = () => [...groupStore.values()];

export const createPermissionGroup = (
	name: string,
	permissions: ENUM_PERMISSION_BACKEND_TYPE[]
) => {
	const group: TPermissionGroupReadBackend = {
		id: groupIds.next(),
		name,
		permissions
	};
	groupStore.set(group.id, group);
	return group;
};

export const updatePermissionGroup = (
	groupId: string,
	name: string | null | undefined,
	permissions: ENUM_PERMISSION_BACKEND_TYPE[]
) => {
	const group = groupStore.get(groupId);
	if (!group) return undefined;
	if (name) group.name = name;
	group.permissions = permissions;
	return group;
};

export const deletePermissionGroup = (groupId: string) => {
	staffStore.forEach((member) => {
		member.groupIds = member.groupIds.filter((id) => id !== groupId);
	});
	return groupStore.delete(groupId);
};

export const resetStaffStore = () => {
	staffStore = createStaffStore();
	groupStore = createGroupStore();
	staffIds.reset(STAFF_MOCK.length + 1);
	groupIds.reset(PERMISSION_GROUPS_MOCK.length + 1);
};

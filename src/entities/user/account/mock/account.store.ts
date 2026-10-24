import { mockImageUrl } from "@/shared/api";

import type { TAccountBackend, TUpdateAccountBackend } from "../types";

import { ACCOUNT_MOCK, AGENCY_ACCOUNT_MOCK } from "./account.mock";

const SEED = [ACCOUNT_MOCK, AGENCY_ACCOUNT_MOCK];

/** Профили по user_id (= id аккаунта из /auth/me) */
const createAccountStore = () =>
	new Map(SEED.map((profile) => [profile.user_id, structuredClone(profile)]));

let accountStore = createAccountStore();

export const getAccountProfile = (userId: string) => accountStore.get(userId);

export const updateAccountProfile = (
	userId: string,
	update: TUpdateAccountBackend
): TAccountBackend | undefined => {
	const profile = accountStore.get(userId);
	if (!profile) return undefined;

	const defined = Object.fromEntries(
		Object.entries(update).filter(([, value]) => value !== undefined)
	);
	Object.assign(profile, defined);
	return profile;
};

export const setAccountPhoto = (userId: string, hasPhoto: boolean) => {
	const profile = accountStore.get(userId);
	if (!profile) return undefined;

	profile.profile_picture_path = hasPhoto
		? mockImageUrl(`avatar-${userId}-${Date.now()}`, 256, 256)
		: null;
	return profile;
};

export const resetAccountStore = () => {
	accountStore = createAccountStore();
};

import { HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { AUTH_PATHS, createMockHandler } from "@/shared/api";
import { ENUM_USER_ROLE } from "@/shared/config";

import { setupMswServer } from "@/app/mws/setup-msw-server";
import { setupStore } from "@/app/providers/store";

import type { IAuthAccount } from "../types";

import { AuthService } from "./auth.service";

const server = setupMswServer();

const ACCOUNT: IAuthAccount = {
	id: "account-1",
	email: "operator@tourfirm.dev",
	role: ENUM_USER_ROLE.OPERATOR_ADMIN,
	picture: null,
	agency_id: null,
	operator_id: "operator-1"
};

/** Store с уже закэшированным аккаунтом — как после входа */
const setupSignedInStore = () => {
	const store = setupStore();
	store.dispatch(
		AuthService.util.upsertQueryData("getAuthAccount", undefined, ACCOUNT)
	);
	return store;
};

const selectCachedAccount = (store: ReturnType<typeof setupStore>) =>
	AuthService.endpoints.getAuthAccount.select()(store.getState()).data;

describe("AuthService.signOut", () => {
	it("resets cached API state on success", async () => {
		const store = setupSignedInStore();

		await store.dispatch(AuthService.endpoints.signOut.initiate()).unwrap();

		expect(selectCachedAccount(store)).toBeUndefined();
	});

	it("passes a server error to the caller and keeps the cache", async () => {
		server.use(
			createMockHandler(AUTH_PATHS.logoutUser, () =>
				HttpResponse.json({ detail: "boom" }, { status: 500 })
			)
		);
		const store = setupSignedInStore();

		await expect(
			store.dispatch(AuthService.endpoints.signOut.initiate()).unwrap()
		).rejects.toMatchObject({ status: 500 });
		expect(selectCachedAccount(store)).toEqual(ACCOUNT);
	});
});

describe("AuthService.signIn", () => {
	it("passes wrong credentials to the caller and stays signed out", async () => {
		const store = setupStore();

		await expect(
			store
				.dispatch(
					AuthService.endpoints.signIn.initiate({
						email: "nobody@tourfirm.dev",
						password: "wrong-password"
					})
				)
				.unwrap()
		).rejects.toMatchObject({ status: 401 });
		expect(store.getState().userSlice.isAuth).toBe(false);
		expect(selectCachedAccount(store)).toBeUndefined();
	});
});

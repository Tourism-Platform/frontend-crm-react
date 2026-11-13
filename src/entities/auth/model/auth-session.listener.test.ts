import { HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import {
	AUTH_PATHS,
	createMockHandler,
	documentGeneratorApi
} from "@/shared/api";
import { ENUM_USER_ROLE } from "@/shared/config";

import { login, logout } from "@/entities/user";

import { setupMswServer } from "@/app/mws/setup-msw-server";
import { setupStore } from "@/app/providers/store";
import { requestsTo, trackRequests } from "@/app/test/track-requests";

import { authApi } from "../api/auth.api";
import { AuthService } from "../api/auth.service";
import type { IAuthAccount } from "../types";

import { sessionExpired } from "./session-expired.action";

const server = setupMswServer();

const LOGOUT = AUTH_PATHS.logoutUser.url;

const ACCOUNT: IAuthAccount = {
	id: "account-1",
	email: "operator@tourfirm.dev",
	role: ENUM_USER_ROLE.OPERATOR_ADMIN,
	picture: null,
	agency_id: null,
	operator_id: "operator-1"
};

/** Бизнес-данные живут в authApi, документы — в своём createApi */
const AuthApiProbe = authApi.injectEndpoints({
	endpoints: (build) => ({
		authApiProbe: build.query<number, void>({
			queryFn: () => ({ data: 1 })
		})
	})
});

const DocumentApiProbe = documentGeneratorApi.injectEndpoints({
	endpoints: (build) => ({
		documentApiProbe: build.query<number, void>({
			queryFn: () => ({ data: 1 })
		})
	})
});

const seedAccount = (store: ReturnType<typeof setupStore>) =>
	store.dispatch(
		AuthService.util.upsertQueryData("getAuthAccount", undefined, ACCOUNT)
	);

const cachedAccount = (store: ReturnType<typeof setupStore>) =>
	AuthService.endpoints.getAuthAccount.select()(store.getState()).data;

describe("authSessionListener — sessionExpired", () => {
	it("does nothing when the user is not signed in", async () => {
		const store = setupStore();
		// Заполнение кэша аккаунта само выполняет login() (onQueryStarted)
		await seedAccount(store);
		store.dispatch(logout());
		const requests = trackRequests();

		store.dispatch(sessionExpired());

		// Выход на сервер не уходит и кэш не трогается
		await Promise.resolve();
		expect(requestsTo(requests, LOGOUT)).toEqual([]);
		expect(cachedAccount(store)).toEqual(ACCOUNT);
		expect(store.getState().userSlice.isAuth).toBe(false);
	});

	it("signs out completely: state, server session and cached account", async () => {
		const requests = trackRequests();
		const store = setupStore();
		store.dispatch(login());
		await seedAccount(store);

		store.dispatch(sessionExpired());

		// Флаг снимается сразу — повторные 401 уже не выполняют выход
		expect(store.getState().userSlice.isAuth).toBe(false);
		// Аккаунт в baseApi сброшен — ProtectedRoute перезапросит /me и уйдёт на логин
		await vi.waitFor(() => expect(cachedAccount(store)).toBeUndefined());
		expect(requestsTo(requests, LOGOUT)).toHaveLength(1);
	});

	it("signs out locally even when the server logout answers 401", async () => {
		// Сессия уже истекла — сервер отвергает и выход; ошибка не должна всплыть
		server.use(
			createMockHandler(AUTH_PATHS.logoutUser, () =>
				HttpResponse.json({ detail: "expired" }, { status: 401 })
			)
		);
		const requests = trackRequests();
		const store = setupStore();
		store.dispatch(login());
		await seedAccount(store);

		store.dispatch(sessionExpired());

		await vi.waitFor(() => expect(cachedAccount(store)).toBeUndefined());
		expect(store.getState().userSlice.isAuth).toBe(false);
		expect(requestsTo(requests, LOGOUT)).toHaveLength(1);
	});

	it("clears cached business data and documents as well", async () => {
		const store = setupStore();
		store.dispatch(login());
		await store.dispatch(
			AuthApiProbe.util.upsertQueryData("authApiProbe", undefined, 1)
		);
		await store.dispatch(
			DocumentApiProbe.util.upsertQueryData(
				"documentApiProbe",
				undefined,
				1
			)
		);
		const cachedAuthApi = () =>
			AuthApiProbe.endpoints.authApiProbe.select()(store.getState()).data;
		const cachedDocumentApi = () =>
			DocumentApiProbe.endpoints.documentApiProbe.select()(
				store.getState()
			).data;
		expect(cachedAuthApi()).toBe(1);
		expect(cachedDocumentApi()).toBe(1);

		store.dispatch(sessionExpired());

		await vi.waitFor(() => {
			expect(cachedAuthApi()).toBeUndefined();
			expect(cachedDocumentApi()).toBeUndefined();
		});
	});

	it("runs once for repeated expiry events", async () => {
		const requests = trackRequests();
		const store = setupStore();
		store.dispatch(login());

		store.dispatch(sessionExpired());
		store.dispatch(sessionExpired());
		store.dispatch(sessionExpired());

		await vi.waitFor(() =>
			expect(requestsTo(requests, LOGOUT)).toHaveLength(1)
		);
	});
});

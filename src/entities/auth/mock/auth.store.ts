import { MOCK_AUTH_USERS } from "./auth.mock";

/** Email вошедшего пользователя; в браузере переживает перезагрузку страницы */
const MOCK_SESSION_KEY = "msw-auth-session";

let memorySession: string | null = null;
let passwords = new Map(
	MOCK_AUTH_USERS.map(({ account, password }) => [account.email, password])
);

const readSession = () => {
	try {
		return localStorage.getItem(MOCK_SESSION_KEY);
	} catch {
		return memorySession;
	}
};

const writeSession = (email: string | null) => {
	memorySession = email;
	try {
		if (email) localStorage.setItem(MOCK_SESSION_KEY, email);
		else localStorage.removeItem(MOCK_SESSION_KEY);
	} catch {
		// localStorage недоступен (node) — сессия только в памяти
	}
};

export const signInMockUser = (email: string, password: string) => {
	const user = MOCK_AUTH_USERS.find(({ account }) => account.email === email);
	if (!user || passwords.get(email) !== password) return null;

	writeSession(email);
	return user.account;
};

export const signOutMockUser = () => writeSession(null);

export const getMockSessionAccount = () => {
	const email = readSession();
	return (
		MOCK_AUTH_USERS.find(({ account }) => account.email === email)
			?.account ?? null
	);
};

export const changeMockPassword = (current: string, next: string) => {
	const account = getMockSessionAccount();
	if (!account || passwords.get(account.email) !== current) return false;

	passwords.set(account.email, next);
	return true;
};

export const resetAuthStore = () => {
	writeSession(null);
	passwords = new Map(
		MOCK_AUTH_USERS.map(({ account, password }) => [
			account.email,
			password
		])
	);
};

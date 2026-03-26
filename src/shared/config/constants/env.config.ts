const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_ENABLE_MSW = import.meta.env.VITE_ENABLE_MSW;
const VITE_APP_ENV = import.meta.env.VITE_APP_ENV;

export const ENV = {
	VITE_API_URL,
	VITE_ENABLE_MSW,
	VITE_APP_ENV: VITE_APP_ENV as "prod" | "dev"
} as const;

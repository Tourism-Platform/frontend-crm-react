import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			// Фейковые хосты: незамоканный запрос падает, а не уходит на бэкенд
			env: {
				VITE_API_URL: "http://api.test",
				VITE_DOCUMENT_API_URL: "http://document.test",
				VITE_ENABLE_MSW: "false"
			}
		}
	})
);

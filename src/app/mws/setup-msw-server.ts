import { afterAll, afterEach, beforeAll } from "vitest";

import { resetMockStores } from "./reset-mock-stores";
import { server } from "./server";

/**
 * Подключает MSW-сервер к тестовому файлу: вызывать на верхнем уровне файла.
 * Не глобальный setup — граф моков тяжёлый и большинству тестов не нужен.
 */
export const setupMswServer = () => {
	// Тесты ходят только в MSW: незамоканный запрос — ошибка, а не поход в сеть
	beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

	afterEach(() => {
		server.resetHandlers();
		resetMockStores();
	});

	afterAll(() => server.close());

	return server;
};

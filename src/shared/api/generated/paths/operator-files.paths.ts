import type { OperatorFilesModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_FILES_PATHS = {
	listFiles: {
		url: "/operator/me/files",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: OperatorFilesModel[];
		}
	} as const,
	addFiles: {
		url: "/operator/me/files",
		method: "POST",
		_types: {} as {
			body: void;
			query: void;
			response: OperatorFilesModel[];
		}
	} as const,
	getFileBinary: (fileId: string) =>
		({
			url: `/operator/me/files/${fileId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	removeFile: (fileId: string) =>
		({
			url: `/operator/me/files/${fileId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;

import type { IOptionDetail, TOptionDetailBackend } from "../types";

export const mapPreviewOptionToFrontend = (
	backend: TOptionDetailBackend
): IOptionDetail => {
	// TODO: Реализовать полноценный маппинг по мере готовности API.
	// Пока используем приведение типов для заглушек.
	return backend as unknown as IOptionDetail;
};

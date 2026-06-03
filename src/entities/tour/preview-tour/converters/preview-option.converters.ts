import { formatToDollars } from "@/shared/utils";

import type {
	IOptionDetail,
	IPreviewOptionCard,
	TOptionDetailBackend,
	TPreviewOptionListItemBackend
} from "../types";

const mapPreviewOptionPriceToFrontend = (
	item: TPreviewOptionListItemBackend
): string => {
	const min = item.total_price.val;
	const max = item.total_price_max.val;

	if (min === max) {
		return formatToDollars(min);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

export const mapPreviewOptionPreviewToFrontend = (
	backend: TPreviewOptionListItemBackend
): IPreviewOptionCard => ({
	id: backend.id,
	title: backend.name ?? "",
	description: backend.description ?? "",
	price: mapPreviewOptionPriceToFrontend(backend),
	image: backend.cover_image_path ?? ""
});

export const mapPreviewOptionsListToFrontend = (
	backend: TPreviewOptionListItemBackend[]
): IPreviewOptionCard[] => backend.map(mapPreviewOptionPreviewToFrontend);

export const mapPreviewOptionToFrontend = (
	backend: TOptionDetailBackend
): IOptionDetail => {
	// TODO: Реализовать полноценный маппинг по мере готовности API.
	// Пока используем приведение типов для заглушек.
	return backend as unknown as IOptionDetail;
};

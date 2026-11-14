import type { TPreviewOptionEventType } from "./preview-option-event.types";
import type { IOptionEventSheet } from "./preview-option-sheet.types";

export interface ISubOption {
	id: string;
	title: string;
	description: string;
	sheet: IOptionEventSheet;
}

export interface IOptionEvent {
	id: string;
	type: TPreviewOptionEventType;
	title: string;
	description: string;
	sheet: IOptionEventSheet;
	sub_options?: ISubOption[];
}

/** Event or sub-option — enough data to open the detail sheet. */
export type TOptionSheetSource = Pick<IOptionEvent, "title" | "sheet">;

export interface IOptionDay {
	id: string;
	day_number: number;
	location: string;
	events: IOptionEvent[];
}

export interface IOptionDetail {
	id: string;
	title: string;
	/** Публичный ответ — итог за группу (`total_price`), черновик — за человека */
	price: string;
	/**
	 * Цена за человека из списка вариантов (`IPreviewOptionCard.price`): в детальном
	 * публичном ответе её нет. Пусто, пока список не загружен
	 */
	pricePerPerson: string;
	days: IOptionDay[];
}

export interface IPreviewOptionCard {
	id: string;
	title: string;
	description: string;
	price: string;
	/** Цена за человека числом (нижняя граница диапазона) — чтобы найти самый дешёвый вариант */
	priceValue: number | null;
	totalPrice: string;
	image: string;
}

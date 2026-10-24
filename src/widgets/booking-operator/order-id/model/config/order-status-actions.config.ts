import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE
} from "@/entities/booking";

/** Подпись кнопки перевода заказа в следующий статус — по текущему статусу */
export const NEXT_STATUS_BUTTON_KEY: Partial<
	Record<ENUM_ORDER_STATUS_TYPE, string>
> = {
	[ENUM_ORDER_STATUS.NEW]: "buttons.accept",
	[ENUM_ORDER_STATUS.IN_PROCESSING]: "buttons.confirm",
	[ENUM_ORDER_STATUS.BOOKING]: "buttons.start",
	[ENUM_ORDER_STATUS.IN_PROGRESS]: "buttons.complete"
};

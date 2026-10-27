/** Что за значение копируется — от этого зависит начертание */
export const ENUM_COPYABLE_KIND = {
	UUID: "uuid",
	TIN: "tin",
	PINFL: "pinfl",
	/** Номер заказа и другие машинные номера */
	NUMBER: "number",
	EMAIL: "email",
	PHONE: "phone",
	/** № договора и прочий текст */
	TEXT: "text"
} as const;

export type TCopyableKind =
	(typeof ENUM_COPYABLE_KIND)[keyof typeof ENUM_COPYABLE_KIND];

/** Машинные идентификаторы — моноширинным JetBrains Mono, остальное — основным шрифтом */
export const COPYABLE_KIND_CLASS: Record<TCopyableKind, string> = {
	[ENUM_COPYABLE_KIND.UUID]: "font-mono tabular-nums",
	[ENUM_COPYABLE_KIND.TIN]: "font-mono tabular-nums",
	[ENUM_COPYABLE_KIND.PINFL]: "font-mono tabular-nums",
	[ENUM_COPYABLE_KIND.NUMBER]: "font-mono tabular-nums",
	[ENUM_COPYABLE_KIND.EMAIL]: "",
	[ENUM_COPYABLE_KIND.PHONE]: "tabular-nums",
	[ENUM_COPYABLE_KIND.TEXT]: ""
};

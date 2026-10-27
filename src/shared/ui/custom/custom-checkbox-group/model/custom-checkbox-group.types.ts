import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const ENUM_CHECKBOX_GROUP_APPEARANCE = {
	/** Компактные пилюли в строку */
	PILL: "pill",
	/** Карточки с иконкой и описанием в сетке */
	CARD: "card"
} as const;

export type ENUM_CHECKBOX_GROUP_APPEARANCE_TYPE =
	(typeof ENUM_CHECKBOX_GROUP_APPEARANCE)[keyof typeof ENUM_CHECKBOX_GROUP_APPEARANCE];

export interface ICustomCheckboxOption<V extends string = string> {
	value: V;
	label: string;
	description?: string;
	icon?: LucideIcon;
	/** Доп. содержимое карточки (например, счётчик) */
	extra?: ReactNode;
}

export interface ICustomCheckboxGroupProps<V extends string = string> {
	options: ICustomCheckboxOption<V>[];
	value: V[];
	onChange: (value: V[]) => void;
	/** Своя логика переключения (взаимоисключение и т.п.); по умолчанию — обычный toggle */
	toggle?: (value: V[], option: V) => V[];
	appearance?: ENUM_CHECKBOX_GROUP_APPEARANCE_TYPE;
	disabled?: boolean;
	className?: string;
}
